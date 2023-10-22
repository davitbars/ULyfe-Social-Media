import React from "react";
import "./EventSideMenu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo } from "@fortawesome/free-solid-svg-icons";

function EventSideMenu({ selectedFilters, setSelectedFilters }) {
  const handleFilterChange = (category, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [category]: value,
    }));
  };

  const resetFilters = () => {
    setSelectedFilters({
      price: "",
      location: "",
      eventType: "",
    });
  };

  return (
    <div className="event-side-menu">
      <div className="filter-category">
        <h3>Price</h3>
        <ul>
          <li>
            <label>
              <input
                type="radio"
                name="price"
                value="Free"
                onChange={() => handleFilterChange("price", "Free")}
                checked={selectedFilters.price === "Free"}
              />
              Free
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                name="price"
                value="0-15"
                onChange={() => handleFilterChange("price", "0-15")}
                checked={selectedFilters.price === "0-15"}
              />
              0-15
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                name="price"
                value="16-25"
                onChange={() => handleFilterChange("price", "16-25")}
                checked={selectedFilters.price === "16-25"}
              />
              16-25
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                name="price"
                value="26+"
                onChange={() => handleFilterChange("price", "26+")}
                checked={selectedFilters.price === "26+"}
              />
              26+
            </label>
          </li>
        </ul>
      </div>

      <div className="filter-category">
        <h3>Location</h3>
        <ul>
          <li>
            <label>
              <input
                type="radio"
                name="location"
                value="on campus"
                onChange={() => handleFilterChange("location", "on campus")}
                checked={selectedFilters.location === "on campus"}
              />
              On Campus
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                name="location"
                value="off campus"
                onChange={() => handleFilterChange("location", "off campus")}
                checked={selectedFilters.location === "off campus"}
              />
              Off Campus
            </label>
          </li>
        </ul>
      </div>

      <div className="filter-category">
        <h3>Event Type</h3>
        <ul>
          <li>
            <label>
              <input
                type="radio"
                name="eventType"
                value="party"
                onChange={() => handleFilterChange("eventType", "party")}
                checked={selectedFilters.eventType === "party"}
              />
              Party
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                name="eventType"
                value="clubs"
                onChange={() => handleFilterChange("eventType", "clubs")}
                checked={selectedFilters.eventType === "clubs"}
              />
              Clubs
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                name="eventType"
                value="school"
                onChange={() => handleFilterChange("eventType", "school")}
                checked={selectedFilters.eventType === "school"}
              />
              School
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                name="eventType"
                value="other"
                onChange={() => handleFilterChange("eventType", "other")}
                checked={selectedFilters.eventType === "other"}
              />
              Other
            </label>
          </li>
        </ul>
      </div>
      <button onClick={resetFilters}>
        <FontAwesomeIcon icon={faUndo} /> Reset Filters
      </button>

      {/* Add more filter categories as needed */}
    </div>
  );
}

export default EventSideMenu;
