import React, { useState } from "react";
import "./sideMenu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faBook,
  faUsers,
  faHeart,
  faDollarSign,
  faBuilding,
  faCalendarAlt,
  faPalette,
  faLaptop,
  faCaretDown,
  faCaretLeft,
} from "@fortawesome/free-solid-svg-icons";

function SideMenu({ setSelectedTag, selectedTag }) {
  const [categories, setCategories] = useState([
    {
      name: "General",
      icon: faGraduationCap,
      tags: [
        { name: "Professors", tag: "professors" },
        { name: "Classes", tag: "classes" },
        { name: "Majors", tag: "majors" },
        { name: "Clubs", tag: "clubs" },
        { name: "Restaurants", tag: "restaurants" },
        { name: "Frats/Sororities", tag: "frats-sororities" },
      ],
    },
    {
      name: "Academics",
      icon: faBook,
      tags: [
        { name: "Study Tips", tag: "study-tips" },
        { name: "Internships", tag: "internships" },
        { name: "Academic Challenges", tag: "academic-challenges" },
      ],
    },
    {
      name: "Campus Life",
      icon: faUsers,
      tags: [
        { name: "Campus Events", tag: "campus-events" },
        { name: "Roommate Issues", tag: "roommate-issues" },
        { name: "Dorm Life", tag: "dorm-life" },
        { name: "Student Organizations", tag: "student-organizations" },
        { name: "Sports and Athletics", tag: "sports-athletics" },
        { name: "Campus Safety", tag: "campus-safety" },
      ],
    },
    {
      name: "Wellness",
      icon: faHeart,
      tags: [
        { name: "Mental Health", tag: "mental-health" },
        { name: "Fitness and Health", tag: "fitness-health" },
      ],
    },
    {
      name: "Finance",
      icon: faDollarSign,
      tags: [
        { name: "Part-Time Jobs", tag: "part-time-jobs" },
        { name: "Student Loans", tag: "student-loans" },
        { name: "Student Discounts", tag: "student-discounts" },
        { name: "Student Budgeting", tag: "student-budgeting" },
      ],
    },
    {
      name: "Student Life",
      icon: faBuilding,
      tags: [
        { name: "International Students", tag: "international-students" },
        { name: "Student Housing", tag: "student-housing" },
      ],
    },
    {
      name: "Experiences",
      icon: faCalendarAlt,
      tags: [
        { name: "Travel and Adventure", tag: "travel-adventure" },
        { name: "Alumni Stories", tag: "alumni-stories" },
      ],
    },
    {
      name: "Creativity",
      icon: faPalette,
      tags: [
        { name: "Art and Creativity", tag: "art-creativity" },
        { name: "LGBTQ+ Support", tag: "lgbtq-support" },
      ],
    },
    {
      name: "Tech & Gadgets",
      icon: faLaptop,
      tags: [
        { name: "Technology and Gadgets", tag: "technology-gadgets" },
      ],
    },
  ]);

  const [openCategory, setOpenCategory] = useState(null);

  const handleCategoryClick = (categoryName) => {
    if (openCategory === categoryName) {
      setOpenCategory(null);
    } else {
      setOpenCategory(categoryName);
    }
  };

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };
  return (
    <div className="side-menu-box">
      {categories.map((category, index) => (
        <div key={index}>
          <div className="category-header">
            <div
              className={`category ${category.name === openCategory ? "active" : ""}`}
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="category-content">
                <FontAwesomeIcon
                  icon={category.icon}
                  className="category-icon"
                />
                <div className="category-title">{category.name}</div>
                <div className="category-caret-icon">
                  {category.name === openCategory ? (
                    <FontAwesomeIcon icon={faCaretDown} />
                  ) : (
                    <FontAwesomeIcon icon={faCaretLeft} />
                  )}
                </div>
              </div>
            </div>
          </div>
          {category.name === openCategory && (
            <div className="tags-container">
              {category.tags.map((tag, tagIndex) => (
                <div
                  key={tagIndex}
                  className={`sub-tag ${tag.tag === selectedTag ? "active" : ""}`}
                  onClick={() => handleTagClick(tag.tag)}
                >
                  {tag.name}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default SideMenu;
