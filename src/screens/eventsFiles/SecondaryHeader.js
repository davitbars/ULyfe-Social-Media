import React from "react";
import "./SecondaryHeader.css";
import { Link } from "react-router-dom";
import { FaCalendarPlus } from "react-icons/fa";

function SecondaryHeader({ onCreateEventClick, onMyEventsClick }) {
  // Added onMyEventsClick here
  return (
    <div className="secondary-header">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <div className="search-bar">
        <input type="text" placeholder="Search Forums"></input>
      </div>
      <Link to="#" className="my-events-button" onClick={onMyEventsClick}>
        My Events
      </Link>
      <Link to="#" className="create-event-button" onClick={onCreateEventClick}>
        <FaCalendarPlus />
      </Link>
    </div>
  );
}

export default SecondaryHeader;
