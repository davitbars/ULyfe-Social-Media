import React from "react";
import "./rightSideSection.css";

function RightSideSection() {
  // Sample data for trending talks (replace with actual data later)
  const trendingTalks = [
    { title: "Chat Title 1", count: 25351 },
    { title: "Chat Title 2", count: 20854 },
    { title: "Chat Title 3", count: 15688 },
    { title: "Chat Title 4", count: 12043 },
    { title: "Chat Title 5", count: 10856 },
  ];

  return (
    <div className="right-side-section-box">
      <div className="trending-talks">
        <h2>Trending Talks</h2>
        <ul>
          {trendingTalks.map((talk, index) => (
            <li key={index}>
              <strong>{talk.title}</strong>
              <span>{talk.count} chats</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="advertisement">
        <img src="https://via.placeholder.com/150" alt="Advertisement" />
        <p>Ad</p>
      </div>
    </div>
  );
}

export default RightSideSection;
