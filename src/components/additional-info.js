import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth"; // Importing onAuthStateChanged

const AdditionalInfo = () => {
  const [major, setMajor] = useState("");
  const [campus, setCampus] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleInfoSubmit = async () => {
    try {
      const userRef = doc(db, "users", auth.currentUser.uid); // This gets a reference to a specific document with the UID
      await setDoc(userRef, {
        uid: auth.currentUser.uid,
        name,
        major,
        campus,
        graduationYear,
      });
      navigate("/screens/forum");
    } catch (error) {
      console.error("Error adding user additional info: ", error);
    }
  };

  // // Effect to monitor user's email verification status
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (!user) return; // No user logged in

  //     if (user.emailVerified) {
  //       navigate("/screens/forum");
  //     } else {
  //       alert("Please verify your email before accessing the forum.");
  //       // Optionally: Log the user out and navigate them back to the login page
  //       // await signOut(auth);
  //       // navigate("/auth");
  //     }
  //   });

  //   // Clean up the listener on component unmount
  //   return () => {
  //     unsubscribe();
  //   };
  // }, [navigate]);

  return (
    <div>
      <h1>Additional Info</h1>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Major:</label>
        <input
          type="text"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
        />
        <label>Campus:</label>
        <input
          type="text"
          value={campus}
          onChange={(e) => setCampus(e.target.value)}
        />
        <label>Expected Graduation Year:</label>
        <input
          type="text"
          value={graduationYear}
          onChange={(e) => setGraduationYear(e.target.value)}
        />
        <button onClick={handleInfoSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default AdditionalInfo;
