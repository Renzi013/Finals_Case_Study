import React, { useContext, useState } from 'react';
import { Container, Row, Col, Button, Form, Table, Modal, Nav, Tab } from 'react-bootstrap';
import { ProductContext } from '../contexts/ProductContext';
import { AuthContext } from '../contexts/AuthContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useContext(ProductContext);
  const { users } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('products');
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Tops',
    size: 'XS,S,M,L,XL',
    image: '',
    description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    addProduct({
      ...formData,
      price: parseFloat(formData.price),
      size: formData.size.split(',').map(s => s.trim())
    });
    setFormData({
      name: '',
      price: '',
      category: 'Tops',
      size: 'XS,S,M,L,XL',
      image: '',
      description: ''
    });
    setShowModal(false);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  const stats = {
    totalProducts: products.length,
    totalUsers: users.length,
    totalOrders: 42,
    totalRevenue: '$12,840'
  };

  return (
    <div className="admin-dashboard">
      <Container fluid>
        <h1 className="mb-4">Admin Dashboard</h1>

        {/* Statistics Cards */}
        <Row className="mb-5">
          <Col lg={3} md={6} sm={12} className="mb-4">
            <div className="stat-card">
              <div className="stat-icon">📦</div>
              <div className="stat-number">{stats.totalProducts}</div>
              <div className="stat-label">Total Products</div>
            </div>
          </Col>
          <Col lg={3} md={6} sm={12} className="mb-4">
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-number">{stats.totalUsers}</div>
              <div className="stat-label">Total Users</div>
            </div>
          </Col>
          <Col lg={3} md={6} sm={12} className="mb-4">
            <div className="stat-card">
              <div className="stat-icon">📋</div>
              <div className="stat-number">{stats.totalOrders}</div>
              <div className="stat-label">Total Orders</div>
            </div>
          </Col>
          <Col lg={3} md={6} sm={12} className="mb-4">
            <div className="stat-card">
              <div className="stat-icon">💰</div>
              <div className="stat-number">{stats.totalRevenue}</div>
              <div className="stat-label">Total Revenue</div>
            </div>
          </Col>
        </Row>

        {/* Tabs */}
        <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
          <Nav variant="pills" className="mb-4">
            <Nav.Item>
              <Nav.Link eventKey="products">Products</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="users">Users</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="orders">Orders</Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content>
            {/* Products Tab */}
            <Tab.Pane eventKey="products">
              <div className="admin-card">
                <div className="card-header">
                  <h5>Product Management</h5>
                  <Button
                    className="btn btn-primary"
                    onClick={() => {
                      setIsEditing(false);
                      setShowModal(true);
                    }}
                  >
                    + Add Product
                  </Button>
                </div>

                <Table className="admin-table" responsive>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => (
                      <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>${product.price.toFixed(2)}</td>
                        <td>
                          <Button
                            variant="sm"
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => {
                              setFormData(product);
                              setIsEditing(true);
                              setShowModal(true);
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            className="btn-sm"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Tab.Pane>

            {/* Users Tab */}
            <Tab.Pane eventKey="users">
              <div className="admin-card">
                <h5 className="mb-4">User Management</h5>

                <Table className="admin-table" responsive>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          <span className="badge bg-info">
                            {user.isAdmin ? 'Admin' : 'Customer'}
                          </span>
                        </td>
                        <td>
                          <span className="badge bg-success">Active</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Tab.Pane>

            {/* Orders Tab */}
            <Tab.Pane eventKey="orders">
              <div className="admin-card">
                <h5 className="mb-4">Order Management</h5>

                <Table className="admin-table" responsive>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>#001</td>
                      <td>John Doe</td>
                      <td>2025-11-20</td>
                      <td>$150.00</td>
                      <td>
                        <span className="badge bg-success">Delivered</span>
                      </td>
                    </tr>
                    <tr>
                      <td>#002</td>
                      <td>Jane Smith</td>
                      <td>2025-11-22</td>
                      <td>$89.99</td>
                      <td>
                        <span className="badge bg-info">Shipped</span>
                      </td>
                    </tr>
                    <tr>
                      <td>#003</td>
                      <td>Mike Johnson</td>
                      <td>2025-11-23</td>
                      <td>$220.00</td>
                      <td>
                        <span className="badge bg-warning">Processing</span>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Container>

      {/* Add/Edit Product Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Product' : 'Add New Product'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddProduct}>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter product name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Enter price"
                step="0.01"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option>Tops</option>
                <option>Bottoms</option>
                <option>Dresses</option>
                <option>Outerwear</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Sizes (comma-separated)</Form.Label>
              <Form.Control
                type="text"
                name="size"
                value={formData.size}
                onChange={handleInputChange}
                placeholder="XS,S,M,L,XL"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="url"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://via.placeholder.com/300"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter product description"
              />
            </Form.Group>

            <Button type="submit" className="btn btn-primary w-100">
              {isEditing ? 'Update Product' : 'Add Product'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
