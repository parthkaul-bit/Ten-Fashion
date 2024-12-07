import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/useContext";

const Logout = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useUserContext();
  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      setCurrentUser(null);
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
