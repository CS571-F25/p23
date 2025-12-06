import React, { useState } from 'react';
import { Form, Button, Modal, Alert } from 'react-bootstrap';

const CreateResource = ({ show, onHide, onSubmit }) => {
  const categories = [
    'Application Tips',
    'SOP Advice',
    'Interview Prep',
    'Funding & Scholarships',
    'Test Prep',
    'Documents'
  ];

  const types = ['Guide', 'Template', 'Checklist', 'Tips', 'Video', 'Article', 'Tool'];

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [type, setType] = useState(types[0]);
  const [tags, setTags] = useState('');
  const [links, setLinks] = useState([{ title: '', url: '' }]);
  const [error, setError] = useState('');

  const handleAddLink = () => {
    setLinks([...links, { title: '', url: '' }]);
  };

  const handleRemoveLink = (index) => {
    setLinks(links.filter((_, idx) => idx !== index));
  };

  const handleLinkChange = (index, field, value) => {
    const newLinks = [...links];
    newLinks[index][field] = value;
    setLinks(newLinks);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const currentUser = sessionStorage.getItem('currentUser');
    if (!currentUser) {
      setError('Please login to create a resource');
      return;
    }

    if (!title.trim() || !description.trim()) {
      setError('Please fill in title and description');
      return;
    }

    const user = JSON.parse(currentUser);
    const validLinks = links.filter(link => link.title.trim() && link.url.trim());

    const resource = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      content: content.trim(),
      category,
      type,
      tags: tags.split(',').map(t => t.trim()).filter(t => t),
      links: validLinks,
      author: user.name,
      authorEmail: user.email,
      createdAt: new Date().toISOString(),
      comments: []
    };

    onSubmit(resource);

    // Reset form
    setTitle('');
    setDescription('');
    setContent('');
    setTags('');
    setLinks([{ title: '', url: '' }]);
    onHide();
  };

  const handleClose = () => {
    setError('');
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Create New Resource</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && (
          <Alert variant="danger" dismissible onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Category *</Form.Label>
            <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Type *</Form.Label>
            <Form.Select value={type} onChange={(e) => setType(e.target.value)}>
              {types.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Title *</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g., Complete SOP Writing Guide"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Short Description *</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Brief description that appears on the card..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Detailed Content (optional)</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              placeholder="Full content, tips, step-by-step guide, etc..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tags <small className="text-muted">(comma-separated)</small></Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g., GRE, essay, deadline"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </Form.Group>

          <div className="mb-3">
            <Form.Label>Useful Links (optional)</Form.Label>
            {links.map((link, index) => (
              <div key={index} className="d-flex gap-2 mb-2">
                <Form.Control
                  type="text"
                  placeholder="Link title"
                  value={link.title}
                  onChange={(e) => handleLinkChange(index, 'title', e.target.value)}
                  style={{ flex: 1 }}
                />
                <Form.Control
                  type="url"
                  placeholder="https://..."
                  value={link.url}
                  onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                  style={{ flex: 2 }}
                />
                {links.length > 1 && (
                  <Button 
                    variant="outline-danger" 
                    size="sm"
                    onClick={() => handleRemoveLink(index)}
                  >
                    ✕
                  </Button>
                )}
              </div>
            ))}
            <Button variant="outline-secondary" size="sm" onClick={handleAddLink}>
              + Add Link
            </Button>
          </div>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleSubmit}>
          Create Resource
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateResource;
