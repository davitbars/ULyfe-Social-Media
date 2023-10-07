import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';

const Swiping = () => {
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const datingProfilesQuery = query(collection(db, 'datingProfiles'));
        const datingProfilesSnapshot = await getDocs(datingProfilesQuery);
        const datingProfilesData = datingProfilesSnapshot.docs.map((doc) => doc.data());

        const usersQuery = query(collection(db, 'users'), where('uid', 'in', datingProfilesData.map((profile) => profile.uid)));
        const usersSnapshot = await getDocs(usersQuery);
        const usersData = usersSnapshot.docs.reduce((acc, doc) => {
          acc[doc.data().uid] = doc.data();
          return acc;
        }, {});

        const combinedProfiles = datingProfilesData.map((profile) => ({
          ...profile,
          ...usersData[profile.uid],
        }));

        setProfiles(combinedProfiles);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSwipe = (direction) => {
    if (direction === 'right') {
      // Handle "like" logic here
    } else if (direction === 'left') {
      // Handle "dislike" logic here
    }
    setPrevIndex(currentIndex);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handleReverse = () => {
    if (prevIndex !== null) {
      setCurrentIndex(prevIndex);
      setPrevIndex(null);
    }
  };

  return (
    <div>
      {currentIndex < profiles.length ? (
        <div>
          <img src={profiles[currentIndex].profileImages[0]} alt={profiles[currentIndex].name} />
          <p>{profiles[currentIndex].name}</p>
          {/* Display other profile information here */}
          <div>
            <button onClick={handleReverse}>Reverse</button>
            <button onClick={() => handleSwipe('left')}>Dislike</button>
            <button onClick={() => handleSwipe('right')}>Like</button>
          </div>
        </div>
      ) : (
        <p>No more profiles left!</p>
      )}
    </div>
  );
};

export default Swiping;
