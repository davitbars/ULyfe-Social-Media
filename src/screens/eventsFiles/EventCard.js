import React from 'react';
import './EventCard.css';

function EventCard({event, onClick}) {
    return (
        <div className="event-card" onClick={onClick}>
            <div className="event-thumbnail" >
                <img src={event.thumbnail} alt={event.title} />
            </div>
            <div className="event-card-details">
                <h2 className="event-title">{event.title}</h2>
                <p className="event-location">{event.location}</p>
                <p className="event-price">{event.price}</p>
                <p className="event-date">{event.date}</p>
            </div>
        </div>
    );
}

export default EventCard;
