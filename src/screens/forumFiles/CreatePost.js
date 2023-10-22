import React, { useState } from "react";
import "./CreatePost.css";
import { addForumPost } from "../../firebaseFunctions";
import { useNavigate } from "react-router-dom";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { auth } from "../../firebase"; 
import Select from "react-select";

const CreatePost = ({ onCancel }) => {
  const [formData, setFormData] = useState({
    
    forumTitle: "",
    description: "",
    tags: [],
  });

  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  const userId = auth.currentUser ? auth.currentUser.uid : null;
  
  const tagOptions = [
    // General
    { value: "professors", label: "Professors" },
    { value: "classes", label: "Classes" },
    { value: "majors", label: "Majors" },
    { value: "clubs", label: "Clubs" },
    { value: "restaurants", label: "Restaurants" },
    { value: "frats-sororities", label: "Frats/Sororities" },
  
    // Academics
    { value: "study-tips", label: "Study Tips" },
    { value: "internships", label: "Internships" },
    { value: "academic-challenges", label: "Academic Challenges" },
  
    // Campus Life
    { value: "campus-events", label: "Campus Events" },
    { value: "roommate-issues", label: "Roommate Issues" },
    { value: "dorm-life", label: "Dorm Life" },
    { value: "student-organizations", label: "Student Organizations" },
    { value: "sports-athletics", label: "Sports and Athletics" },
    { value: "campus-safety", label: "Campus Safety" },
  
    // Wellness
    { value: "mental-health", label: "Mental Health" },
    { value: "fitness-health", label: "Fitness and Health" },
  
    // Finance
    { value: "part-time-jobs", label: "Part-Time Jobs" },
    { value: "student-loans", label: "Student Loans" },
    { value: "student-discounts", label: "Student Discounts" },
    { value: "student-budgeting", label: "Student Budgeting" },
  
    // Student Life
    { value: "international-students", label: "International Students" },
    { value: "student-housing", label: "Student Housing" },
  
    // Experiences
    { value: "travel-adventure", label: "Travel and Adventure" },
    { value: "alumni-stories", label: "Alumni Stories" },
  
    // Creativity
    { value: "art-creativity", label: "Art and Creativity" },
    { value: "lgbtq-support", label: "LGBTQ+ Support" },
  
    // Tech & Gadgets
    { value: "technology-gadgets", label: "Technology and Gadgets" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImages(selectedImages);
  };

  const handleBackClick = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate("/screens/forum");
    }
  };

  const handleTagChange = (selectedTags) => {
    const tagValues = selectedTags ? selectedTags.map((tag) => tag.value) : [];
    setFormData({ ...formData, tags: tagValues });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.tags) {
      console.error("Tags are required.");
      return;
    }

    if (!userId) {
      console.error("User not authenticated.");
      return;
    }

    try {
      // Ensure required fields are filled out
      if (!formData.forumTitle || !formData.description) {
        console.error("Forum Title and Description are required.");
        return;
      }

      const postId = await addForumPost(userId, {
        forumTitle: formData.forumTitle,
        description: formData.description,
        tags: formData.tags,
        images: images,
      });

      setFormData({
        forumTitle: "",
        description: "",
        tags: "",
      });
      setImages([]);

      setShowSuccessNotification(true);

      setTimeout(() => {
        handleBackClick();
      }, 3000);
    } catch (error) {
      console.error("Error adding forum post: ", error);
    }
  };

  return (
    <div className="create-post-container">
      <button onClick={handleBackClick} className="back-button">
        <FaRegArrowAltCircleLeft />
      </button>
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Forum Title:</label>
          <input
            type="text"
            name="forumTitle"
            value={formData.forumTitle}
            onChange={handleChange}
            className="input-field"
            required // This field is required
          />
        </div>
        <div className="input-group description">
          <label>Description:</label>
          <textarea
            rows={4}
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="input-field"
            required // This field is required
          />
        </div>
        <div className="input-group">
          <label>Images:</label>
          <input
            type="file"
            name="images"
            multiple
            onChange={handleImageChange}
            className="input-field"
          />
        </div>
        <div className="input-group">
        <label>Tags:</label>
        <div>
          <Select
            name="tags"
            value={tagOptions.filter((option) =>
              formData.tags.includes(option.value)
            )}
            options={tagOptions}
            onChange={handleTagChange}
            isMulti 
            className="input-field"
            menuPosition="fixed"
          />
        </div>
      </div>
        <button type="submit" className="submit-button">
          Create Post
        </button>
      </form>

      {showSuccessNotification && (
        <div className="success-notification">
          Post created successfully. Redirecting...
        </div>
      )}
    </div>
  );
};

export default CreatePost;
