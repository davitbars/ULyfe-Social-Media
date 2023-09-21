import React from "react";
import SideMenu from "./sideMenu";
import "./forum.css";
import SecondaryHeader from "./SecondaryHeader";

function Forum() {
  // Forum component code

  return (
    <div className="forum">
      <SecondaryHeader />
      <div className="side-menu">
        <SideMenu />
      </div>
      <div className="forum-content"></div>
    </div>
  );
}

export default Forum;
