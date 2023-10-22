import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where, getDoc, setDoc, doc } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import "./swiping.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo, faHeart, faTimes, faStar, faComment } from '@fortawesome/free-solid-svg-icons';

const Swiping = ({ currentProfileUid, setCurrentProfileUid, filters, profilesAvailable, setProfilesAvailable }) => {
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); 
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Query all profile UIDs that the user has interacted with (liked, disliked, superliked)
        const userActionsRef = doc(db, 'userActions', auth.currentUser.uid);
        const userActionsSnapshot = await getDoc(userActionsRef);
        const userActionsData = userActionsSnapshot.data() || {};
        const likes = userActionsData.likes || [];
        const dislikes = userActionsData.dislikes || [];
        const superlikes = userActionsData.superlikes || [];
        const userInteractions = [...likes, ...dislikes, ...superlikes];
  
        // Query all dating profiles excluding user interactions and current user's own profile
        const datingProfilesQuery = query(
          collection(db, 'datingProfiles'),
          where('uid', 'not-in', [...userInteractions, auth.currentUser.uid])
        );
        const datingProfilesSnapshot = await getDocs(datingProfilesQuery);
  
        if (datingProfilesSnapshot.empty) {
          // Handle the case when there are no more profiles
          console.log('All out of profiles from your school. Check back soon.');
          return;
        }
  
        const datingProfilesData = datingProfilesSnapshot.docs.map((doc) => doc.data());
  
        // Fetch user data for the remaining profiles
        const userIds = datingProfilesData.map((profile) => profile.uid);
        const usersQuery = query(collection(db, 'users'), where('uid', 'in', userIds));
        const usersSnapshot = await getDocs(usersQuery);
        const usersData = usersSnapshot.docs.reduce((acc, doc) => {
          acc[doc.data().uid] = doc.data();
          return acc;
        }, {});
  
        // Combine profiles and user data
        const combinedProfiles = datingProfilesData
          .filter((profile) => profile.uid !== auth.currentUser.uid)
          .map((profile) => ({
            ...profile,
            ...usersData[profile.uid],
          }));
  
          const filteredProfiles = combinedProfiles.filter((profile) => {
            if (
              profile &&
              (
                (!filters.age) || // No age filter, return all profiles
                (filters.age === "30+" && profile.age >= 30) || // Handle "30+" case
                (filters.age !== "30+" && ageFilter(profile, filters.age)) // Handle other age ranges
              ) &&
              (!filters.race || filters.race === "Any" || profile.race === filters.race) &&
              (!filters.gender || filters.gender === "Any" || profile.gender === filters.gender)
            ) {
              return true;
            }
            return false;
          });
          
          function ageFilter(profile, ageRange) {
            const [minAgeStr, maxAgeStr] = ageRange.split('-');
            if (maxAgeStr === "+") {
              const minAge = parseInt(minAgeStr);
              return profile.age >= minAge;
            } else {
              const minAge = parseInt(minAgeStr);
              const maxAge = parseInt(maxAgeStr);
              return profile.age >= minAge && profile.age <= maxAge;
            }
          }
          
          

        setProfiles(filteredProfiles);
  
        if (filteredProfiles.length > 0) {
          setCurrentProfileUid(filteredProfiles[0].uid);
          setProfilesAvailable(true); // Update profilesAvailable state here
        } else {
          setProfilesAvailable(false); // Update profilesAvailable state here
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [filters]);


  useEffect(() => {
    // Update currentProfileUid whenever currentIndex changes
    if (currentIndex < profiles.length) {
      setCurrentProfileUid(profiles[currentIndex].uid);
      setProfilesAvailable(true);
    } else if (currentIndex >= profiles.length) {
      setCurrentProfileUid(null);
      setProfilesAvailable(false);
    }
  }, [currentIndex, profiles, setCurrentProfileUid]);

  const handleSwipe = (direction) => {
    if (direction === 'right') {
      const likedProfileUid = profiles[currentIndex].uid;
      // Assuming `auth.currentUser` is available and contains the user's information
      const userActionsRef = doc(db, 'userActions', auth.currentUser.uid);

      getDoc(userActionsRef).then((docSnapshot) => {
        if (docSnapshot.exists()) {
          // Document exists, update the 'likes' array
          const userActionsData = docSnapshot.data();
          userActionsData.likes.push(likedProfileUid);

          // Update the document with the new 'likes' array
          setDoc(userActionsRef, userActionsData);
        } else {
          // Document doesn't exist, create a new document
          setDoc(userActionsRef, { likes: [likedProfileUid], dislikes: [], superlikes: [] });
        }
      });
    } else if (direction === 'left') {
      const dilikedProfileUid = profiles[currentIndex].uid;
      // Assuming `auth.currentUser` is available and contains the user's information
      const userActionsRef = doc(db, 'userActions', auth.currentUser.uid);

      getDoc(userActionsRef).then((docSnapshot) => {
        if (docSnapshot.exists()) {
          // Document exists, update the 'likes' array
          const userActionsData = docSnapshot.data();
          userActionsData.dislikes.push(dilikedProfileUid);

          // Update the document with the new 'likes' array
          setDoc(userActionsRef, userActionsData);
        } else {
          // Document doesn't exist, create a new document
          setDoc(userActionsRef, { likes: [], dislikes: [dilikedProfileUid], superlikes: [] });
        }
      });
    } else if (direction === 'superlike') {
      const superlikedProfileUid = profiles[currentIndex].uid;
      const userActionsRef = doc(db, 'userActions', auth.currentUser.uid);

      getDoc(userActionsRef).then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const userActionsData = docSnapshot.data();
          userActionsData.superlikes.push(superlikedProfileUid);

          setDoc(userActionsRef, userActionsData);
        } else {
          setDoc(userActionsRef, { likes: [], dislikes: [], superlikes: [superlikedProfileUid] });
        }
      });
    }
    setPrevIndex(currentIndex);
    setCurrentIndex((prevIndex) => prevIndex + 1);
    setCurrentImageIndex(0);
  };

  const handleReverse = () => {
    if (prevIndex !== null) {
      const likedProfileUid = profiles[prevIndex].uid; // Get the UID of the profile to be removed
      const userActionsRef = doc(db, 'userActions', auth.currentUser.uid);
  
      getDoc(userActionsRef)
        .then((docSnapshot) => {
          if (docSnapshot.exists()) {
            // Document exists, update the corresponding action array
            const userActionsData = docSnapshot.data();
  
            userActionsData.likes = userActionsData.likes.filter(uid => uid !== likedProfileUid);
            userActionsData.dislikes = userActionsData.dislikes.filter(uid => uid !== likedProfileUid);
            userActionsData.superlikes = userActionsData.superlikes.filter(uid => uid !== likedProfileUid);
  
            // Update the document with the modified action arrays
            setDoc(userActionsRef, userActionsData);
          } else {
            // Document doesn't exist, which is unexpected in this case
            console.error('UserActions document not found.');
          }
        })
        .catch((error) => {
          console.error('Error handling reverse:', error);
        });
  
      // Set the previous index and current index
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
      if (currentImageIndex < numPics - 1) {
        setCurrentImageIndex(currentImageIndex + 1);
      }
      else {
        setCurrentImageIndex(0);
      }
    };
  };
  return (
    <div>
      {profiles.length > 0 && currentIndex < profiles.length ? (
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
        <h3 className='none-left'>No more profiles left for your school! Check back soon.</h3>
      )}
    </div>
  );

};

export default Swiping; 