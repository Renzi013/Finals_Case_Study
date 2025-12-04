import React, { useContext, useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Nav, Tab } from 'react-bootstrap';
import { AuthContext } from '../contexts/AuthContext';
import './AccountPage.css';

const AccountPage = () => {
  const { currentUser, updateUserProfile, logout } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: '',
    address: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    updateUserProfile(formData);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <Container className="account-page">
      <h1 className="my-4">Account</h1>

      <Row>
        <Col lg={3} md={4} className="mb-4">
          <div className="account-sidebar">
            <div className="user-info">
              <div className="user-avatar">👤</div>
              <h5 className="user-name">{currentUser?.name}</h5>
              <p className="user-email">{currentUser?.email}</p>
            </div>
          </div>
        </Col>

        <Col lg={9} md={8}>
          <Tab.Container defaultActiveKey="profile">
            <Nav variant="pills" className="mb-4">
              <Nav.Item>
                <Nav.Link eventKey="profile">Profile Settings</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="orders">Order History</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="preferences">Preferences</Nav.Link>
              </Nav.Item>
            </Nav>

            <Tab.Content>
              {/* Profile Settings Tab */}
              <Tab.Pane eventKey="profile">
                <div className="tab-content-card">
                  <h5>Update Profile</h5>
                  {showSuccess && (
                    <Alert variant="success" dismissible onClose={() => setShowSuccess(false)}>
                      Profile updated successfully!
                    </Alert>
                  )}

                  <Form onSubmit={handleUpdateProfile}>
                    <Form.Group className="mb-3">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter phone number"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Enter address"
                      />
                    </Form.Group>

                    <Button type="submit" className="btn btn-primary">
                      Save Changes
                    </Button>
                  </Form>
                </div>
              </Tab.Pane>

              {/* Order History Tab */}
              <Tab.Pane eventKey="orders">
                <div className="tab-content-card">
                  <h5>Order History</h5>
                  <div className="orders-list">
                    <div className="order-card">
                      <div className="order-header">
                        <h6>Order #001</h6>
                        <span className="order-date">November 25, 2025</span>
                      </div>
                      <p className="order-status">
                        <span className="badge bg-success">Delivered</span>
                      </p>
                      <p className="order-total">Total: $150.00</p>
                      <Button variant="outline-primary" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </Tab.Pane>

              {/* Preferences Tab */}
              <Tab.Pane eventKey="preferences">
                <div className="tab-content-card">
                  <h5>Preferences</h5>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="checkbox"
                        label="Receive promotional emails"
                        defaultChecked
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="checkbox"
                        label="Receive order updates via email"
                        defaultChecked
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="checkbox"
                        label="Subscribe to newsletter"
                      />
                    </Form.Group>
                    <Button className="btn btn-primary">Save Preferences</Button>
                  </Form>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>

          {/* Logout Button */}
          <div className="mt-5">
            <Button
              variant="danger"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AccountPage;
