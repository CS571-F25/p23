import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const Navigation = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Check for logged in user
    const user = sessionStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }

    // Listen for storage changes
    const handleStorageChange = () => {
      const user = sessionStorage.getItem('currentUser');
      setCurrentUser(user ? JSON.parse(user) : null);
    };

    window.addEventListener('storage', handleStorageChange);
    // Also check periodically since sessionStorage events don't fire in same tab
    const interval = setInterval(handleStorageChange, 500);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('currentUser');
    setCurrentUser(null);
    navigate('/');
  };

  return (
    <Navbar bg="danger" variant="dark" expand="lg" className="shadow-sm">
      <Container fluid className="px-4">
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-3">
          GradBadger
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/" className="fw-semibold mx-2 text-white">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/programs" className="fw-semibold mx-2 text-white">
              Programs
            </Nav.Link>
            <Nav.Link as={Link} to="/resources" className="fw-semibold mx-2 text-white">
              Resources
            </Nav.Link>
            <Nav.Link as={Link} to="/community" className="fw-semibold mx-2 text-white">
              Community
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className="fw-semibold mx-2 text-white">
              About
            </Nav.Link>
            {currentUser ? (
              <>
                <span className="text-white mx-2">Welcome, {currentUser.name}!</span>
                <Button 
                  variant="outline-light" 
                  size="sm" 
                  onClick={handleLogout}
                  className="ms-2 text-white"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button 
                variant="outline-light" 
                size="sm" 
                as={Link} 
                to="/auth"
                className="ms-2 text-white"
              >
                Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
