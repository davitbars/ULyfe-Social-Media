import React, { useState } from "react";
import "./CreatePost.css"; // Import the CSS file for styling
import { addForumPost } from "../../firebaseFunctions"; // Import your Firebase function

const CreatePost = () => {
  const [formData, setFormData] = useState({
    forumTitle: "",
    description: "",
    images: [],
    tags: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "images") {
      // Handle file input for images
      const selectedImages = Array.from(e.target.files);
      setFormData({ ...formData, images: selectedImages });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Extract the user ID (replace with your actual authentication logic)
    const userId = "your-user-id";

    try {
      // Call the addForumPost function to add the post to the database
      const postId = await addForumPost(userId, formData);

      // Reset the form fields after successful submission
      setFormData({
        forumTitle: "",
        description: "",
        images: [],
        tags: "",
      });

      console.log(`Forum post added with ID: ${postId}`);
    } catch (error) {
      console.error("Error adding forum post: ", error);
    }
  };

  return (
    <div className="create-post-container">
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
          />
        </div>
        <div className="input-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div className="input-group">
          <label>Images:</label>
          <input
            type="file"
            name="images"
            multiple
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div className="input-group">
          <label>Tags:</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <button type="submit" className="submit-button">
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
