import "./App.css";
import Header from "./components/header";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Account from "./screens/account";
import Dating from "./screens/datingFiles/dating";
import Forum from "./screens/forumFiles/forum";
import Events from "./screens/eventsFiles/events";
import Auth from "./components/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);

  // Initialize Firebase auth
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      console.log("Auth user:", authUser);
      setUser(authUser);
    });
  
    return () => {
      unsubscribe();
    };
  }, [auth]);
  

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="auth"
          element={
            user ? (
              // User is authenticated, redirect to the forum
              <Navigate to="/screens/forum" replace />
            ) : (
              // User is not authenticated, display the Auth component
              <Auth />
            )
          }
        />
        <Route
          path="screens"
          element={
            user ? (
              // User is authenticated, display the forum and other pages
              <>
                <Route index element={<Forum />} />
                <Route path="account" element={<Account />} />
                <Route path="dating" element={<Dating />} />
                <Route path="forum" element={<Forum />} />
                <Route path="events" element={<Events />} />
              </>
            ) : (
              // User is not authenticated, redirect to the Auth component
              <Navigate to="/auth" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
