import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

const FilterBar = ({ 
  searchQuery, 
  setSearchQuery, 
  selectedState, 
  setSelectedState,
  sortBy,
  setSortBy,
  onClear,
  onHelp
}) => {
  const states = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  const sortOptions = [
    { value: '', label: '- (No Sorting)' },
    { value: 'latest.student.size:desc', label: 'Student Size (High to Low)' },
    { value: 'latest.student.size:asc', label: 'Student Size (Low to High)' },
    { value: 'latest.cost.tuition.in_state:desc', label: 'In-State Tuition (High to Low)' },
    { value: 'latest.cost.tuition.in_state:asc', label: 'In-State Tuition (Low to High)' },
    { value: 'latest.cost.tuition.out_of_state:desc', label: 'Out-of-State Tuition (High to Low)' },
    { value: 'latest.cost.tuition.out_of_state:asc', label: 'Out-of-State Tuition (Low to High)' },
    { value: 'latest.admissions.admission_rate.overall:asc', label: 'Admission Rate (Most Selective)' },
    { value: 'latest.admissions.admission_rate.overall:desc', label: 'Admission Rate (Least Selective)' },
    { value: 'school.name:asc', label: 'School Name (A-Z)' },
    { value: 'school.name:desc', label: 'School Name (Z-A)' }
  ];

  return (
    <div>
      <Row className="g-3 mb-3">
        <Col md={4}>
          <Form.Label htmlFor="schoolNameInput" className="small text-muted mb-1">School Name</Form.Label>
          <Form.Control
            id="schoolNameInput"
            type="text"
            placeholder="Filter by school name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Col>
        <Col md={3}>
          <Form.Label htmlFor="stateSelect" className="small text-muted mb-1">State</Form.Label>
          <Form.Select
            id="stateSelect"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
          >
            <option value="">All States</option>
            {states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </Form.Select>
        </Col>
        <Col md={5}>
          <Form.Label htmlFor="sortBySelect" className="small text-muted mb-1">Sort By</Form.Label>
          <Form.Select
            id="sortBySelect"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>
      <Row className="g-3">
        <Col>
          <Button 
            type="button" 
            variant="danger"
            onClick={onClear}
            className="me-2"
            aria-label="Reset all filters"
          >
            🔄 Reset Filters
          </Button>
          <Button 
            type="button" 
            variant="secondary"
            onClick={onHelp}
            aria-label="Get help using the program search"
          >
            Need Help?
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default FilterBar;
