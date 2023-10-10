import React, { useEffect, useState } from "react";
import "./forumFeed.css";
import { db } from "../../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

function ForumFeed() {
  const [forumPosts, setForumPosts] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      try {
        const forumPostsCollection = collection(db, "forumPosts");
        const q = query(forumPostsCollection, orderBy("createdAt", "asc")); // order by createdAt timestamp in ascending order

        // This will listen for real-time updates
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const postsData = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            postsData.push({
              id: doc.id,
              title: data.forumTitle,
              content: data.description,
              images: data.images,
            });
          });
          setForumPosts(postsData);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching forum posts: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="forum-feed">
      {forumPosts.map((post) => (
        <div key={post.id} className="forum-post">
          <h2 className="post-title">{post.title}</h2>
          {post.content && <p className="post-content">{post.content}</p>}
          <div className="images-container">
            {post.images &&
              post.images.map((imageUrl, index) => (
                <img
                  key={index}
                  src={imageUrl}
                  alt={`Post ${index}`}
                  className="post-image"
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ForumFeed;
