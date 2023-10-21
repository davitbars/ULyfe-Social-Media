import React, { useState, useEffect } from 'react';
import './Filters.css';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Filters = ({ applyFilters }) => {
  const [raceFilter, setRaceFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [ageFilter, setAgeFilter] = useState('');

  useEffect(() => {
    // Apply filters when any of the filter options change
    applyFilters({
      age: ageFilter,
      race: raceFilter,
      gender: genderFilter,
    });
  }, [ageFilter, raceFilter, genderFilter]);

  return (
    <div className="filters">
      <select
        className="select-box"
        value={ageFilter}
        onChange={(e) => setAgeFilter(e.target.value)}
      >
        <option value="">Age</option>
        <option value="18-20">18-20</option>
        <option value="21-23">21-23</option>
        <option value="24-26">24-26</option>
        <option value="27-29">27-29</option>
        <option value="30+">30+</option>
      </select>

      <select
        className="select-box"
        value={raceFilter}
        onChange={(e) => setRaceFilter(e.target.value)}
      >
        <option value="">Race</option>
        <option value="Caucasian">Caucasian</option>
        <option value="African American">African American</option>
        <option value="Hispanic">Hispanic</option>
        <option value="Asian">Asian</option>
      </select>

      <select
        className="select-box"
        value={genderFilter}
        onChange={(e) => setGenderFilter(e.target.value)}
      >
        <option value="">Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>

      <button className="select-box">
        More Filters
        <FontAwesomeIcon icon={faFilter} />
      </button>
    </div>
  );
};

export default Filters;
