import React, { useState } from "react";
import Gallery from "react-image-gallery";
import "./EventDetails.css";

function EventDetails({ event, onClose }) {
  const [showImageOverlay, setShowImageOverlay] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // New state

  const images =
    event && event.images
      ? event.images.map((image, index) => ({
          original: image,
          thumbnail: image,
          originalWidth: 200,
          originalHeight: 200,
        }))
      : [];

  const openImageOverlay = (index) => {
    console.log("Image clicked with index:", selectedImageIndex);
    setShowImageOverlay(true);
  };

  const closeImageOverlay = () => {
    setShowImageOverlay(false);
  };

  if (!event) {
    return null;
  }

  return (
    <div className="event-details-container">
      <h2>{event.title}</h2>

      <Gallery
        items={images}
        onSlide={(index) => setSelectedImageIndex(index)}
        onClick={openImageOverlay}
      />

      <div className="data-box">
        <p className="eventDate">
          Date: {event.date ? new Date(event.date).toLocaleDateString() : ""}
        </p>

        <p className="eventPrice">Price: ${event.price}</p>
        <p className="eventLocation">Location: {event.location}</p>
        <p className="eventDescription">Description: {event.description}</p>
      </div>

      {showImageOverlay && (
        <div className="image-overlay" onClick={closeImageOverlay}>
          {selectedImageIndex < images.length ? (
            <img src={images[selectedImageIndex].original} alt={event.title} />
          ) : null}
        </div>
      )}
    </div>
  );
}

export default EventDetails;
