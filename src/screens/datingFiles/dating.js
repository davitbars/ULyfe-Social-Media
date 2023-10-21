import React, { useState, useEffect } from "react";
import AccountNotSetUp from "./accountNotSetup";
import { getDoc, doc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import Swiping from './swiping';
import "./dating.css";
import ProfileInfo from './ProfileInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart, faCrown } from '@fortawesome/free-solid-svg-icons';
import Filters from "./Filters";


const Dating = () => {
  const [user, setUser] = useState(null);
  const [currentProfileUid, setCurrentProfileUid] = useState();
  const [profilesAvailable, setProfilesAvailable] = useState(true);
  const [filters, setFilters] = useState({
    age: "Any",
    race: "Any",
    gender: "Any",
  });

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

  const applyFilters = (filters) => {
    setFilters(filters);
  };


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
    <div className="full-box">
      <div className="top-buttons">
        <button className="button chat-icon">
          <FontAwesomeIcon icon={faComment} />
        </button>
        <button className="button heart-icon">
          <FontAwesomeIcon icon={faHeart} />
        </button>

        <button className="button crown-icon">
          <FontAwesomeIcon icon={faCrown} />
        </button>
      </div>
      <div className="filters">
        <Filters applyFilters={applyFilters} />
      </div>
      <div className="dating-container">

        <div className="swiping-container">
          <Swiping currentProfileUid={currentProfileUid} setCurrentProfileUid={setCurrentProfileUid} filters={filters} profilesAvailable={profilesAvailable} setProfilesAvailable={setProfilesAvailable} />
        </div>
        {profilesAvailable && (
          <div className="info-container">
            <ProfileInfo currentProfileUid={currentProfileUid} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dating;
