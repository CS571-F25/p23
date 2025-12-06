import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert, Spinner, Pagination, Button, Modal } from 'react-bootstrap';
import SchoolCard from './SchoolCard';
import ProgramGuide from './ProgramGuide';
import FilterBar from './SearchBar';
import API_CONFIG from '../config/api';

const ProgramInfo = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage] = useState(20);
  const [showHelp, setShowHelp] = useState(false);

  const fetchSchools = async (page = 0) => {
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
      params.push(`per_page=${perPage}`);
      params.push(`page=${page}`);
      if (sortBy) {
        params.push(`sort=${sortBy}`);
      }
      
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
      setTotalResults(data.metadata?.total || 0);
      setCurrentPage(page);
    } catch (err) {
      setError(`Failed to fetch school data: ${err.message}`);
      setSchools([]);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSelectedState('');
    setSortBy('');
    setCurrentPage(0);
    setError(null);
  };

  // Real-time filtering - fetch when filters change
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setCurrentPage(0);
      fetchSchools(0);
    }, 500); // 500ms debounce for name search

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, selectedState, sortBy]);

  // Fetch when page changes
  useEffect(() => {
    if (currentPage > 0) {
      fetchSchools(currentPage);
    }
  }, [currentPage]);

  // Load all schools on component mount
  useEffect(() => {
    fetchSchools(0);
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

      {/* Filter Section */}
      <Container fluid className="py-4 bg-light">
        <Row className="justify-content-center">
          <Col lg={10} xl={8}>
            <FilterBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedState={selectedState}
              setSelectedState={setSelectedState}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onClear={clearSearch}
              onHelp={() => setShowHelp(true)}
            />
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

            {loading && (
              <div className="text-center py-5">
                <Spinner animation="border" variant="danger" size="lg" />
                <p className="mt-3 text-muted">Loading schools...</p>
              </div>
            )}

            {!loading && schools.length === 0 && (
              <div className="text-center py-5">
                <h4 className="text-muted">No schools found</h4>
                <p className="text-muted">Try adjusting your filters</p>
              </div>
            )}

            {!loading && schools.length > 0 && (
              <>
                <div className="mb-4 text-center">
                  <p className="h4">
                    Showing {currentPage * perPage + 1}-{Math.min((currentPage + 1) * perPage, totalResults)} of {totalResults.toLocaleString()} school{totalResults !== 1 ? 's' : ''}
                  </p>
                </div>
                <Row className="g-4">
                  {schools.map((school) => (
                    <Col key={school.id} lg={6} xl={4}>
                      <SchoolCard school={school} />
                    </Col>
                  ))}
                </Row>
                
                {/* Pagination Controls */}
                {totalResults > perPage && (
                  <div className="d-flex justify-content-center mt-5">
                    <Pagination>
                      <Pagination.First 
                        onClick={() => setCurrentPage(0)} 
                        disabled={currentPage === 0}
                      />
                      <Pagination.Prev 
                        onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))} 
                        disabled={currentPage === 0}
                      />
                      
                      {[...Array(Math.min(5, Math.ceil(totalResults / perPage)))].map((_, idx) => {
                        const totalPages = Math.ceil(totalResults / perPage);
                        let pageNum;
                        
                        if (totalPages <= 5) {
                          pageNum = idx;
                        } else if (currentPage < 3) {
                          pageNum = idx;
                        } else if (currentPage > totalPages - 4) {
                          pageNum = totalPages - 5 + idx;
                        } else {
                          pageNum = currentPage - 2 + idx;
                        }
                        
                        return (
                          <Pagination.Item
                            key={pageNum}
                            active={pageNum === currentPage}
                            onClick={() => setCurrentPage(pageNum)}
                          >
                            {pageNum + 1}
                          </Pagination.Item>
                        );
                      })}
                      
                      <Pagination.Next 
                        onClick={() => setCurrentPage(prev => Math.min(Math.ceil(totalResults / perPage) - 1, prev + 1))} 
                        disabled={currentPage >= Math.ceil(totalResults / perPage) - 1}
                      />
                      <Pagination.Last 
                        onClick={() => setCurrentPage(Math.ceil(totalResults / perPage) - 1)} 
                        disabled={currentPage >= Math.ceil(totalResults / perPage) - 1}
                      />
                    </Pagination>
                  </div>
                )}
              </>
            )}
          </Col>
        </Row>
      </Container>

      {/* Help Modal */}
      <Modal show={showHelp} onHide={() => setShowHelp(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>How to Use Program Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProgramGuide />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setShowHelp(false)}>
            Got it!
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProgramInfo;