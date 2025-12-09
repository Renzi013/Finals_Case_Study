import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert, Nav, Tab, Table, Badge } from 'react-bootstrap';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import './AccountPage.css';

const AccountPage = () => {
  const { currentUser, updateUserProfile, logout } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || ''
  });
  
  const [orders, setOrders] = useState([]); 
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  // Fetch Orders when tab changes
  useEffect(() => {
    if (activeTab === 'orders') {
        const fetchOrders = async () => {
            try {
                const freshApi = axios.create({
                    baseURL: process.env.REACT_APP_API_BASE_URL,
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}` 
                    }
                });

                const response = await freshApi.get('/orders');
                setOrders(response.data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };
        fetchOrders();
    }
  }, [activeTab]); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const result = await updateUserProfile(formData);
    if (result.success) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } else {
      alert("Failed to update profile");
    }
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
            <div className="mt-4">
                <Button variant="danger" className="w-100" onClick={logout}>Logout</Button>
            </div>
          </div>
        </Col>

        <Col lg={9} md={8}>
          <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
            <Nav variant="pills" className="mb-4">
              <Nav.Item><Nav.Link eventKey="profile">Profile Settings</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link eventKey="orders">Order History</Nav.Link></Nav.Item>
            </Nav>

            <Tab.Content>
              <Tab.Pane eventKey="profile">
                <div className="tab-content-card">
                  <h5>Update Profile</h5>
                  {showSuccess && <Alert variant="success">Profile updated successfully!</Alert>}
                  <Form onSubmit={handleUpdateProfile}>
                    <Form.Group className="mb-3">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control type="text" name="name" value={formData.name} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Enter phone number" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Address</Form.Label>
                      <Form.Control type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Enter address" />
                    </Form.Group>
                    <Button type="submit" className="btn btn-primary">Save Changes</Button>
                  </Form>
                </div>
              </Tab.Pane>

              <Tab.Pane eventKey="orders">
                <div className="tab-content-card">
                  <h5>Order History</h5>
                  {orders.length === 0 ? (
                      <p className="text-muted">No orders found.</p>
                  ) : (
                      <div className="orders-list">
                        {orders.map(order => (
                            <div key={order.id} className="order-card mb-3 p-3 border rounded">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <h6 className="m-0">Order #{order.id}</h6>
                                    <span className="text-muted small">{new Date(order.created_at).toLocaleDateString()}</span>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className={`badge bg-${order.status === 'Processing' ? 'primary' : 'success'}`}>{order.status}</span>
                                    <span className="fw-bold">Total: Php {parseFloat(order.total_price).toFixed(2)}</span>
                                </div>
                                <hr />
                                <div className="order-items small text-muted">
                                    {order.items && order.items.map((item, idx) => (
                                        <div key={idx}>
                                            {item.quantity}x {item.product?.name || 'Product'} ({item.size})
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                      </div>
                  )}
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
  );
};

export default AccountPage;