import React, { useState } from "react";
import SideMenu from "./sideMenu";
import "./forum.css";
import SecondaryHeader from "./SecondaryHeader";
import ForumFeed from "./forumFeed";
import RightSideSection from "./rightSideSection";
import CreatePost from "./CreatePost";

function Forum() {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null); // You already have this line

  const handleCreatePostClick = () => {
    setShowCreatePost(true);
  };

  return (
    <div className="forum">
      <SecondaryHeader onCreatePostClick={handleCreatePostClick} />

      <div className="forum-main-content">
        <div className="side-menu">
          <SideMenu setSelectedTag={setSelectedTag} selectedTag={selectedTag} />
        </div>
        <div className="forum-content">
          {showCreatePost ? (
            <CreatePost onCancel={() => setShowCreatePost(false)} />
          ) : (
            <ForumFeed selectedTag={selectedTag} />
          )}
        </div>

        {/* Right Side Section
        <div className="right-side-section">
          <RightSideSection />
        </div> */}
      </div>
      {/* Render the "Create Post" button */}
      {!showCreatePost && (
        <button onClick={handleCreatePostClick}>Create Post</button>
      )}
    </div>
  );
}

export default Forum;
