import React, { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  console.log("currentUser:", currentUser);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        loading,
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
