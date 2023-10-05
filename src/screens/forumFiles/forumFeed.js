import React, { useEffect, useState } from 'react';
import './forumFeed.css';
import { db } from '../../firebase';
import { collection, getDocs } from "firebase/firestore";


function ForumFeed() {
  const [forumPosts, setForumPosts] = useState([]);

  // Fetch forum post data from Firestore when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'forumPosts'));
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
      } catch (error) {
        console.error('Error fetching forum posts: ', error);
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
