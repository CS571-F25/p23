import React from 'react';
import { Link } from 'react-router';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Navigation = () => {
  return (
    <Navbar bg="danger" variant="dark" expand="lg" className="shadow-sm">
      <Container fluid className="px-4">
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-3">
          GradBadger
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="fw-semibold mx-2">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/programs" className="fw-semibold mx-2">
              Programs
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className="fw-semibold mx-2">
              About
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
