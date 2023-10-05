import React, { createContext } from "react";
import Account from "./screens/account";
import Dating from "./screens/datingFiles/dating";
import Events from "./screens/eventsFiles/events";
import Auth from "./components/auth";
import CreatePost from "./screens/forumFiles/CreatePost";
import Forum from "./screens/forumFiles/forum";
import Header from "./components/header";
import AdditionalInfo from "./components/additional-info";

import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route, useLocation } from "react-router-dom";

// Create a context to share the user state across components
export const UserContext = createContext(null);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="screens/*" element={<ScreensRoutes />} />
        <Route path="createpost" element={<CreatePost />} />
      </Routes>
    </Router>
  );
}

function ScreensRoutes() {
  const location = useLocation();

  // Conditionally render Header: Don't render it if path is '/screens/additional-info'
  const shouldShowHeader = location.pathname !== "/screens/additional-info";

  return (
    <div>
      {shouldShowHeader && <Header />}{" "}
      <Routes>
        <Route index element={<Forum />} />
        <Route path="account" element={<Account />} />
        <Route path="dating" element={<Dating />} />
        <Route path="forum" element={<Forum />} />
        <Route path="events" element={<Events />} />
        <Route path="additional-info" element={<AdditionalInfo />} />
      </Routes>
    </div>
  );
}
export default App;
