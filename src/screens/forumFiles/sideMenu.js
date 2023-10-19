import React, { useState } from "react";
import "./sideMenu.css";

function SideMenu({ setSelectedTag, selectedTag }) {
  const [categories, setCategories] = useState([
    { name: "General", tag: "general" },
    { name: "Professors", tag: "professors" },
    { name: "Classes", tag: "classes" },
    { name: "Majors", tag: "majors" },
    { name: "Clubs", tag: "clubs" },
    { name: "Restaurants", tag: "restaurants" },
    { name: "Frats/Sororities", tag: "frats-sororities" },
  ]);
  console.log("Current Selected Tag:", selectedTag);

  const handleTagClick = (tag) => {
    console.log("Tag clicked:", tag);

    setSelectedTag(tag);
  };

  return (
    <div className="side-menu-box">
      {categories.map((category, index) => (
        <div
          key={index}
          className={`category ${category.tag === selectedTag ? "active" : ""}`}
        >
          <div
            className="category-content"
            onClick={() => handleTagClick(category.tag)}
          >
            <div className="category-title">{category.name}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SideMenu;
