import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session (e.g., localStorage, cookies, or context state)
    localStorage.removeItem("authToken"); // Example: Removing token from localStorage

    // Redirect to login page or home page
    navigate("/login");
  };

  return (
    <li onClick={handleLogout}>
      Logout
    </li>
  );
};

export default Logout;
