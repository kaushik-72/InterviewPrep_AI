import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogoutClick = () => {
    setShowConfirm(true);
  };

  const confirmLogout = () => {
    setShowConfirm(false);
    localStorage.removeItem("token");
    toast.success("Logged out successfully 👋", { position: "top-right" });
    navigate("/");
  };

  const cancelLogout = () => {
    setShowConfirm(false);
  };

  return (
    <>
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
            onClick={handleLogoutClick}
            className="bg-black text-white px-4 py-1 rounded hover:bg-gray-800 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm mx-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-1">
              Logout Confirmation
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Are you sure you want to log out?
            </p>

            <div className="flex gap-3">
              <button
                onClick={cancelLogout}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="flex-1 px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition text-sm font-medium"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;