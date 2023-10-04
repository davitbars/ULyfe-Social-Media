import React, { useState } from "react";
import SideMenu from "./sideMenu";
import "./forum.css";
import SecondaryHeader from "./SecondaryHeader";
import ForumFeed from "./forumFeed";
import RightSideSection from "./rightSideSection";
import CreatePost from "./CreatePost";

function Forum() {
  const [showCreatePost, setShowCreatePost] = useState(false);

  const handleCreatePostClick = () => {
    setShowCreatePost(true);
  };

  return (
    <div className="forum">
      {/* Secondary Header */}
      <SecondaryHeader onCreatePostClick={handleCreatePostClick} />

      {/* Main Content */}
      <div className="forum-main-content">
        <div className="side-menu">
          <SideMenu />
        </div>
        <div className="forum-content">
          {showCreatePost ? (
            <CreatePost onCancel={() => setShowCreatePost(false)} />
          ) : (
            <ForumFeed />
          )}
        </div>

        {/* Right Side Section */}
        <div className="right-side-section">
          <RightSideSection />
        </div>
      </div>
      {/* Render the "Create Post" button */}
      {!showCreatePost && (
        <button onClick={handleCreatePostClick}>Create Post</button>
      )}
    </div>
  );
}

export default Forum;
