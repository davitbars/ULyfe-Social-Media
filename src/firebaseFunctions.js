import { db, storage } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Function to add a forum post to the database
export const addForumPost = async (userId, postData) => {
  try {
    const postsCollection = collection(db, "forumPosts");

    // Upload images to Firebase Storage and get their download URLs
    const imageUrls = [];
    for (const imageFile of postData.images) {
      const storageRef = ref(
        storage,
        `forumImages/${userId}/${imageFile.name}`
      );

      // Upload the image file as bytes
      await uploadBytes(storageRef, imageFile);

      // Get the download URL of the uploaded image
      const imageUrl = await getDownloadURL(storageRef);
      imageUrls.push(imageUrl);
    }

    // Create a new post document
    const newPostRef = await addDoc(postsCollection, {
      userId: userId,
      forumTitle: postData.forumTitle,
      description: postData.description,
      images: imageUrls,
      tags: postData.tags,
      createdAt: serverTimestamp(),
    });

    return newPostRef.id;
  } catch (error) {
    throw error;
  }
};
