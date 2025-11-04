import React from 'react';
import { Link } from 'react-router';
import { Container, Row, Col, Button, ListGroup } from 'react-bootstrap';

const About = () => {
  return (
    <div className="w-100 min-vh-100 d-flex flex-column">
      {/* Header Section - Full Width */}
      <div className="bg-light py-5 w-100">
        <Container fluid className="px-4">
          <Row className="justify-content-center">
            <Col lg={10} xl={8} className="text-center">
              <h1 className="display-4 text-danger mb-3">About GradBadger</h1>
              <p className="display-6 text-muted">Empowering UW-Madison Graduate School Aspirants</p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Content Section - Full Width */}
      <Container fluid className="flex-grow-1 py-5 px-4">
        <Row className="justify-content-center">
          <Col lg={10} xl={8}>
            <Row>
              {/* Mission */}
              <Col lg={6} className="mb-5">
                <h2 className="border-bottom border-danger pb-2 mb-4 h3">Our Mission</h2>
                <p className="text-muted lead">
                  GradBadger was created to address the complex and often isolating journey of applying to graduate school. 
                  We believe that every University of Wisconsin-Madison student deserves access to comprehensive resources 
                  and a supportive community throughout their graduate school application process.
                </p>
              </Col>

              {/* Vision */}
              <Col lg={6} className="mb-5">
                <h2 className="border-bottom border-danger pb-2 mb-4 h3">Our Vision</h2>
                <p className="text-muted lead">
                  We envision a world where the graduate school application process is transparent, accessible, and 
                  collaborative. By consolidating essential resources and fostering community connections, we aim to 
                  reduce barriers and increase success rates for all aspiring graduate students.
                </p>
              </Col>
            </Row>

            {/* What We Do - Full Width */}
            <Row className="mb-5">
              <Col>
                <h2 className="border-bottom border-danger pb-2 mb-4 h3 text-center">What We Do</h2>
                <Row>
                  <Col lg={6}>
                    <ListGroup variant="flush" className="border-0">
                      <ListGroup.Item className="border-0 px-0 py-3">
                        <strong>•</strong> Provide comprehensive application guides and timelines
                      </ListGroup.Item>
                      <ListGroup.Item className="border-0 px-0 py-3">
                        <strong>•</strong> Offer program-specific information and requirements
                      </ListGroup.Item>
                      <ListGroup.Item className="border-0 px-0 py-3">
                        <strong>•</strong> Connect applicants with current graduate students and alumni
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                  <Col lg={6}>
                    <ListGroup variant="flush" className="border-0">
                      <ListGroup.Item className="border-0 px-0 py-3">
                        <strong>•</strong> Share success stories and application tips
                      </ListGroup.Item>
                      <ListGroup.Item className="border-0 px-0 py-3">
                        <strong>•</strong> Maintain updated deadlines and important dates
                      </ListGroup.Item>
                      <ListGroup.Item className="border-0 px-0 py-3">
                        <strong>•</strong> Foster a supportive community of graduate school applicants
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                </Row>
              </Col>
            </Row>

            {/* Community - Centered */}
            <Row className="mb-5">
              <Col lg={8} className="mx-auto text-center">
                <h2 className="border-bottom border-danger pb-2 mb-4 h3">Join Our Community</h2>
                <p className="text-muted lead">
                  Whether you're just starting to consider graduate school or you're in the middle of your applications, 
                  GradBadger is here to support you every step of the way. Together, we can make the path to graduate 
                  education clearer and more achievable for everyone.
                </p>
              </Col>
            </Row>

            {/* Back Button - Centered */}
            <Row>
              <Col className="text-center">
                <Button as={Link} to="/" variant="danger" size="lg" className="px-5 py-3">
                  ← Back to Home
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
