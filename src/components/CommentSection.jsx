import React, { useState } from 'react';
import { Form, Button, ListGroup, Alert } from 'react-bootstrap';

const CommentSection = ({ postId, comments, category }) => {
  const [commentText, setCommentText] = useState('');
  const [localComments, setLocalComments] = useState(comments);
  const [error, setError] = useState('');

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    const diffHours = Math.floor(diffMs / 3600000);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Check if user is logged in
    const currentUser = sessionStorage.getItem('currentUser');
    if (!currentUser) {
      setError('Please login to comment');
      return;
    }

    if (!commentText.trim()) {
      setError('Comment cannot be empty');
      return;
    }

    const user = JSON.parse(currentUser);
    const newComment = {
      id: Date.now().toString(),
      text: commentText.trim(),
      author: user.name,
      authorEmail: user.email,
      createdAt: new Date().toISOString()
    };

    // Update session storage only for user-created posts (not mock data)
    if (!postId.startsWith('mock-')) {
      const storageKey = category === 'community' ? 'community_posts' : 'application_resources';
      const posts = JSON.parse(sessionStorage.getItem(storageKey) || '[]');
      const postIndex = posts.findIndex(p => p.id === postId);
      
      if (postIndex !== -1) {
        posts[postIndex].comments = [...(posts[postIndex].comments || []), newComment];
        sessionStorage.setItem(storageKey, JSON.stringify(posts));
      }
    }

    setLocalComments([...localComments, newComment]);
    setCommentText('');
  };

  return (
    <div className="border-top pt-3">
      <h6 className="mb-3">Comments ({localComments.length})</h6>

      {error && (
        <Alert variant="danger" size="sm" dismissible onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {localComments.length > 0 && (
        <ListGroup variant="flush" className="mb-3">
          {localComments.map(comment => (
            <ListGroup.Item key={comment.id} className="px-0">
              <div className="d-flex justify-content-between align-items-start mb-1">
                <strong className="text-danger">{comment.author}</strong>
                <small className="text-muted">{formatDate(comment.createdAt)}</small>
              </div>
              <p className="mb-0 text-muted">{comment.text}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
        </Form.Group>
        <Button variant="danger" size="sm" type="submit">
          Post Comment
        </Button>
      </Form>
    </div>
  );
};

export default CommentSection;
