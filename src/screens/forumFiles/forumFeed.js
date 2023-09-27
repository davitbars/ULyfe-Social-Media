import React from 'react';
import './forumFeed.css';

function ForumFeed() {
  // Sample data for forum posts (replace with actual data later)
  const forumPosts = [
    {
      id: 1,
      title: 'Post Title 1',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      title: 'Post Title 2',
      content: 'Nulla facilisi. Etiam convallis odio in bibendum.',
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      title: 'Post Title 3',
      content: 'Nulla facilisi. Etiam convallis odio in bibendum.',
      imageUrl: 'https://via.placeholder.com/150',
    },
    // Add more posts as needed
  ];

  return (
    <div className="forum-feed">
      {forumPosts.map((post) => (
        <div key={post.id} className="forum-post">
          <h2 className="post-title">{post.title}</h2>
          {post.content && <p className="post-content">{post.content}</p>}
          {post.imageUrl && <img src={post.imageUrl} alt="Post" className="post-image" />}
        </div>
      ))}
    </div>
  );
}

export default ForumFeed;
