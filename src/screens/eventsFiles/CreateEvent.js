import React, { useState } from "react";
import "./CreateEvent.css";
import { addEvent } from "../../firebaseFunctions";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
const CreateEvent = ({ onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    price: "",
    type: "",
  });

  const [thumbnail, setThumbnail] = useState(null); // Separate state for thumbnail
  const [images, setImages] = useState([]); // Separate state for images

  const navigate = useNavigate(); // Get the navigate function
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    if (e.target.name === "thumbnail") {
      const selectedThumbnail = e.target.files[0];
      setThumbnail(selectedThumbnail);
    } else if (e.target.name === "images") {
      const selectedImages = Array.from(e.target.files);
      setImages(selectedImages);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userUID = auth.currentUser ? auth.currentUser.uid : null;

    try {
      // Ensure required fields are filled out
      if (
        !formData.title ||
        !formData.description ||
        !formData.date ||
        !formData.time ||
        !formData.location ||
        !formData.price ||
        !images[0] // Ensure a thumbnail image is selected
      ) {
        // Display an error message or handle it as you prefer
        console.error(
          "All fields except images are required, and a thumbnail image is required."
        );
        return;
      }

      // Call the addEvent function to add the event to the database
      await addEvent({
        title: formData.title,
        description: formData.description,
        date: formData.date,
        time: formData.time,
        location: formData.location,
        price: formData.price,
        thumbnail: thumbnail, // Include the thumbnail image (first image in the array)
        images: images,
        type: formData.type,
        uid: userUID,
        // Exclude the thumbnail from the images array
      });

      // Reset the form fields after successful submission
      setFormData({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        price: "",
      });
      setImages([]); // Clear selected images

      // Show a success notification
      setShowSuccessNotification(true);

      // Redirect to the events screen after a delay (e.g., 3 seconds)
      setTimeout(() => {
        navigate("/screens/events");
      }, 3000); // 3000 milliseconds (3 seconds) delay
    } catch (error) {
      console.error("Error adding event: ", error);
    }
  };

  return (
    <div className="create-event-container">
      <h2>Create New Event</h2>
      <div className="create-event-content">
        <form onSubmit={handleSubmit} className="event-form">
          <div className="input-group">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
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
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="input-field"
              required // This field is required
            />
          </div>
          <div className="input-group">
            <label>Time:</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="input-field"
              required // This field is required
            />
          </div>
          <div className="input-group">
            <label>Price:</label>
            <input
              type="number" // Change type to number
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="input-field"
              required
              min="0" // Ensure the price is non-negative
            />
          </div>
          <div className="input-group">
            <label>Location:</label>
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="input-field"
              required
            >
              <option value="">Select a location</option>
              <option value="on campus">On Campus</option>
              <option value="off campus">Off Campus</option>
            </select>
          </div>
          <div className="input-group">
            <label>Type:</label>
            <select
              name="type"
              value={formData.type} // Ensure you add 'type' to your formData state
              onChange={handleChange}
              className="input-field"
              required
            >
              <option value="">Select an event type</option>
              <option value="party">Party</option>
              <option value="clubs">Clubs</option>
              <option value="school">School</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="input-group">
            <label>Thumbnail Image:</label>
            <input
              type="file"
              name="thumbnail"
              onChange={handleImageChange}
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
          <button type="submit" className="submit-button">
            Create Event
          </button>
        </form>

        {showSuccessNotification && (
          <div className="success-notification">
            Event created successfully. Redirecting...
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateEvent;
