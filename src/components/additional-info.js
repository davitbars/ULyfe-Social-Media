import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import styles from "./Auth.module.css";

const AdditionalInfo = () => {
  const [major, setMajor] = useState("");
  const [campus, setCampus] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [name, setName] = useState("");
  const [datingProfileSetup, setDatingProfileSetup] = useState(false);
  const [datingProfile, setDatingProfile] = useState(null);
  const [validationError, setValidationError] = useState(false); // <-- new state for validation
  const navigate = useNavigate();

  const handleInfoSubmit = async () => {
    if (!name || !major || !campus || !graduationYear) {
      setValidationError(true);
      return;
    }
    try {
      const userRef = doc(db, "users", auth.currentUser.uid);
      await setDoc(userRef, {
        uid: auth.currentUser.uid,
        name,
        major,
        campus,
        graduationYear,
        datingProfileSetup,
        datingProfile,
      });
      console.log("Before Navigation");
      navigate("/screens/forum");
      console.log("after navigation");
    } catch (error) {
      console.error("Error adding user additional info: ", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles["auth-container"]}>
        <form onSubmit={(e) => e.preventDefault()}>
          <h1>Additional Info</h1>

          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`${styles.inputBox} ${
              validationError && !name ? styles.error : ""
            }`}
            required
          />

          <label>Major:</label>
          <input
            type="text"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            className={`${styles.inputBox} ${
              validationError && !major ? styles.error : ""
            }`} // <-- conditional styling
            required
          />

          <label>Campus:</label>
          <input
            type="text"
            value={campus}
            onChange={(e) => setCampus(e.target.value)}
            className={`${styles.inputBox} ${
              validationError && !campus ? styles.error : ""
            }`} // <-- conditional styling
            required
          />

          <label>Expected Graduation Year:</label>
          <input
            type="text"
            value={graduationYear}
            onChange={(e) => setGraduationYear(e.target.value)}
            className={`${styles.inputBox} ${
              validationError && !graduationYear ? styles.error : ""
            }`} // <-- conditional styling
            required
          />

          <button
            type="submit"
            onClick={handleInfoSubmit}
            className={styles.login}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdditionalInfo;
