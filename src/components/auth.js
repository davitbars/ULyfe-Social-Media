import styles from "./Auth.module.css";
import React, { useState } from "react";
import {firebase} from '../firebase'; // Use the relative path to the firebase.js file


const Auth = ({ onAuth }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
        // Login with Firebase
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } else {
        // Sign up with Firebase
        const userCredential = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);

        // Send email verification
        await userCredential.user.sendEmailVerification();

        alert("Account created! Please check your email for verification.");
      }

      // Authentication successful, call the onAuth callback
      onAuth(email, password);
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
