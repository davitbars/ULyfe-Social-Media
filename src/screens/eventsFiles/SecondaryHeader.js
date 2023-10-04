import React from "react";
import "./SecondaryHeader.css";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";


function SecondaryHeader() {
    return (
        <div className="secondary-header">
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            ></link>
            <div className="search-bar">
                <input type="text" placeholder="Search Forums"></input>
            </div>
            <button className="my-events-button">My Events</button>
            <Link to="/createpost" className="create-post-button"><FaPlus /></Link>
        </div>
    );
}

export default SecondaryHeader;
