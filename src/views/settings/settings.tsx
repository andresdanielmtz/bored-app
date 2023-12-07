import { useState } from "react";
import { Link } from "react-router-dom";


export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <h1 className="text-3xl font-bold">Settings</h1>
      <div className="flex flex-col my-10">
        <button
          className={`btn ${darkMode ? "btn-secondary" : "btn-primary"}`}
          onClick={toggleDarkMode}
        >
          {darkMode ? "Disable Dark Mode" : "Enable Dark Mode"}
        </button>

        <Link to="/" className="btn btn-primary mt-4">
          Go to Main
        </Link>
      </div>
    </>
  );
}
