import React, { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check the initial theme from localStorage or system preference
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const defaultDark = savedTheme === "dark" || (!savedTheme && prefersDark);

    setIsDarkMode(defaultDark);
    document.documentElement.classList.toggle("dark", defaultDark);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", !isDarkMode ? "dark" : "light");
  };

  return (
    <Button
      onClick={toggleDarkMode}
      color="gray"
      className="border-none rounded-full"
    >
      {isDarkMode ? <MdLightMode size={24} /> : <MdDarkMode size={24} />}
    </Button>
  );
}

export default DarkModeToggle;
