import React, { useState, useEffect } from "react";
import styles from "./Auth.module.css";
import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
} from "../firebase";
import { useNavigate } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState(false); // <-- New State for Validation
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (newUser) => {
      if (newUser && newUser.emailVerified) {
        // Check if additional info is already filled
        const userInfo = await getUserInfoFromFirestore(newUser.uid);
        if (userInfo && Object.keys(userInfo).length > 0) {
          navigate("/screens/forum");
        } else {
          navigate("/screens/additional-info");
        }
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const getUserInfoFromFirestore = async (uid) => {
    try {
      const userRef = doc(db, "users", uid);
      console.log(`Fetching data for path: users/${uid}`);

      const userDoc = await getDoc(userRef);
      console.log(userDoc.data());
      if (userDoc.exists()) {
        console.log("Manually fetched data:", userDoc.data());
      } else {
        console.error("Manual fetch failed.");
      }

      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log("User data fetched:", userData);
        return userData;
      } else {
        console.log("No additional info found for user:", uid);

        return null;
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
      return null;
    }
  };

  const handleAuthAttempt = async (e) => {
    e.preventDefault(); // <-- Prevent the default form behavior

    // New check to ensure fields aren't blank
    if (!email || !password || (!isLogin && !confirmPassword)) {
      setValidationError(true);
      return;
    }
    if (!email.endsWith(".edu")) {
      alert("Please use a student email");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await sendEmailVerification(userCredential.user);
        alert("Verification email sent. Please check your inbox.");
      }
    } catch (error) {
      console.error("Authentication error:", error.message);
      alert("Check credentials or user does not exist");
    }
  };

  return (
    <div className={styles.container}>
      <h1>{isLogin ? "Login" : "Signup"}</h1>
      <div className={styles["auth-container"]}>
        <form onSubmit={handleAuthAttempt}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${styles.inputBox} ${
                validationError && !email ? styles.error : ""
              }`}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${styles.inputBox} ${
                validationError && !password ? styles.error : ""
              }`}
            />
          </div>
          {!isLogin && (
            <div>
              <label>Confirm Password:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`${styles.inputBox} ${
                  validationError && !confirmPassword ? styles.error : ""
                }`}
              />
            </div>
          )}
          <button className={styles.login} onClick={handleAuthAttempt}>
            {isLogin ? "Login" : "Signup"}
          </button>
          <button className={styles.login} onClick={() => setIsLogin(!isLogin)}>
            Switch to {isLogin ? "Signup" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
