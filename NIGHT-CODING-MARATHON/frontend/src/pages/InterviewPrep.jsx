import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import QAItem from "../components/QAItems";
import Navbar from "../components/Navbar";
import EmptyState from "../components/EmptyState";
import ErrorBanner from "../components/ErrorBanner";
import GenerateButton from "../components/GenerateButton";
import SkeletonCard from "../components/SkeletonCard";
import toast from "react-hot-toast";

const InterviewPrep = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(null);

  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API_PATHS.SESSION.GET_ONE}/${id}`);
      setQuestions(res.data.session?.questions || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load questions");
      toast.error("Failed to load questions 😕", { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  const generateQuestions = async () => {
    setGenerating(true);
    setError(null);

    const toastId = toast.loading("Generating questions... ⏳", {
      position: "bottom-right",
    });

    try {
      await axios.post(API_PATHS.AI.GENERATE, { sessionId: id });
      await fetchQuestions();
      toast.success("Questions generated! 🎯", {
        id: toastId,
        position: "bottom-right",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to generate questions");
      toast.error("Failed to generate questions 😕", {
        id: toastId,
        position: "bottom-right",
      });
    } finally {
      setGenerating(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [id]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto pt-10 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Interview Questions</h1>
          <GenerateButton
            onClick={generateQuestions}
            generating={generating}
            loading={loading}
          />
        </div>

        {error && (
          <div className="mb-4">
            <ErrorBanner message={error} onRetry={fetchQuestions} />
          </div>
        )}

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : questions.length === 0 ? (
          <EmptyState onGenerate={generateQuestions} generating={generating} />
        ) : (
          questions.map((q) => <QAItem key={q._id} item={q} />)
        )}
      </div>
    </div>
  );
};

export default InterviewPrep;