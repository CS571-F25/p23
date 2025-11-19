import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Spinner, Alert } from 'react-bootstrap';
import SchoolCard from './SchoolCard';
import API_CONFIG from '../config/api';

const ProgramInfo = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const states = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  const fetchSchools = async () => {
    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      let url = `${API_CONFIG.BASE_URL}?api_key=${API_CONFIG.API_KEY}`;
      
      // Add search parameters
      const params = [];
      
      if (searchQuery.trim()) {
        params.push(`school.name=${encodeURIComponent(searchQuery.trim())}`);
      }
      
      if (selectedState) {
        params.push(`school.state=${selectedState}`);
      }
      
      // Add fields to retrieve
      const fields = [
        'id',
        'school.name',
        'school.city',
        'school.state',
        'school.school_url',
        'latest.student.size',
        'latest.admissions.admission_rate.overall',
        'latest.cost.tuition.in_state',
        'latest.cost.tuition.out_of_state'
      ];
      
      params.push(`fields=${fields.join(',')}`);
      params.push('per_page=20');
      params.push('sort=latest.student.size:desc');
      
      if (params.length > 0) {
        url += '&' + params.join('&');
      }

      const response = await fetch(url);
      
      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('API key may be invalid or expired');
        } else if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please try again later');
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }
      
      const data = await response.json();
      setSchools(data.results || []);
    } catch (err) {
      setError(`Failed to fetch school data: ${err.message}`);
      setSchools([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() || selectedState) {
      fetchSchools();
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSelectedState('');
    setSchools([]);
    setError(null);
    setHasSearched(false);
  };

  // Load popular Wisconsin schools on component mount
  useEffect(() => {
    const loadWisconsinSchools = async () => {
      setLoading(true);
      try {
        const url = `${API_CONFIG.BASE_URL}?api_key=${API_CONFIG.API_KEY}&school.state=WI&fields=id,school.name,school.city,school.state,school.school_url,latest.student.size,latest.admissions.admission_rate.overall,latest.cost.tuition.in_state,latest.cost.tuition.out_of_state&per_page=10&sort=latest.student.size:desc`;
        
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setSchools(data.results || []);
        }
      } catch (err) {
        console.error('Failed to load initial schools:', err);
      } finally {
        setLoading(false);
      }
    };

    loadWisconsinSchools();
  }, []);

  return (
    <div className="w-100 min-vh-100">
      {/* Header Section */}
      <div className="bg-danger text-white py-5 w-100">
        <Container fluid className="px-4">
          <Row className="justify-content-center">
            <Col lg={10} xl={8} className="text-center">
              <h1 className="display-4 fw-bold mb-3">Program Information</h1>
              <p className="display-6 mb-0">Explore Universities and Their Programs</p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Search Section */}
      <Container fluid className="py-4 bg-light">
        <Row className="justify-content-center">
          <Col lg={8} xl={6}>
            <Form onSubmit={handleSearch}>
              <Row className="g-3">
                <Col md={5}>
                  <Form.Control
                    type="text"
                    placeholder="Search by school name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </Col>
                <Col md={3}>
                  <Form.Select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                  >
                    <option value="">All States</option>
                    {states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </Form.Select>
                </Col>
                <Col md={2}>
                  <Button 
                    type="submit" 
                    variant="danger" 
                    className="w-100"
                    disabled={loading}
                  >
                    {loading ? <Spinner size="sm" /> : 'Search'}
                  </Button>
                </Col>
                <Col md={2}>
                  <Button 
                    type="button" 
                    variant="outline-secondary" 
                    className="w-100"
                    onClick={clearSearch}
                  >
                    Clear
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>

      {/* Results Section */}
      <Container fluid className="py-5 px-4">
        <Row className="justify-content-center">
          <Col lg={10} xl={10}>
            {error && (
              <Alert variant="danger" className="mb-4">
                {error}
              </Alert>
            )}

            {!hasSearched && !loading && (
              <div className="text-center mb-4">
                <h3 className="text-muted">Popular Wisconsin Universities</h3>
                <p className="text-muted">Use the search above to find schools by name or state</p>
              </div>
            )}

            {loading && (
              <div className="text-center py-5">
                <Spinner animation="border" variant="danger" size="lg" />
                <p className="mt-3 text-muted">Loading schools...</p>
              </div>
            )}

            {!loading && schools.length === 0 && hasSearched && (
              <div className="text-center py-5">
                <h4 className="text-muted">No schools found</h4>
                <p className="text-muted">Try adjusting your search criteria</p>
              </div>
            )}

            {!loading && schools.length > 0 && (
              <>
                <div className="mb-4">
                  <h4 className="text-center">Found {schools.length} school{schools.length !== 1 ? 's' : ''}</h4>
                </div>
                <Row className="g-4">
                  {schools.map((school) => (
                    <Col key={school.id} lg={6} xl={4}>
                      <SchoolCard school={school} />
                    </Col>
                  ))}
                </Row>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProgramInfo;