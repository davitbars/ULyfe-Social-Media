import React, { useEffect, useState } from "react";
import "./events.css";
import EventSideMenu from "./EventSideMenu";
import EventCard from "./EventCard";
import EventDetails from "./EventDetails";
import SecondaryHeader from "./SecondaryHeader";
import CreateEvent from "./CreateEvent";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

function Events() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(0);
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    price: "",
    location: "",
    eventType: "",
  });

  const isPriceInRange = (price, range) => {
    const numPrice = parseInt(price, 10);

    if (isNaN(numPrice)) return false; // handle non-numeric prices

    switch (range) {
      case "Free":
        return numPrice === 0;
      case "0-15":
        return numPrice >= 0 && numPrice <= 15;
      case "16-25":
        return numPrice >= 16 && numPrice <= 25;
      case "26+":
        return numPrice >= 26;
      default:
        return true; // handle any unexpected range value
    }
  };

  const filteredEvents = events.filter((event) => {
    return (
      (!selectedFilters.price ||
        isPriceInRange(event.price, selectedFilters.price)) &&
      (!selectedFilters.location ||
        selectedFilters.location === event.location) &&
      (!selectedFilters.eventType || selectedFilters.eventType === event.type)
    );
  });

  // Fetch forum post data from Firestore when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "events"));
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
            time: data.time,
            type: data.type,
          });
        });
        events.sort((a, b) => new Date(a.date) - new Date(b.date));

        setEvents(events);
      } catch (error) {
        console.error("Error fetching events: ", error);
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
        <EventSideMenu
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
        <div className="events-container">
          <div className="event-list">
            {filteredEvents.map((event) => (
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
