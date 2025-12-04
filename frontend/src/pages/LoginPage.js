import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { AuthContext } from '../contexts/AuthContext';
import './AuthPage.css';

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAdminLogin, setIsAdminLogin] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const result = login(email, password, isAdminLogin);
    if (result.success) {
      navigate(isAdminLogin ? '/admin' : '/');
    } else {
      setError(result.message);
    }
  };

  return (
    <Container className="auth-page">
      <Row className="justify-content-center">
        <Col lg={5} md={7} sm={9}>
          <div className="auth-form-container">
            <h2 className="text-center mb-4">
              {isAdminLogin ? 'Admin Login' : 'Customer Login'}
            </h2>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Admin Login"
                  checked={isAdminLogin}
                  onChange={(e) => setIsAdminLogin(e.target.checked)}
                />
              </Form.Group>

              <Button type="submit" className="btn btn-primary btn-lg w-100 mb-3">
                Login
              </Button>
            </Form>

            {!isAdminLogin && (
              <div className="auth-footer">
                <p className="text-center mb-2">Don't have an account?</p>
                <Link to="/register" className="btn btn-outline-primary w-100">
                  Create Account
                </Link>
              </div>
            )}

            <div className="demo-credentials mt-4 p-3 bg-light rounded">
              <small className="text-muted">Demo Credentials:</small>
              <p className="mb-1">
                <strong>Customer:</strong> user@example.com / user123
              </p>
              <p className="mb-0">
                <strong>Admin:</strong> admin@example.com / admin123
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
