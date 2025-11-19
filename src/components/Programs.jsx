import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const PROGRAMS = [
  {
    title: 'Psychology',
    text: 'Studies mind and behavior with training in research and mental health practice.',
  },
  {
    title: 'Computer Sciences',
    text: 'Focuses on advanced computing, problem-solving, and software/system design.',
  },
  {
    title: 'Biology',
    text: 'Explores life processes through lab research and quantitative methods.',
  },
];

const Programs = () => {
  return (
    <div className="w-100 py-5">
      <Container fluid className="px-4">
        <Row className="justify-content-center mb-4">
          <Col lg={10} xl={8} className="text-center">
            <h1 className="display-4 text-danger mb-3">Explore Programs</h1>
            <p className="lead text-muted">
              A starting point for browsing graduate programs and understanding key requirements.
            </p>
          </Col>
        </Row>

        <Row className="justify-content-center g-4">
          {PROGRAMS.map(program => (
            <Col key={program.title} xs={12} sm={6} md={4} lg={3}>
              <Card className="h-100 shadow border-0">
                <Card.Body>
                  <Card.Title className="text-danger">{program.title}</Card.Title>
                  <Card.Text className="text-muted">
                    {program.text}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Programs;