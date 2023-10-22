import React from "react";
import "./SecondaryHeader.css";
import ForumLogo from "../../images/ForumLogo2.png";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

function SecondaryHeader({ onCreatePostClick, onMyPostsClick }) {
  return (
    <div className="secondary-header">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <img src={ForumLogo} alt="Forum Logo" className="Forumlogo" />
      <div className="search-bar">
        <input type="text" placeholder="Search Forums"></input>
      </div>
      <Link to='#' className="my-posts-button" onClick={onMyPostsClick}>
        My Posts
      </Link>
      <Link to="#" className="create-post-button" onClick={onCreatePostClick}>
        <FaPlus />
      </Link>{" "}
    </div>
  );
}

export default SecondaryHeader;
