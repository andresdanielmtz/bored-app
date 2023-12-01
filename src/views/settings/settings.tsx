import { useState } from "react";
import { Link } from "react-router-dom";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <h1>Settings</h1>

      <button onClick={toggleDarkMode}>
        {darkMode ? "Disable Dark Mode" : "Enable Dark Mode"}
      </button>

      <Link to="/" className="btn btn-primary">
        Go to Main
      </Link>
    </>
  );
}
