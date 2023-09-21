import React from "react";
import "./SecondaryHeader.css";
import UniMatchLogo from "../../images/ForumLogo2.png";

function SecondaryHeader() {
  return (
    <div className="secondary-header">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <img src={UniMatchLogo} alt="UniMatch Logo" className="logo" />
      <div className="search-bar">
        <input type="text" placeholder="Search Forums"></input>
      </div>
      <button className="my-chats-button">My Chats</button>
    </div>
  );
}

export default SecondaryHeader;
