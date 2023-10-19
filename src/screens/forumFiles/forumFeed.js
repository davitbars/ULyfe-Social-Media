import React, { useEffect, useState } from "react";
import "./forumFeed.css";
import { db } from "../../firebase";
import CommentsScreen from "./CommentsScreen";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  doc,
  updateDoc,
  where,
  getDoc,
} from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faCommentAlt,
  faShareSquare,
} from "@fortawesome/free-solid-svg-icons";
import { increment } from "firebase/firestore";
import { auth } from "../../firebase";

function ForumFeed({ selectedTag }) {
  const [forumPosts, setForumPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      const forumPostsCollection = collection(db, "forumPosts");

      let q;
      if (selectedTag) {
        q = query(
          forumPostsCollection,
          where("tags", "==", selectedTag),
          orderBy("createdAt", "desc")
        );
      } else {
        q = query(forumPostsCollection, orderBy("createdAt", "desc"));
      }

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const postsData = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          postsData.push({
            id: doc.id,
            title: data.forumTitle,
            content: data.description,
            images: data.images,
            votes: data.votes,
          });
        });
        setForumPosts(postsData);
      });

      return () => unsubscribe();
    };

    fetchData();
  }, [selectedTag]);

  // Removed the extra filteredPosts logic

  console.log("Posts:", forumPosts);

  const vote = async (postId, change) => {
    const postRef = doc(db, "forumPosts", postId);
    const postSnapshot = await getDoc(postRef);
    const post = postSnapshot.data();

    if (post.votes && post.votes[auth.currentUser.uid]) {
      console.log("You've already voted on this post.");
      return;
    }

    await updateDoc(postRef, {
      votesCount: increment(change),
      [`votes.${auth.currentUser.uid}`]: change,
    });
  };

  const toggleCommentSection = (postId) => {
    if (selectedPostId === postId) {
      setSelectedPostId(null);
    } else {
      setSelectedPostId(postId);
    }
  };

  const share = (postId, title) => {
    // Your share functionality here
  };

  return (
    <div className="forum-feed">
      {forumPosts.length === 0 ? (
        <div className="no-posts-message">
          No posts made to {selectedTag} yet.
        </div>
      ) : (
        forumPosts.map((post) => (
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
            <div className="post-actions">
              <button
                className={`action-button ${
                  post.votes && post.votes[auth.currentUser.uid] === 1
                    ? "upvoted"
                    : ""
                }`}
                onClick={() => vote(post.id, 1)}
              >
                <FontAwesomeIcon icon={faThumbsUp} />
              </button>

              <span>
                {post.votes
                  ? Object.values(post.votes).reduce(
                      (acc, vote) => acc + vote,
                      0
                    )
                  : 0}
              </span>

              <button
                className={`action-button ${
                  post.votes && post.votes[auth.currentUser.uid] === -1
                    ? "downvoted"
                    : ""
                }`}
                onClick={() => vote(post.id, -1)}
              >
                <FontAwesomeIcon icon={faThumbsDown} />
              </button>

              <button
                className={`action-button ${
                  post.votes && post.votes[auth.currentUser.uid] === -1
                    ? "downvoted"
                    : ""
                }`}
                onClick={() => toggleCommentSection(post.id)}
              >
                <FontAwesomeIcon icon={faCommentAlt} color="#0557fa" />
              </button>
            </div>
            {selectedPostId === post.id && (
              <CommentsScreen postId={selectedPostId} />
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default ForumFeed;
