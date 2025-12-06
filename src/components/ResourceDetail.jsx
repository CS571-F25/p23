import React, { useState } from 'react';
import { Modal, Badge, Button, Form, ListGroup, Alert } from 'react-bootstrap';

const ResourceDetail = ({ resource, show, onHide }) => {
  const [comment, setComment] = useState('');
  const [localComments, setLocalComments] = useState(resource?.comments || []);
  const [error, setError] = useState('');

  if (!resource) return null;

  const getCategoryColor = () => {
    const colors = {
      'Application Tips': 'primary',
      'SOP Advice': 'info',
      'Interview Prep': 'success',
      'Funding & Scholarships': 'warning',
      'Test Prep': 'danger',
      'Documents': 'secondary'
    };
    return colors[resource.category] || 'secondary';
  };

  const getTypeIcon = () => {
    const icons = {
      'Guide': '📚',
      'Template': '📝',
      'Checklist': '✅',
      'Tips': '💡',
      'Video': '🎥',
      'Article': '📄',
      'Tool': '🔧'
    };
    return icons[resource.type] || '📌';
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    setError('');

    const currentUser = sessionStorage.getItem('currentUser');
    if (!currentUser) {
      setError('Please login to leave a comment');
      return;
    }

    if (!comment.trim()) {
      setError('Comment cannot be empty');
      return;
    }

    const user = JSON.parse(currentUser);
    const newComment = {
      id: Date.now().toString(),
      text: comment.trim(),
      author: user.name,
      createdAt: new Date().toISOString()
    };

    // Update session storage
    const resources = JSON.parse(sessionStorage.getItem('application_resources') || '[]');
    const resourceIndex = resources.findIndex(r => r.id === resource.id);
    
    if (resourceIndex !== -1) {
      resources[resourceIndex].comments = [...(resources[resourceIndex].comments || []), newComment];
      sessionStorage.setItem('application_resources', JSON.stringify(resources));
    }

    setLocalComments([...localComments, newComment]);
    setComment('');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered scrollable>
      <Modal.Header closeButton>
        <div className="d-flex align-items-center gap-2">
          <span style={{ fontSize: '1.8rem' }}>{getTypeIcon()}</span>
          <div>
            <Modal.Title>{resource.title}</Modal.Title>
            <Badge bg={getCategoryColor()} className="mt-1">
              {resource.category}
            </Badge>
          </div>
        </div>
      </Modal.Header>
      
      <Modal.Body>
        {/* Description */}
        <div className="mb-4">
          <h6 className="text-danger">Description</h6>
          <p className="text-muted">{resource.description}</p>
        </div>

        {/* Content */}
        {resource.content && (
          <div className="mb-4">
            <h6 className="text-danger">Content</h6>
            <div className="bg-light p-3 rounded" style={{ whiteSpace: 'pre-wrap' }}>
              {resource.content}
            </div>
          </div>
        )}

        {/* Links */}
        {resource.links && resource.links.length > 0 && (
          <div className="mb-4">
            <h6 className="text-danger">Useful Links</h6>
            <ListGroup variant="flush">
              {resource.links.map((link, idx) => (
                <ListGroup.Item key={idx} className="px-0">
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                    🔗 {link.title}
                  </a>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        )}

        {/* Tags */}
        {resource.tags && resource.tags.length > 0 && (
          <div className="mb-4">
            <h6 className="text-danger">Tags</h6>
            {resource.tags.map((tag, idx) => (
              <Badge key={idx} bg="light" text="dark" className="me-1">
                #{tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Comments */}
        <div className="mb-4">
          <h6 className="text-danger">Comments ({localComments.length})</h6>
          
          {error && (
            <Alert variant="danger" dismissible onClose={() => setError('')}>
              {error}
            </Alert>
          )}

          {localComments.length > 0 && (
            <ListGroup variant="flush" className="mb-3">
              {localComments.map(c => (
                <ListGroup.Item key={c.id} className="px-0">
                  <div className="d-flex justify-content-between mb-1">
                    <strong className="text-danger">{c.author}</strong>
                    <small className="text-muted">{formatDate(c.createdAt)}</small>
                  </div>
                  <p className="mb-0 text-muted">{c.text}</p>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}

          {/* Add Comment Form */}
          <Form onSubmit={handleAddComment}>
            <Form.Group className="mb-2">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Share your thoughts about this resource..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </Form.Group>
            <Button variant="danger" size="sm" type="submit">
              Post Comment
            </Button>
          </Form>
        </div>

        {/* Meta Info */}
        <div className="border-top pt-3 mt-3">
          <small className="text-muted">
            Created by <strong>{resource.author}</strong> on {formatDate(resource.createdAt)}
          </small>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ResourceDetail;
