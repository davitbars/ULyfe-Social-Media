import styles from "./Auth.module.css";
import React, { useState } from "react";

const Auth = ({ onAuth }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleAuthAttempt = () => {
    // First, check if the email is a .edu email.
    if (!email.endsWith(".edu")) {
      alert("Please use a student email ending with");
      return; // Stop further execution if this check fails
    }

    // Then, if it's a sign-up attempt, check the password confirmation.
    if (!isLogin && password !== confirmPassword) {
      alert("Passwords do not match!");
      return; // Stop further execution if this check fails
    }

    // If both checks pass, proceed with the authentication.
    onAuth(email, password);
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
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {!isLogin && (
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        )}
        <button onClick={handleAuthAttempt}>
          {isLogin ? "Login" : "Signup"}
        </button>
        <button onClick={() => setIsLogin(!isLogin)}>
          Switch to {isLogin ? "Signup" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Auth;
