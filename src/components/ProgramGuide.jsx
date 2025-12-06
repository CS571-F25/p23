import React from 'react';
import { Row, Col } from 'react-bootstrap';

const ProgramGuide = () => {
  return (
    <div className="text-center mb-4 py-5">
      <div className="mb-4">
        <h2 className="text-danger mb-3">Welcome to Program Information</h2>
        <p className="lead text-muted mb-4">
          Search and explore thousands of universities across the United States
        </p>
      </div>
      
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="bg-light p-4 rounded">
            <h4 className="mb-3">How to Use This Page</h4>
            <ul className="list-unstyled text-start">
              <li className="mb-2">
                <strong>🔍 Search by Name:</strong> Enter a university name (e.g., "Harvard", "Stanford")
              </li>
              <li className="mb-2">
                <strong>📍 Filter by State:</strong> Select a state to view all universities in that region
              </li>
              <li className="mb-2">
                <strong>🔢 Sort Results:</strong> Order schools by size, tuition, admission rate, or name
              </li>
              <li className="mb-2">
                <strong>💡 Combine Filters:</strong> Use multiple filters together for more specific results
              </li>
              <li className="mb-2">
                <strong>📊 View Details:</strong> Each card shows enrollment, admission rates, and tuition costs
              </li>
            </ul>
            <div className="mt-4 p-3 bg-white rounded">
              <p className="mb-2 text-muted small">
                <strong>Data Source:</strong> U.S. Department of Education College Scorecard
              </p>
              <p className="mb-0 text-muted small">
                <strong>Coverage:</strong> 7,000+ accredited institutions nationwide
              </p>
            </div>
          </div>
        </Col>
      </Row>
      
      <div className="mt-4">
        <p className="text-muted">Start your search above to explore universities!</p>
      </div>
    </div>
  );
};

export default ProgramGuide;
