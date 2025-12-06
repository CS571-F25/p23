import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';

const ResourceCard = ({ resource, onClick }) => {
  const getCategoryColor = () => {
    const colors = {
      'Application Tips': 'dark',
      'SOP Advice': 'dark',
      'Interview Prep': 'dark',
      'Funding & Scholarships': 'dark',
      'Test Prep': 'dark',
      'Documents': 'dark'
    };
    return colors[resource.category] || 'dark';
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

  return (
    <Card 
      className="h-100 shadow-sm border-0 resource-card" 
      style={{ cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.12)';
      }}
    >
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Badge bg={getCategoryColor()}>
            {resource.category}
          </Badge>
          <span style={{ fontSize: '1.5rem' }}>{getTypeIcon()}</span>
        </div>

        <Card.Title className="h5 mb-2">{resource.title}</Card.Title>
        <Card.Text className="text-muted flex-grow-1" style={{ fontSize: '0.9rem' }}>
          {resource.description}
        </Card.Text>

        {resource.tags && resource.tags.length > 0 && (
          <div className="mb-2">
            {resource.tags.slice(0, 3).map((tag, idx) => (
              <Badge key={idx} bg="secondary" className="me-1" style={{ fontSize: '0.7rem' }}>
                #{tag}
              </Badge>
            ))}
            {resource.tags.length > 3 && (
              <Badge bg="secondary" style={{ fontSize: '0.7rem' }}>
                +{resource.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        <div className="d-flex justify-content-between align-items-center mt-2">
          <small className="text-muted">
            By {resource.author}
          </small>
          <Button variant="outline-danger" size="sm">
            View Details →
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ResourceCard;
