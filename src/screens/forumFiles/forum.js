import React, { useState, useEffect } from "react";
import SideMenu from "./sideMenu";
import "./forum.css";
import SecondaryHeader from "./SecondaryHeader";
import ForumFeed from "./forumFeed";
import RightSideSection from "./rightSideSection";
import CreatePost from "./CreatePost";
import MyPosts from "./MyPosts";

import { auth } from "../../firebase"; // Import Firebase auth

function Forum() {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showMyPosts, setShowMyPosts] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const [userId, setUserId] = useState(null); // State to store the user's ID

  useEffect(() => {
    // Set up Firebase Authentication listener to get user data
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid); // Store the user's ID
      }
    });
    return () => unsubscribe(); // Unsubscribe from the listener when component unmounts
  }, []);

  const handleCreatePostClick = () => {
    if (showCreatePost) {
      setShowCreatePost(false);
      setShowMyPosts(false);
    } else {
      setShowCreatePost(true);
      setShowMyPosts(false);
    }
  };

  const closePosts = () => {
    setShowCreatePost(false);
    setShowMyPosts(false);
  };

  const handleMyPostsClick = () => {
    if (showMyPosts) {
      setShowCreatePost(false);
      setShowMyPosts(false);
    } else {
      setShowCreatePost(false);
      setShowMyPosts(true);
    }

  };

  return (
    <div className="forum">
      <SecondaryHeader
        onCreatePostClick={handleCreatePostClick}
        onMyPostsClick={handleMyPostsClick}
      />

      <div className="forum-main-content">
        <div className="side-menu">
          <SideMenu setSelectedTag={setSelectedTag} selectedTag={selectedTag} closePosts={closePosts} />
        </div>
        <div className="forum-content">
          {showCreatePost ? (
            <CreatePost onCancel={() => setShowCreatePost(false)} />
          ) : showMyPosts ? (
            <MyPosts userId={userId} /> // Pass the user's ID to MyPosts
          ) : (
            <ForumFeed selectedTag={selectedTag} />
          )}
        </div>
        <div className="right-side-section">
          <RightSideSection />
        </div> 
      </div>
      {!showCreatePost && !showMyPosts && (
        <button onClick={handleCreatePostClick}>Create Post</button>
      )}
    </div>
  );
}

export default Forum;
