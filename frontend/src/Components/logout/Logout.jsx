import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");

      console.log("Logged out successfully!");

      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <>
      <div onClick={handleLogout} style={{ cursor: "pointer" }}>
        Logout
      </div>
    </>
  );
};

export default Logout;
