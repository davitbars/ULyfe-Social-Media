import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import "./swiping.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo, faHeart, faTimes, faStar, faComment } from '@fortawesome/free-solid-svg-icons';


const Swiping = ({ currentProfileUid, setCurrentProfileUid }) => {
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

        if (combinedProfiles.length > 0) {
          setCurrentProfileUid(combinedProfiles[0].uid);
        }
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();


  }, []);

  useEffect(() => {
    // Update currentProfileUid whenever currentIndex changes
    if (currentIndex < profiles.length) {
      setCurrentProfileUid(profiles[currentIndex].uid);
    }
  }, [currentIndex, profiles, setCurrentProfileUid]);

  const handleSwipe = (direction) => {
    if (direction === 'right') {
      // Handle "like" logic here
    } else if (direction === 'left') {
      // Handle "dislike" logic here
    }
    setPrevIndex(currentIndex);
    setCurrentIndex((prevIndex) => prevIndex + 1);
    setCurrentImageIndex(0);
  };

  const handleReverse = () => {
    if (prevIndex !== null) {
      setCurrentIndex(prevIndex);
      setPrevIndex(null);
      setCurrentProfileUid(profiles[prevIndex].uid);
      setCurrentImageIndex(0);

    }
  };
  

  const handleInstantMessage = () => {
    console.log("IM has been clicked");
  };

  const handleImageClick = (event) => {
    const clickX = event.nativeEvent.offsetX;
    const imageWidth = event.target.clientWidth;
    const numPics = profiles[currentIndex].profileImages.length;

    if (clickX < imageWidth / 2) {
      if (currentImageIndex !== 0) {
        setCurrentImageIndex(currentImageIndex - 1);
      }
    }
    else {
      if (currentImageIndex < numPics -1) {
        setCurrentImageIndex(currentImageIndex + 1);
      }
      else {
        setCurrentImageIndex(0);
      }
    };
  };

  return (
    <div>
      {currentIndex < profiles.length ? (
        <div className='swiping'>
          <img
            src={profiles[currentIndex].profileImages[currentImageIndex]}
            alt={profiles[currentIndex].name}
            className="profile-image"
            id="profile-image"
            onClick={handleImageClick}
          />
          <p className='person-name'>{profiles[currentIndex].name}, {profiles[currentIndex].age}</p>
          <div className="button-container">
            <button onClick={handleReverse} className='reverse'>
              <FontAwesomeIcon icon={faUndo} /> {/* Reverse */}
            </button>
            <button onClick={() => handleSwipe('left')} className='dislike'>
              <FontAwesomeIcon icon={faTimes} /> {/* Dislike */}
            </button>
            <button onClick={() => handleSwipe('superlike')} className='superlike'>
              <FontAwesomeIcon icon={faStar} /> {/* Superlike */}
            </button>
            <button onClick={() => handleSwipe('right')} className='like'>
              <FontAwesomeIcon icon={faHeart} /> {/* Like */}
            </button>
            <button onClick={() => handleInstantMessage()} className='message'>
              <FontAwesomeIcon icon={faComment} /> {/* Instant Message */}
            </button>
          </div>
        </div>
      ) : (
        <h3 className='none-left'>No more profiles left!</h3>
      )}
    </div>
  );
};

export default Swiping;