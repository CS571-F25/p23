import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Tab, Tabs } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const Auth = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  
  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  // Register state
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');

    if (!loginEmail || !loginPassword) {
      setLoginError('Please fill in all fields');
      return;
    }

    // Get user from session storage
    const storedUser = sessionStorage.getItem(`user_${loginEmail}`);
    
    if (!storedUser) {
      setLoginError('No account found with this email. Please register first.');
      return;
    }

    const userData = JSON.parse(storedUser);
    
    if (userData.password !== loginPassword) {
      setLoginError('Incorrect password');
      return;
    }

    // Set logged in user
    sessionStorage.setItem('currentUser', JSON.stringify({
      email: userData.email,
      name: userData.name
    }));

    // Redirect to home
    navigate('/');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setRegisterError('');
    setRegisterSuccess('');

    if (!registerEmail || !registerPassword || !registerConfirmPassword || !registerName) {
      setRegisterError('Please fill in all fields');
      return;
    }

    if (registerPassword !== registerConfirmPassword) {
      setRegisterError('Passwords do not match');
      return;
    }

    if (registerPassword.length < 6) {
      setRegisterError('Password must be at least 6 characters long');
      return;
    }

    // Check if user already exists
    const existingUser = sessionStorage.getItem(`user_${registerEmail}`);
    if (existingUser) {
      setRegisterError('An account with this email already exists');
      return;
    }

    // Store user in session storage
    const newUser = {
      email: registerEmail,
      password: registerPassword,
      name: registerName
    };
    
    sessionStorage.setItem(`user_${registerEmail}`, JSON.stringify(newUser));
    
    setRegisterSuccess('Account created successfully! You can now login.');
    
    // Clear form
    setRegisterEmail('');
    setRegisterPassword('');
    setRegisterConfirmPassword('');
    setRegisterName('');
    
    // Switch to login tab after 1.5 seconds
    setTimeout(() => {
      setActiveTab('login');
      setRegisterSuccess('');
    }, 1500);
  };

  return (
    <div className="w-100 min-vh-100 bg-light">
      <Container fluid className="py-5 px-4">
        <Row className="justify-content-center">
          <Col lg={6} xl={5}>
            <div className="text-center mb-4">
              <h1 className="display-5 fw-bold text-danger mb-2">Welcome to GradBadger</h1>
              <p className="text-muted">Login or create an account to continue</p>
            </div>

            <Card className="shadow border-0">
              <Card.Body className="p-4">
                <Tabs
                  activeKey={activeTab}
                  onSelect={(k) => setActiveTab(k)}
                  className="mb-4"
                  justify
                >
                  <Tab eventKey="login" title="Login">
                    <Form onSubmit={handleLogin} className="mt-4">
                      {loginError && (
                        <Alert variant="danger" dismissible onClose={() => setLoginError('')}>
                          {loginError}
                        </Alert>
                      )}

                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="loginEmail">Email address</Form.Label>
                        <Form.Control
                          id="loginEmail"
                          type="email"
                          placeholder="Enter email"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label htmlFor="loginPassword">Password</Form.Label>
                        <Form.Control
                          id="loginPassword"
                          type="password"
                          placeholder="Password"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                        />
                      </Form.Group>

                      <Button variant="danger" type="submit" className="w-100 py-2">
                        Login
                      </Button>
                    </Form>
                  </Tab>

                  <Tab eventKey="register" title="Register">
                    <Form onSubmit={handleRegister} className="mt-4">
                      {registerError && (
                        <Alert variant="danger" dismissible onClose={() => setRegisterError('')}>
                          {registerError}
                        </Alert>
                      )}
                      
                      {registerSuccess && (
                        <Alert variant="success">
                          {registerSuccess}
                        </Alert>
                      )}

                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="registerName">Full Name</Form.Label>
                        <Form.Control
                          id="registerName"
                          type="text"
                          placeholder="Enter your name"
                          value={registerName}
                          onChange={(e) => setRegisterName(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="registerEmail">Email address</Form.Label>
                        <Form.Control
                          id="registerEmail"
                          type="email"
                          placeholder="Enter email"
                          value={registerEmail}
                          onChange={(e) => setRegisterEmail(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="registerPassword">Password</Form.Label>
                        <Form.Control
                          id="registerPassword"
                          type="password"
                          placeholder="Password (min 6 characters)"
                          value={registerPassword}
                          onChange={(e) => setRegisterPassword(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label htmlFor="registerConfirmPassword">Confirm Password</Form.Label>
                        <Form.Control
                          id="registerConfirmPassword"
                          type="password"
                          placeholder="Confirm password"
                          value={registerConfirmPassword}
                          onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                        />
                      </Form.Group>

                      <Button variant="danger" type="submit" className="w-100 py-2">
                        Create Account
                      </Button>
                    </Form>
                  </Tab>
                </Tabs>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Auth;
