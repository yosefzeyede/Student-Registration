import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Login from "./Component/Login";

function Root() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <Login setUser={setUser} />;
  }

  return <App user={user} setUser={setUser} />;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Root />
  </>,
);
