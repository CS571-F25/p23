import React, { useState } from 'react';
import { Link } from 'react-router';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

// Show details
const WhatWeDoItem = ({ text, detail }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="py-2 border-top">
      <div className="d-flex justify-content-between align-items-center">
        <span>{text}</span>
        <button
          type="button"
          className="btn btn-link p-0 text-decoration-none"
          onClick={() => setShow(prev => !prev)}
        >
          {show ? '− Hide details' : '+ Show details'}
        </button>
      </div>
      {show && (
        <p className="small text-muted mb-0 mt-2">
          {detail}
        </p>
      )}
    </div>
  );
};

const About = () => {
  return (
    <div className="w-100 min-vh-100 d-flex flex-column">
      {/* Header Section - Full Width */}
      <div className="bg-light py-5 w-100">
        <Container fluid className="px-4">
          <Row className="justify-content-center">
            <Col lg={10} xl={8} className="text-center">
              <h1 className="display-4 text-danger mb-3">About GradBadger</h1>
              <p className="display-6 text-muted">
                Empowering UW–Madison Graduate School Aspirants
              </p>
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
                  GradBadger was created to address the complex and often isolating journey of
                  applying to graduate school. We believe that every University of Wisconsin–Madison
                  student deserves access to comprehensive resources and a supportive community
                  throughout their graduate school application process.
                </p>
              </Col>

              {/* Vision */}
              <Col lg={6} className="mb-5">
                <h2 className="border-bottom border-danger pb-2 mb-4 h3">Our Vision</h2>
                <p className="text-muted lead">
                  We envision a world where the graduate school application process is transparent,
                  accessible, and collaborative. By consolidating essential resources and fostering
                  community connections, we aim to reduce barriers and increase success rates for all
                  aspiring graduate students.
                </p>
              </Col>
            </Row>

            {/* What We Do - Card with details Show/Hide */}
            <Row className="mb-5">
              <Col xs={12}>
                <Card className="border-0 shadow-sm">
                  <Card.Body>
                    <h2 className="h4 mb-2">What We Do</h2>
                    <p className="small text-muted mb-3">
                      Click each item to see how GradBadger will support your application journey.
                    </p>

                    <WhatWeDoItem
                      text="Provide comprehensive application guides and timelines"
                      detail="GradBadger will centralize sample timelines and checklists so applicants can see what to do in each phase of the application cycle."
                    />

                    <WhatWeDoItem
                      text="Offer program-specific information and requirements"
                      detail="We plan to include basic admissions requirements, links, and notes for graduate programs of University to reduce guesswork and confusion."
                    />

                    <WhatWeDoItem
                      text="Connect applicants with current graduate students and alumni"
                      detail="Future versions may highlight opportunities to learn from current grad students and alumni through profiles, Q&A, or informal advice."
                    />

                    <WhatWeDoItem
                      text="Share success stories and application tips"
                      detail="GradBadger will curate anonymized tips and reflections about what helped students feel more confident and prepared during the process."
                    />

                    <WhatWeDoItem
                      text="Maintain updated deadlines and important dates"
                      detail="A simple overview of key dates and reminders can help applicants stay organized across multiple programs and requirements."
                    />

                    <WhatWeDoItem
                      text="Foster a supportive applicant community"
                      detail="Our long-term goal is to support peer-to-peer encouragement and knowledge-sharing, so no one has to go through the process alone."
                    />
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Community - Centered */}
            <Row className="mb-5">
              <Col lg={8} className="mx-auto text-center">
                <h2 className="border-bottom border-danger pb-2 mb-4 h3">Join Our Community</h2>
                <p className="text-muted lead">
                  Whether you are just starting to consider graduate school or you are in the
                  middle of your applications, GradBadger is here to support you every step of the
                  way. Together, we can make the path to graduate education clearer and more
                  achievable for everyone.
                </p>
              </Col>
            </Row>

            {/* Back Button - Centered */}
            <Row>
              <Col className="text-center">
                <Button
                  as={Link}
                  to="/"
                  variant="danger"
                  size="lg"
                  className="px-5 py-3"
                >
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

