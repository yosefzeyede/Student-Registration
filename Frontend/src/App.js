import React, { useState } from "react";
import Studentregistration from "./insertion/Studentregistration";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

function App({ user, setUser }) {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      {/* ================= TOP BAR ================= */}

      <div className="top-bar">
        {/* Dark / Light */}
        <button className="theme-button" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? (
            <>
              <FontAwesomeIcon icon={faSun} />
              Light
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faMoon} />
              Dark
            </>
          )}
        </button>
      </div>

      <Studentregistration user={user} setUser={setUser} />
    </div>
  );
}

export default App;
