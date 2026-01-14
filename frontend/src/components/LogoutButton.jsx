import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
    >
      Logout
    </button>
  );
}
