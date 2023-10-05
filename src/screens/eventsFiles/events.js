import React, { useEffect, useState } from 'react';
import './events.css';
import EventSideMenu from './EventSideMenu';
import EventCard from './EventCard';
import EventDetails from './EventDetails';
import SecondaryHeader from './SecondaryHeader';
import CreateEvent from './CreateEvent';
import { db } from '../../firebase';
import { collection, getDocs } from "firebase/firestore";

function Events() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(0);
  const [showCreateEvent, setShowCreateEvent] = useState(false);

  // Fetch forum post data from Firestore when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'events'));
        const events = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          events.push({
            id: doc.id,
            title: data.title,
            date: data.date,
            price: data.price,
            location: data.location,
            thumbnail: data.thumbnail,
            description: data.description,
            images: data.images,
          });
        });
        setEvents(events);
      } catch (error) {
        console.error('Error fetching events: ', error);
      }
    };

    fetchData();
  }, []);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowCreateEvent(false);
  };

  const handleCloseDetails = () => {
    setSelectedEvent(null);
  };

  const handleCreateEventClick = () => {
    setShowCreateEvent(!showCreateEvent);
  };

  return (
    <div>
      <SecondaryHeader onCreateEventClick={handleCreateEventClick} />
      <div className="events-page">
        <EventSideMenu />
        <div className="events-container">
          <div className="event-list">
            {events.map((event) => ( // Use the 'events' state variable here
              <EventCard
                key={event.id}
                event={event}
                onClick={() => handleEventClick(event)}
              />
            ))}
          </div>
        </div>

        {showCreateEvent ? (
          <CreateEvent onCancel={() => setShowCreateEvent(false)} />
        ) : (
          <EventDetails event={selectedEvent} onClose={handleCloseDetails} />
        )}
      </div>
    </div>
  );
}

export default Events;
