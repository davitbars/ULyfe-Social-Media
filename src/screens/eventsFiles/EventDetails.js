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
      <h2>{event.title}</h2>

      <Gallery items={images} onClick={openImageOverlay} />

      <div className='data-box'>
        <p className='eventDate'>Date: {event.date}</p>
        <p className='eventPrice'>Price: {event.price}</p>
        <p className='eventLocation'>Location: {event.location}</p>
        <p className='eventDescription'>Description: {event.description}</p>
      </div>

      {showImageOverlay && (
        <div className="image-overlay" onClick={closeImageOverlay}>
          <img src={images[0].original} alt={event.title} />
        </div>
      )}
    </div>
  );
}

export default EventDetails;
