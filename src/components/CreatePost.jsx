import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';

const CreatePost = ({ onSubmit, categories }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(categories[0] || '');
  const [tags, setTags] = useState('');
  const [error, setError] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Check if user is logged in
    const currentUser = sessionStorage.getItem('currentUser');
    if (!currentUser) {
      setError('Please login to create a post');
      return;
    }

    if (!title.trim() || !content.trim()) {
      setError('Please fill in both title and content');
      return;
    }

    const user = JSON.parse(currentUser);
    const post = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      category,
      tags: tags.split(',').map(t => t.trim()).filter(t => t),
      author: user.name,
      authorEmail: user.email,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: []
    };

    onSubmit(post);

    // Reset form
    setTitle('');
    setContent('');
    setTags('');
    setIsExpanded(false);
  };

  if (!isExpanded) {
    return (
      <Card className="mb-4 shadow-sm border-0">
        <Card.Body>
          <Button
            variant="outline-danger"
            className="w-100"
            onClick={() => setIsExpanded(true)}
          >
            ✍️ Create New Post
          </Button>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="mb-4 shadow-sm border-0">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Create New Post</h5>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => setIsExpanded(false)}
          >
            ✕
          </Button>
        </div>

        {error && (
          <Alert variant="danger" dismissible onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter post title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Share your thoughts, questions, or advice..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tags <small className="text-muted">(comma-separated)</small></Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g., GRE, funding, deadline"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </Form.Group>

          <div className="d-flex gap-2">
            <Button variant="danger" type="submit">
              Post
            </Button>
            <Button variant="outline-secondary" onClick={() => setIsExpanded(false)}>
              Cancel
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default CreatePost;
