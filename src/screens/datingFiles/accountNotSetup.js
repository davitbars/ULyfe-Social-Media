import React, { useState } from 'react';
import './accountNotSetup.css';
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, auth } from "../../firebase";
import { storage } from '../../firebase';

const AccountNotSetUp = () => {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        profileImages: ['', '', ''],
        bio: '',
        hobbies: '',
        race: '', // Updated: Changed race to a dropdown
        gender: '', // Updated: Changed gender to a dropdown
        age: '',
    });

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    
const handleFileInputChange = async (e) => {
    const selectedImages = Array.from(e.target.files);
  
    try {
      // Create an array to store the download URLs
      const downloadURLs = [];
  
      // Loop through the selected images and upload each one
      for (const imageFile of selectedImages) {
        const storageRef = ref(storage, `datingProfileImages/${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
  
        // Get the download URL for the uploaded image
        const imageURL = await getDownloadURL(storageRef);
        downloadURLs.push(imageURL);
      }
  
      // Set the download URLs in your state
      setFormData({
        ...formData,
        profileImages: downloadURLs,
      });
    } catch (error) {
      console.error('Error uploading images:', error);
      // Handle the error as needed
    }
  };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // TODO: Add form validation logic here

        // Check if required fields are not empty
        if (
            !formData.profileImages[0] ||
            !formData.profileImages[1] ||
            !formData.profileImages[2] ||
            !formData.bio ||
            !formData.race ||
            !formData.gender ||
            !formData.age
        ) {
            alert('Please fill in all required fields.');
            return;
        }

        try {
            const currentUser = auth.currentUser; // Get the currently authenticated user

            if (!currentUser) {
                // Handle the case where the user is not authenticated
                alert('User not authenticated.');
                return;
            }

            // Assuming you have a 'datingProfiles' collection in Firestore
            const datingProfileData = {
                profileImages: formData.profileImages,
                bio: formData.bio,
                hobbies: formData.hobbies,
                race: formData.race,
                gender: formData.gender,
                age: formData.age,
                uid: currentUser.uid,
            };

            // Add the data to Firestore and get the reference to the created document
            const docRef = await addDoc(collection(db, 'datingProfiles'), datingProfileData);

            console.log('Document written with ID: ', docRef.id);

            // Update the user's document to set datingProfileSetup to true
            const userDocRef = doc(db, 'users', currentUser.uid);
            await updateDoc(userDocRef, {
                datingProfileSetup: true,
                datingProfile: docRef, // Store a reference to the dating profile document
            });

            console.log('User document updated.');
            window.location.reload();

        } catch (error) {
            console.error('Error adding document: ', error);
            alert('An error occurred while submitting the form.');
        }
    };


    return (
        <div className='not-setup-container'>
            {!showForm && (
                <div className='pre-form'>
                    <h1 className='ready'>Ready to Start Lynking?</h1>
                    <p className='click-below'>Click below to create a Lynking profile!</p>
                    <button className='join-btn' onClick={toggleForm}>
                        Join Now
                    </button>
                </div>
            )}

            {showForm && (
                <form className='profile-setup-form' onSubmit={handleSubmit}>
                    <h2 className='form-header'>Complete Your Profile</h2>
                    <input
                        type='file'
                        name='profileImages'
                        accept='image/*'
                        multiple
                        onChange={handleFileInputChange}
                        className='form-input'
                        required // Added 'required' attribute
                    />

                    <textarea
                        name='bio'
                        placeholder='Bio'
                        value={formData.bio}
                        onChange={handleInputChange}

                        className='form-input'
                        required
                        rows='5' // Initial number of rows
                    />

                    <input
                        type='text'
                        name='hobbies'
                        placeholder='Hobbies'
                        value={formData.hobbies}
                        onChange={handleInputChange}
                        className='form-input'
                    />
                    <select // Dropdown for Race
                        name='race'
                        value={formData.race}
                        onChange={handleInputChange}
                        className='form-input form-select'
                        required // Added 'required' attribute
                    >
                        <option value='' disabled>
                            Select Race
                        </option>
                        <option value='Caucasian'>Caucasian</option>
                        <option value='African American'>African American</option>
                        <option value='Asian'>Asian</option>
                        <option value='Hispanic'>Hispanic</option>
                        <option value='Other'>Other</option>
                    </select>
                    <select // Dropdown for Gender
                        name='gender'
                        value={formData.gender}
                        onChange={handleInputChange}
                        className='form-input form-select'
                        required // Added 'required' attribute
                    >
                        <option value='' disabled>
                            Select Gender
                        </option>
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
                        <option value='Other'>Other</option>
                    </select>
                    <input
                        type='number'
                        name='age'
                        placeholder='Age'
                        value={formData.age}
                        onChange={handleInputChange}
                        className='form-input'
                        required // Added 'required' attribute
                    />
                    <button type='submit' className='submit-btn'>
                        Submit
                    </button>
                </form>
            )}
        </div>
    );
};

export default AccountNotSetUp;
