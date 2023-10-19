import React, { useState } from "react";
import "./CreatePost.css";
import { addForumPost } from "../../firebaseFunctions";
import { useNavigate } from "react-router-dom";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { auth } from "../../firebase"; // Import the authentication module

const CreatePost = ({ onCancel }) => {
  const [formData, setFormData] = useState({
    forumTitle: "",
    description: "",
    tags: "",
  });

  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  // Get the current user's ID if available, or set it to null if not logged in
  const userId = auth.currentUser ? auth.currentUser.uid : null;

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
        <div className="input-group">
          <label>Description:</label>
          <textarea
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
          <select
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="input-field"
            required
          >
            <option value="">Select a tag...</option>
            <option value="general">General</option>
            <option value="professors">Professors</option>
            <option value="classes">Classes</option>
            <option value="majors">Majors</option>
            <option value="clubs">Clubs</option>
            <option value="restaurants">Restaurants</option>
            <option value="frats-sororities">Frats/Sororities</option>
          </select>
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
