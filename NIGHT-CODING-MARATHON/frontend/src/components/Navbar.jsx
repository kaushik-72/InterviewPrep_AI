import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully 👋", { position: "top-right" });
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 shadow-sm bg-white">
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Interview Prep AI
      </h1>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-gray-600 hover:text-black transition"
        >
          Dashboard
        </button>
        <button
          onClick={logout}
          className="bg-black text-white px-4 py-1 rounded hover:bg-gray-800 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;