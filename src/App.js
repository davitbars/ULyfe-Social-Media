import React, { useEffect, useState, useContext, createContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Account from "./screens/account";
import Dating from "./screens/datingFiles/dating";
import Forum from "./screens/forumFiles/forum";
import Events from "./screens/eventsFiles/events";
import Auth from "./components/auth";
import Header from "./components/header";
// import { auth } from "./firebase"; // Import the Auth instance from firebase.js
import { onAuthStateChanged } from "firebase/auth";
import "./App.css";
import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "./firebase"; // Assuming firebase.js is in the same directory as App.js
import CreatePost from "./screens/forumFiles/CreatePost";


// Create a context to share the user state across components
export const UserContext = createContext(null);

function App() {
  return (
    <Router>
      <UserContext.Provider value={useUserAuth()}>
        <Routes>
          <Route path="/" element={<AuthManager />} />
          <Route path="auth" element={<Auth />} />
          <Route path="screens/*" element={<ScreensRoutes />} />
          <Route path="createpost" element={<CreatePost />} /> 
        </Routes>
      </UserContext.Provider>
    </Router>
  );
}

// Custom hook to manage user authentication state
function useUserAuth() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    console.log("User state changed:", user);
  }, [user]);

  const login = async (email, password) => {
    try {
      console.log("Attempting login with", email, password); // Add logging
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Login successful:", userCredential); // Add logging

      setUser(userCredential.user);
    } catch (error) {
      console.error("Login error:", error.message);
      alert(`Login error: ${error.message}`);
    }
  };

  const signup = async (email, password) => {
    try {
      console.log("Attempting signup with", email, password); // Add logging
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Signup successful:", userCredential); // Add logging

      setUser(userCredential.user);
      await sendEmailVerification(userCredential.user);
      alert("Account created! Please check your email for verification.");
    } catch (error) {
      console.error("Signup error:", error.message);
      alert(`Signup error: ${error.message}`);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => {
      unsubscribe();
    };
  }, []);

  return { user, login, signup };
}

function AuthManager() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  console.log("AuthManager rendered with user:", user); // Add this log

  useEffect(() => {
    if (user) {
      console.log("Navigating to /screens/forum");
      navigate("/screens/forum");
    } else {
      console.log("Navigating to /auth");
      navigate("/auth");
    }
  }, [user, navigate]);

  // Define the callback to handle successful authentication
  const handleAuthSuccess = () => {
    console.log("Authentication successful, navigating to /screens/forum");
    navigate("/screens/forum");
  };

  return user ? <Header /> : <Auth onAuth={handleAuthSuccess} />;
}

function ScreensRoutes() {
  return (
    <div>
      <Header /> {/* Moved Header here */}
      <Routes>
        <Route index element={<Forum />} />
        <Route path="account" element={<Account />} />
        <Route path="dating" element={<Dating />} />
        <Route path="forum" element={<Forum />} />
        <Route path="events" element={<Events />} />

      </Routes>
    </div>
  );
}
export default App;
