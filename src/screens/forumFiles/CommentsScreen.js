import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  query,
  onSnapshot,
  orderBy,
  getDoc,
  serverTimestamp,
  increment,
} from "firebase/firestore";
import { db, auth } from "../../firebase";
import "./CommentsScreen.css";

function Comment({ commentData, allComments, depth, addReply, voteComment }) {
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const userID = auth.currentUser ? auth.currentUser.uid : null;
    setCurrentUserId(userID);
  }, []);

  const currentUserVote =
    commentData.userVotes && commentData.userVotes[currentUserId];

  const replies = allComments.filter((c) => c.parentId === commentData.id);

  return (
    <div className={`comment comment-depth-${depth}`}>
      <div>
        {commentData.text}
        <button
          className="vote-button upvote"
          onClick={() => voteComment(commentData.id, 1)}
          disabled={currentUserVote === 1}
        >
          ↑
        </button>

        <span className="vote-count">
          {commentData.userVotes
            ? Object.values(commentData.userVotes).reduce(
                (acc, vote) => acc + vote,
                0
              )
            : 0}
        </span>

        <button
          className="vote-button downvote"
          onClick={() => voteComment(commentData.id, -1)}
          disabled={currentUserVote === -1}
        >
          ↓
        </button>
        <button
          className="reply-button"
          onClick={() => addReply(commentData.id)}
        >
          Reply
        </button>
      </div>
      {replies.map((reply) => (
        <Comment
          commentData={reply}
          allComments={allComments}
          depth={depth + 1}
          addReply={addReply}
          voteComment={voteComment}
          key={reply.id}
        />
      ))}
    </div>
  );
}

function CommentsScreen({ postId }) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [replyToId, setReplyToId] = useState(null);

  const fetchComments = () => {
    const commentsCollection = collection(db, "forumPosts", postId, "comments");
    const q = query(commentsCollection, orderBy("createdAt"));

    onSnapshot(q, (snapshot) => {
      let commentsData = [];
      snapshot.forEach((doc) => {
        commentsData.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setComments(commentsData);
    });
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const addComment = async (text, parentId = null) => {
    try {
      const userID = auth.currentUser ? auth.currentUser.uid : null;
      if (!userID) {
        console.error("User is not logged in.");
        return;
      }
      await addDoc(collection(db, "forumPosts", postId, "comments"), {
        userId: userID,
        text: text,
        parentId: parentId,
        userVotes: {}, // Initialize votes as an empty object
        votes: 0,
        createdAt: serverTimestamp(),
      });
      setReplyToId(null);
    } catch (e) {
      console.error("Error adding comment: ", e);
    }
  };

  const voteComment = async (commentId, change) => {
    try {
      const userID = auth.currentUser ? auth.currentUser.uid : null;
      if (!userID) {
        console.error("User is not logged in.");
        return;
      }
      const commentRef = doc(db, "forumPosts", postId, "comments", commentId);
      const commentSnap = await getDoc(commentRef);
      const commentData = commentSnap.data();

      // If the user has already voted in this direction, do nothing.
      if (commentData.userVotes && commentData.userVotes[userID] === change) {
        console.log("You've already voted in this direction.");
        return;
      }

      let userVoteUpdate = {};
      let voteIncrement = change;

      // If user previously voted in the opposite direction, we should double the vote change to counteract their previous vote.
      if (commentData.userVotes && commentData.userVotes[userID] === -change) {
        voteIncrement = 2 * change;
      }

      // Update user's vote direction.
      userVoteUpdate[`userVotes.${userID}`] = change;

      // Update the comment's votes in the database.
      await updateDoc(commentRef, {
        ...userVoteUpdate,
        votes: increment(voteIncrement), // using the increment function from Firestore to ensure atomic operations
      });
    } catch (e) {
      console.error("Error updating comment vote: ", e);
    }
  };

  const handleCommentSend = () => {
    if (commentText.trim() !== "") {
      addComment(commentText, replyToId);
      setCommentText("");
    }
  };

  const handleReply = (parentId) => {
    setReplyToId(parentId);
  };

  return (
    <div className="comments-section">
      <div className="comments-list">
        {comments
          .filter((comment) => !comment.parentId)
          .map((comment) => (
            <div key={comment.id}>
              <Comment
                commentData={comment}
                allComments={comments}
                depth={0}
                addReply={handleReply}
                voteComment={voteComment}
              />
            </div>
          ))}
      </div>
      <div className="comment-input">
        {replyToId && (
          <div className="replying-indicator">Replying to a comment...</div>
        )}
        <input
          type="text"
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button className="send-button" onClick={handleCommentSend}>
          Send
        </button>
        {replyToId && (
          <button
            className="cancel-reply-button"
            onClick={() => setReplyToId(null)}
          >
            Cancel Reply
          </button>
        )}
      </div>
    </div>
  );
}

export default CommentsScreen;
