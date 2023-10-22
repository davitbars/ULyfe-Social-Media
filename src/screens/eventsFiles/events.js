import React, { useEffect, useState } from "react";
import "./events.css";
import EventSideMenu from "./EventSideMenu";
import EventCard from "./EventCard";
import EventDetails from "./EventDetails";
import SecondaryHeader from "./SecondaryHeader";
import CreateEvent from "./CreateEvent";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import MyEvents from "./MyEvents";
import { auth } from "../../firebase";

function Events() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); // Fix the initial value
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    price: [],
    location: [],
    eventType: [],
  });
  const [showMyEvents, setShowMyEvents] = useState(false);
  const [userId, setUserId] = useState(null);

  const myEvents = [];
  const handleMyEventsClick = () => {
    setShowMyEvents(!showMyEvents);
  };

  const isPriceInRange = (price, range) => {
    const numPrice = parseInt(price, 10);

    if (isNaN(numPrice)) return false;

    switch (range) {
      case "Free":
        return numPrice === 0;
      case "1-15":
        return numPrice >= 1 && numPrice <= 15;
      case "16-25":
        return numPrice >= 16 && numPrice <= 25;
      case "26+":
        return numPrice >= 26;
      default:
        return true;
    }
  };

  const filteredEvents = showMyEvents
    ? myEvents
    : events.filter((event) => {
        return (
          (selectedFilters.price.length === 0 ||
            selectedFilters.price.some((price) =>
              isPriceInRange(event.price, price)
            )) &&
          (selectedFilters.location.length === 0 ||
            selectedFilters.location.includes(event.location)) &&
          (selectedFilters.eventType.length === 0 ||
            selectedFilters.eventType.includes(event.type))
        );
      });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const querySnapshot = await getDocs(collection(db, "events"));
  //       const eventsData = [];
  //       querySnapshot.forEach((doc) => {
  //         const data = doc.data();
  //         eventsData.push({
  //           id: doc.id,
  //           title: data.title,
  //           date: data.date,
  //           price: data.price,
  //           location: data.location,
  //           thumbnail: data.thumbnail,
  //           description: data.description,
  //           images: data.images,
  //           time: data.time,
  //           type: data.type,
  //         });
  //       });
  //       eventsData.sort((a, b) => new Date(a.date) - new Date(b.date));
  //       setEvents(eventsData);
  //     } catch (error) {
  //       console.error("Error fetching events: ", error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "events"));
        const eventsData = [];

        // Get the current date and time
        const currentDate = new Date();

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const eventDate = new Date(data.date + " " + data.time); // Combine date and time

          // Check if the event date is in the future
          if (eventDate > currentDate) {
            eventsData.push({
              id: doc.id,
              title: data.title,
              date: eventDate, // Store as Date object
              price: data.price,
              location: data.location,
              thumbnail: data.thumbnail,
              description: data.description,
              images: data.images,
              time: data.time,
              type: data.type,
            });
          }
        });

        eventsData.sort((a, b) => a.date - b.date); // Sort by date

        setEvents(eventsData);
        if (eventsData.length > 0) {
          setSelectedEvent(eventsData[0]);
        }
      } catch (error) {
        console.error("Error fetching events: ", error);
      }
    };

    fetchData();
  }, []);
  const handleEventClick = (event) => {
    console.log("Event Clicked:", event);
    setSelectedEvent(event);
    setShowCreateEvent(false);
  };

  const handleCloseDetails = () => {
    setSelectedEvent(null);
  };

  const handleCreateEventClick = () => {
    setShowCreateEvent(!showCreateEvent);
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        console.log("Logged-in user ID:", user.uid);
      } else {
        console.log("No user is logged in.");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <SecondaryHeader
        onCreateEventClick={handleCreateEventClick}
        onMyEventsClick={handleMyEventsClick}
      />
      <div className="events-page">
        <EventSideMenu
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
        <div className="events-container">
          {showMyEvents ? (
            <MyEvents userId={userId} onEventClick={handleEventClick} />
          ) : (
            <div className="event-list">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onClick={() => handleEventClick(event)}
                />
              ))}
            </div>
          )}
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
