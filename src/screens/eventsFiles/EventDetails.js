import React, { useState } from 'react';
import Gallery from 'react-image-gallery';
import './EventDetails.css';

function EventDetails({ event, onClose }) {
  const [showImageOverlay, setShowImageOverlay] = useState(false);

  const images = event.images.map((image, index) => ({
    original: image,
    thumbnail: image,
    originalWidth: 200,
    originalHeight: 200,
  }));

  const openImageOverlay = () => {
    setShowImageOverlay(true);
  };

  const closeImageOverlay = () => {
    setShowImageOverlay(false);
  };

  return (
    <div className="event-details-container">
      <button onClick={onClose}>Close</button>
      <h2>{event.title}</h2>

      <Gallery items={images} onClick={openImageOverlay} />

      <p>Date: {event.date}</p>
      <p>Price: {event.price}</p>
      <p>Description: {event.description}</p>

      {showImageOverlay && (
        <div className="image-overlay" onClick={closeImageOverlay}>
          <img src={images[0].original} alt={event.title} />
        </div>
      )}
    </div>
  );
}

export default EventDetails;
