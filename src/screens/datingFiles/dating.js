import React, { useState } from "react";
import styles from "./Dating.module.css";
import davitImage from "../../images/dav.jpeg";
import hovsepImage from "../../images/hos.jpeg";

const users = [
  { id: 1, name: "Davit", image: davitImage },
  { id: 2, name: "Hovsep", image: hovsepImage },
  // ... Add more profiles as needed
];

function Dating() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null); // Store the previous index

  const handleSwipe = (direction) => {
    if (direction === "right") {
      // Logic for a "like"
    } else if (direction === "left") {
      // Logic for a "dislike"
    }
    setPrevIndex(currentIndex); // Store the current index before moving on
    setCurrentIndex((prevIndex) => prevIndex + 1); // move to next profile
  };

  const handleReverse = () => {
    if (prevIndex !== null) {
      setCurrentIndex(prevIndex);
      setPrevIndex(null); // Clear out the previous index after reversing to avoid multiple reverses
    }
  };

  return (
    <div className={styles.datingContainer}>
      {currentIndex < users.length ? (
        <div className={styles.profile}>
          <img src={users[currentIndex].image} alt={users[currentIndex].name} />
          <div className={styles.profileInfo}>
            <p>{users[currentIndex].name}</p>
            <div className={styles.btonContainer}>
              <button
                className={`${styles.bton} ${styles.reverse}`}
                onClick={handleReverse} // Handle reverse logic
              >
                <i className="fa fa-undo"></i>
              </button>
              <button
                className={`${styles.bton} ${styles.dislike}`}
                onClick={() => handleSwipe("left")}
              >
                <i className="fa fa-times"></i>
              </button>
              <button
                className={`${styles.bton} ${styles.superlike}`}
                // onClick={() => /* Handle superlike logic */}
              >
                <i className="fa fa-star"></i>
              </button>
              <button
                className={`${styles.bton} ${styles.like}`}
                onClick={() => handleSwipe("right")}
              >
                <i className="fa fa-heart"></i>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>No more profiles left!</p>
      )}
    </div>
  );
}

export default Dating;
