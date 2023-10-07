import React, { useState, useEffect } from "react";
import AccountNotSetUp from "./accountNotSetup";
import { getDoc, doc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import Swiping from './swiping'; 


const Dating = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        // User is logged in
        const userId = firebaseUser.uid;

        // Fetch user data using the user ID
        fetchUserData(userId);
      } else {
        // User is not logged in, handle as needed
        setUser(null);
      }
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  // Function to fetch user data using the user ID
  const fetchUserData = async (userId) => {
    try {
      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUser(userData);
      } else {
        console.log("No user data found for user:", userId);
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>; // You can add a loading indicator
  }

  // Check the datingProfileSetup property
  if (user.datingProfileSetup === false) {
    return <AccountNotSetUp />;
  }

  // If datingProfileSetup is true, render your dating component
  return (
    <div>
      <h1>Welcome to the Dating Page</h1>
      <Swiping />
    </div>
  );
};

export default Dating;
