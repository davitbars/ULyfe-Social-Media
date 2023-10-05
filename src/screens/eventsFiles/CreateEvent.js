import React, { useState } from "react";
import "./CreateEvent.css"; // Import the CSS file for styling
import { addEvent } from "../../firebaseFunctions"; // Import your Firebase function
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const CreateEvent = ({ onCancel }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        price: "",
    });

    const [images, setImages] = useState([]); // Separate state for images
    const navigate = useNavigate(); // Get the navigate function
    const [showSuccessNotification, setShowSuccessNotification] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const selectedImages = Array.from(e.target.files);
        setImages(selectedImages);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

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
                console.error("All fields except images are required, and a thumbnail image is required.");
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
                thumbnail: images[0], // Include the thumbnail image (first image in the array)
                images: images.slice(1), // Exclude the thumbnail from the images array
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
                navigate("screens/events"); 
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
                        <label>Location:</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="input-field"
                            required // This field is required
                        />
                    </div>
                    <div className="input-group">
                        <label>Price:</label>
                        <input
                            type="text"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="input-field"
                            required // This field is required
                        />
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
