import React, { useState } from 'react';
import { Card, Button, Badge, Row, Col } from 'react-bootstrap';
import CommentSection from './CommentSection';

const PostCard = ({ post, onLike, category }) => {
  const [showComments, setShowComments] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  const getCategoryColor = () => {
    const colors = {
      'Application Tips': 'primary',
      'SOP Advice': 'info',
      'Interview Prep': 'success',
      'General Discussion': 'secondary',
      'Success Stories': 'dark',
      'Questions': 'danger',
      'Networking': 'dark',
      'Resources': 'info'
    };
    return colors[post.category] || 'secondary';
  };

  return (
    <Card className="mb-3 shadow-sm border-0">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div>
            <Badge bg={getCategoryColor()} className="me-2">
              {post.category}
            </Badge>
            <small className="text-muted">
              Posted by <strong>{post.author}</strong> • {formatDate(post.createdAt)}
            </small>
          </div>
        </div>

        <Card.Title className="h5 mb-2">{post.title}</Card.Title>
        <Card.Text className="text-muted">{post.content}</Card.Text>

        {post.tags && post.tags.length > 0 && (
          <div className="mb-3">
            {post.tags.map((tag, idx) => (
              <Badge key={idx} bg="light" text="dark" className="me-1">
                #{tag}
              </Badge>
            ))}
          </div>
        )}

        <Row className="g-2">
          <Col xs="auto">
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => onLike(post.id, category)}
              className="d-flex align-items-center"
            >
              <span className="me-1">👍</span>
              <span>{post.likes || 0}</span>
            </Button>
          </Col>
          <Col xs="auto">
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => setShowComments(!showComments)}
              className="d-flex align-items-center"
            >
              <span className="me-1">💬</span>
              <span>{post.comments?.length || 0}</span>
            </Button>
          </Col>
        </Row>

        {showComments && (
          <div className="mt-3">
            <CommentSection postId={post.id} comments={post.comments || []} category={category} />
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default PostCard;
