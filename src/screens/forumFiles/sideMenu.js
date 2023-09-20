import React, { useState } from 'react';
import "./sideMenu.css";

function SideMenu() {
  const [categories, setCategories] = useState([
    {
      name: 'Professors',
      subcategories: ['Professor 1', 'Professor 2', 'Professor 3'],
      isOpen: false,
    },
    {
      name: 'Classes',
      subcategories: ['Class 1', 'Class 2', 'Class 3'],
      isOpen: false,
    },
    {
      name: 'Majors',
      subcategories: ['Major 1', 'Major 2', 'Major 3'],
      isOpen: false,
    },
    // ... Other categories
  ]);

  const handleCategoryClick = (index) => {
    setCategories((prevCategories) => {
      const newCategories = prevCategories.map((category, i) => {
        if (i === index) {
          return { ...category, isOpen: !category.isOpen };
        } else {
          return { ...category, isOpen: false };
        }
      });
      return newCategories;
    });
  };

  return (
    <div className="side-menu-box">
      {categories.map((category, index) => (
        <div key={index} className={`category ${category.isOpen ? 'active' : ''}`}>
          <div className="category-content" onClick={() => handleCategoryClick(index)}>
            <div className="category-title">
              {category.name}
            </div>
            <span className={`arrow ${category.isOpen ? 'up' : 'down'}`}>
              {category.isOpen ? '▲' : '▼'}
            </span>
          </div>
          {category.isOpen && (
            <ul className="subcategory-list">
              {category.subcategories.map((subcategory, subIndex) => (
                <li key={subIndex}>{subcategory}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

export default SideMenu;
