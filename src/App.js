import "./App.css";
import Header from "./components/header";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Account from "./screens/account";
import Dating from "./screens/datingFiles/dating";
import Forum from "./screens/forumFiles/forum";
import Events from "./screens/eventsFiles/events";
import Auth from "./components/auth";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const handleAuth = (email, password) => {
    if (email.endsWith(".edu")) {
      setIsAuthenticated(true);
    } else {
      alert("Please use a student email ending with .edu");
      return; // This return is crucial. Without it, even if the alert shows, the code will continue executing.
    }
  };

  // If not authenticated, just return the Auth component
  if (!isAuthenticated) {
    return <Auth onAuth={handleAuth} />;
  }

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/screens">
          <Route index element={<Forum />} />
          <Route path="account" element={<Account />} />
          <Route path="dating" element={<Dating />} />
          <Route path="forum" element={<Forum />} />
          <Route path="events" element={<Events />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
