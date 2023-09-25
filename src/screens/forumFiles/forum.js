// forum.js

import React from "react";
import SideMenu from "./sideMenu";
import "./forum.css";
import SecondaryHeader from "./SecondaryHeader";
import ForumFeed from "./forumFeed";
import RightSideSection from "./rightSideSection";

function Forum() {
  return (
    <div className="forum">
      {/* Secondary Header */}
      <SecondaryHeader />

      {/* Main Content */}
      <div className="forum-main-content">
        <div className="side-menu">
          <SideMenu />
        </div>
        <div className="forum-content">
          <ForumFeed />
        </div>

        {/* Right Side Section */}
        <div className="right-side-section">
          <RightSideSection />
        </div>
      </div>
    </div>
  );
}

export default Forum;

