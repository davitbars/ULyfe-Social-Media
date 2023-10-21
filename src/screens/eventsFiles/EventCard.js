import React from "react";
import "./EventCard.css";

function EventCard({ event, onClick }) {
  console.log(event);

  return (
    <div className="event-card-container">
      <div className="event-card" onClick={onClick}>
        <div className="event-thumbnail">
          <img src={event.thumbnail} alt={event.title} />
        </div>
        <div className="event-card-details">
          <h2 className="event-title">{event.title}</h2>
          <p className="event-location">{event.location}</p>
          <p className="event-price">{event.price}</p>
          <p className="event-time">{event.time}</p>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
