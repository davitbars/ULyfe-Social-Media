// EventSideMenu.js

import React, { useState } from 'react';
import './EventSideMenu.css';

function EventSideMenu() {
  // Define state for selected filters
  const [selectedFilters, setSelectedFilters] = useState({
    price: [],
    location: [],
    eventType: [],
    // Add more categories here
  });

  // Function to handle checkbox selection
  const handleFilterChange = (category, value) => {
    setSelectedFilters((prevSelectedFilters) => ({
      ...prevSelectedFilters,
      [category]: prevSelectedFilters[category].includes(value)
        ? prevSelectedFilters[category].filter((item) => item !== value)
        : [...prevSelectedFilters[category], value],
    }));
  };

  return (
    <div className="event-side-menu">
      <div className="filter-category">
        <h3>Price</h3>
        <ul>
          <li>
            <label>
              <input
                type="checkbox"
                value="Free"
                onChange={() => handleFilterChange('price', 'Free')}
                checked={selectedFilters.price.includes('Free')}
              />
              Free
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                value="0-15"
                onChange={() => handleFilterChange('price', '0-15')}
                checked={selectedFilters.price.includes('0-15')}
              />
              0-15
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                value="16-25"
                onChange={() => handleFilterChange('price', '16-25')}
                checked={selectedFilters.price.includes('16-25')}
              />
              16-25
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                value="26+"
                onChange={() => handleFilterChange('price', '26+')}
                checked={selectedFilters.price.includes('26+')}
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
                type="checkbox"
                value="On Campus"
                onChange={() => handleFilterChange('location', 'On Campus')}
                checked={selectedFilters.location.includes('On Campus')}
              />
              On Campus
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                value="Off Campus"
                onChange={() => handleFilterChange('location', 'Off Campus')}
                checked={selectedFilters.location.includes('Off Campus')}
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
                type="checkbox"
                value="Party"
                onChange={() => handleFilterChange('eventType', 'Party')}
                checked={selectedFilters.eventType.includes('Party')}
              />
              Party
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                value="Club"
                onChange={() => handleFilterChange('eventType', 'Club')}
                checked={selectedFilters.eventType.includes('Club')}
              />
              Club
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                value="Opening"
                onChange={() => handleFilterChange('eventType', 'Opening')}
                checked={selectedFilters.eventType.includes('Opening')}
              />
              Opening
            </label>
          </li>
        </ul>
      </div>

      {/* Add more filter categories as needed */}
    </div>
  );
}

export default EventSideMenu;
