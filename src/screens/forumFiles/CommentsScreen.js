import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebase";
import { getAnonymousUserID } from "../../firebaseFunctions";
import "./CommentsScreen.css";
import { serverTimestamp } from "firebase/firestore";
import { FieldValue } from "firebase/firestore";

function Comment({ commentData, allComments, depth, addReply, voteComment }) {
  const replies = allComments.filter((c) => c.parentId === commentData.id);

  return (
    <div className={`comment comment-depth-${depth}`}>
      <div>
        {commentData.text}
        <button
          className="vote-button upvote"
          onClick={() => voteComment(commentData.id, 1)}
        >
          ↑
        </button>
        <span className="vote-count">{commentData.votes || 0}</span>
        <button
          className="vote-button downvote"
          onClick={() => voteComment(commentData.id, -1)}
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
      const userID = await getAnonymousUserID();
      await addDoc(collection(db, "forumPosts", postId, "comments"), {
        userId: userID,
        text: text,
        parentId: parentId,
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
      const commentRef = doc(db, "forumPosts", postId, "comments", commentId);
      console.log("Comment ID:", commentId, "Change:", change);

      await updateDoc(commentRef, {
        votes: FieldValue.increment(change),
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
