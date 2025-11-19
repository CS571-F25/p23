import React from 'react';
import { Link } from 'react-router';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Home = () => {
  return (
    <div className="w-100">
      {/* Hero Section - Full Width */}
      <div className="bg-danger text-white py-5 w-100">
        <Container fluid className="px-4">
          <Row className="justify-content-center">
            <Col lg={10} xl={8} className="text-center">
              <h1 className="display-3 fw-bold mb-4">GradBadger</h1>
              <p className="display-6 mb-4">A Resource Hub for UW-Madison Graduate School Applicants</p>
              <p className="fs-4 mb-0">
                Your centralized, interactive platform to simplify and support your graduate school application journey.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Features Section - Full Width Container */}
      <Container fluid className="py-5 px-4">
        <Row className="justify-content-center">
          <Col lg={10} xl={8}>
            {/* Section Title */}
            <Row className="mb-5">
              <Col className="text-center">
                <h2 className="display-5 mb-4">What We Offer</h2>
              </Col>
            </Row>
            
            {/* Feature Cards */}
            <Row className="g-4">
              <Col lg={4} md={6} className="mb-4">
                <Card className="h-100 shadow border-0">
                  <Card.Body className="text-center p-4">
                    <Card.Title className="text-danger h4 mb-3">Application Resources</Card.Title>
                    <Card.Text className="text-muted">
                      Comprehensive guides and resources to help you navigate the application process.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={4} md={6} className="mb-4">
                <Card className="h-100 shadow border-0">
                  <Card.Body className="text-center p-4">
                    <Card.Title className="text-danger h4 mb-3">Program Information</Card.Title>
                    <Card.Text className="text-muted">
                      Detailed information about universities and graduate programs nationwide.
                    </Card.Text>
                    <Button as={Link} to="/programs" variant="outline-danger" className="mt-2">
                      Explore Programs
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={4} md={6} className="mb-4">
                <Card className="h-100 shadow border-0">
                  <Card.Body className="text-center p-4">
                    <Card.Title className="text-danger h4 mb-3">Community Support</Card.Title>
                    <Card.Text className="text-muted">
                      Connect with fellow applicants and current graduate students for guidance and support.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      {/* CTA Section - Full Width */}
      <div className="bg-light w-100 py-5">
        <Container fluid className="px-4">
          <Row className="justify-content-center">
            <Col lg={8} xl={6} className="text-center">
              <h2 className="display-6 mb-3">Ready to Start Your Journey?</h2>
              <p className="lead mb-4">Explore our resources and join the GradBadger community today.</p>
              <Button as={Link} to="/about" variant="danger" size="lg" className="px-5 py-3">
                Learn More About Us
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Home;
