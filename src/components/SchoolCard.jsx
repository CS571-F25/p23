import React from 'react';
import { Card, Badge, Row, Col } from 'react-bootstrap';

const SchoolCard = ({ school }) => {
  const {
    'school.name': schoolName,
    'school.city': city,
    'school.state': state,
    'latest.student.size': studentSize,
    'latest.admissions.admission_rate.overall': admissionRate,
    'latest.cost.tuition.in_state': inStateTuition,
    'latest.cost.tuition.out_of_state': outOfStateTuition,
    'school.school_url': schoolUrl
  } = school;

  const formatNumber = (num) => {
    if (num === null || num === undefined) return 'N/A';
    return new Intl.NumberFormat().format(num);
  };

  const formatPercentage = (rate) => {
    if (rate === null || rate === undefined) return 'N/A';
    return `${Math.round(rate * 100)}%`;
  };

  const formatCurrency = (amount) => {
    if (amount === null || amount === undefined) return 'N/A';
    return `$${new Intl.NumberFormat().format(amount)}`;
  };

  return (
    <Card className="h-100 shadow-sm border-0 mb-4">
      <Card.Body className="p-4">
        <Card.Title className="text-danger h4 mb-3">
          {schoolName || 'Unknown School'}
        </Card.Title>
        
        <div className="mb-3">
          <Badge bg="secondary" className="me-2">
            {city && state ? `${city}, ${state}` : 'Location N/A'}
          </Badge>
        </div>

        <Row className="g-3">
          <Col sm={6}>
            <div className="text-muted small">Student Size</div>
            <div className="fw-semibold">{formatNumber(studentSize)}</div>
          </Col>
          <Col sm={6}>
            <div className="text-muted small">Admission Rate</div>
            <div className="fw-semibold">{formatPercentage(admissionRate)}</div>
          </Col>
          <Col sm={6}>
            <div className="text-muted small">In-State Tuition</div>
            <div className="fw-semibold">{formatCurrency(inStateTuition)}</div>
          </Col>
          <Col sm={6}>
            <div className="text-muted small">Out-of-State Tuition</div>
            <div className="fw-semibold">{formatCurrency(outOfStateTuition)}</div>
          </Col>
        </Row>

        {schoolUrl && (
          <div className="mt-3">
            <a 
              href={schoolUrl.startsWith('http') ? schoolUrl : `https://${schoolUrl}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-outline-danger btn-sm"
            >
              Visit Website
            </a>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default SchoolCard;