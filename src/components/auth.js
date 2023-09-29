import styles from "./Auth.module.css";
import React, { useState } from "react";
// import { auth } from "../firebase"; // Import the Auth instance from firebase.js
import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "../firebase"; // Import from your firebase.js file, assuming it's located one directory up
import { useNavigate } from "react-router-dom";

const Auth = ({ onAuth }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleAuthAttempt = async () => {
    // First, check if the email is a .edu email.
    if (!email.endsWith(".edu")) {
      alert("Please use a student email ending with .edu");
      return; // Stop further execution if this check fails
    }

    // Then, if it's a sign-up attempt, check the password confirmation.
    if (!isLogin && password !== confirmPassword) {
      alert("Passwords do not match!");
      return; // Stop further execution if this check fails
    }

    try {
      if (isLogin) {
        console.log("Attempting login with", email, password); // Debugging line

        // Login with Firebase
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log("Firebase response:", userCredential);
        navigate("/screens/forum"); // Navigate immediately
      } else {
        // Sign up with Firebase
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        // Send email verification
        await sendEmailVerification(userCredential.user);

        alert("Account created! Please check your email for verification.");
        navigate("/screens/forum"); // Navigate immediately
      }

      // Authentication successful, call the onAuth callback
      if (typeof onAuth === "function") {
        onAuth();
      }
    } catch (error) {
      console.error("Authentication error:", error.message);
      alert(`Authentication error: ${error.message}`);
    }
  };

  return (
    <div className={styles.container}>
      <h1>{isLogin ? "Login" : "Signup"}</h1>
      <div className={styles["auth-container"]}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.inputBox}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.inputBox}
          />
        </div>
        {!isLogin && (
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={styles.inputBox}
            />
          </div>
        )}
        <button className={styles.login} onClick={handleAuthAttempt}>
          {isLogin ? "Login" : "Signup"}
        </button>
        <button className={styles.login} onClick={() => setIsLogin(!isLogin)}>
          Switch to {isLogin ? "Signup" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Auth;
