import React, { useEffect, useState } from "react";
import "./events.css";
import { db } from "../../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import EventCard from "./EventCard";

function MyEvents({ userId, onEventClick }) {
  const [userEvents, setUserEvents] = useState([]);
  const [expiredEvents, setExpiredEvents] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const eventsCollection = collection(db, "events");
      const q = query(eventsCollection, where("uid", "==", userId)); // Removed the orderBy here

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const eventsData = [];
        const expiredEventsData = [];
        const currentDate = new Date();

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const eventDate = new Date(data.date + " " + data.time);

          if (eventDate > currentDate) {
            eventsData.push({
              id: doc.id,
              title: data.title,
              date: eventDate,
              location: data.location,
              thumbnail: data.thumbnail,
              price: data.price,
              time: data.time,
              description: data.description,
              images: data.images,
            });
          } else {
            expiredEventsData.push({
              id: doc.id,
              title: data.title,
              date: eventDate,
              location: data.location,
              thumbnail: data.thumbnail,
              price: data.price,
              time: data.time,
              description: data.description,
              images: data.images,
            });
          }
        });

        // Sort upcoming events by date and time in ascending order
        eventsData.sort((a, b) => a.date - b.date);

        // Sort expired events by date and time in ascending order
        expiredEventsData.sort((a, b) => a.date - b.date);

        setUserEvents(eventsData);
        setExpiredEvents(expiredEventsData);
      });

      return () => unsubscribe();
    };

    fetchData();
  }, [userId]);

  return (
    <div className="events-feed">
      <h2>Your Upcoming Events</h2>
      {userEvents.length === 0 ? (
        <div className="no-events-message">
          You have not added any events yet.
        </div>
      ) : (
        userEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onClick={() => onEventClick(event)}
          />
        ))
      )}

      <h2>Expired Events</h2>
      {expiredEvents.length === 0 ? (
        <div className="no-events-message">You have no expired events.</div>
      ) : (
        expiredEvents.map((event) => (
          <div className="expired-event-card" key={event.id}>
            <EventCard event={event} onClick={() => onEventClick(event)} />
          </div>
        ))
      )}
    </div>
  );
}

export default MyEvents;
