import React from 'react';
import './events.css'; 
import EventSideMenu from './EventSideMenu';

function Events() {
  return (
    <div className="events-page">
      {/* Left Side Menu */}
      <EventSideMenu />

      {/* Main Content */}
      <div className="main-content">
        <h1>Welcome to the Events Page</h1>
        <p>
          This is where you can find information about upcoming events and filters to refine
          your search.
        </p>
        <p>Random text goes here...</p>
      </div>
    </div>
  );
}

export default Events;
