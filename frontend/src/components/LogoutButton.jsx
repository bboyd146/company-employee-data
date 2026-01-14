import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove auth data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Optional: clear axios header if you set one globally
    // delete axios.defaults.headers.common["Authorization"];

    // Redirect to login
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition shadow"
    >
      Logout
    </button>
  );
}
