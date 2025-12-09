import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Button, Form, Modal, Nav, Tab, Table, Badge } from 'react-bootstrap';
import { ProductContext } from '../contexts/ProductContext';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { products, fetchProducts } = useContext(ProductContext);
  const { currentUser } = useContext(AuthContext);
  
  const [activeTab, setActiveTab] = useState('products');
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [stats, setStats] = useState({ totalProducts: 0, totalUsers: 0, totalOrders: 0, totalRevenue: 0 });
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });

  const fetchStats = useCallback(async () => {
    try { const res = await api.get('/admin/stats'); setStats(res.data); } 
    catch (e) { console.error("Stats Error:", e); }
  }, []);

  const fetchUsers = useCallback(async () => {
    try { const res = await api.get('/admin/users'); setUsers(res.data); } 
    catch (e) { console.error("Users Error:", e); }
  }, []);

  const fetchOrders = useCallback(async () => {
    try { const res = await api.get('/admin/orders'); setOrders(res.data); } 
    catch (e) { console.error("Orders Error:", e); }
  }, []);

  useEffect(() => {
    fetchStats(); 
    if (activeTab === 'users') fetchUsers();
    if (activeTab === 'orders') fetchOrders();
  }, [activeTab]);

  const [formData, setFormData] = useState({
    id: null, name: '', price: '', category: 'Tops', size: 'XS, S, M, L, XL', image: '', description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await api.put(`/admin/orders/${orderId}/status`, { status: newStatus });
      alert(`Order #${orderId} marked as ${newStatus}`);
      fetchOrders();
      fetchStats();
    } catch (e) {
      alert("Failed to update status");
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const productPayload = {
      name: formData.name,
      price: parseFloat(formData.price),
      category: formData.category,
      description: formData.description,
      image: formData.image,
      sizes: formData.size.split(',').map(s => s.trim())
    };

    try {
      if (isEditing) {
        await api.put(`/products/${formData.id}`, productPayload);
        alert('Product Updated!');
      } else {
        await api.post('/products', productPayload);
        alert('Product Added!');
      }
      await fetchProducts();
      fetchStats();
      setShowModal(false);
      setFormData({ name: '', price: '', category: 'Tops', size: '', image: '', description: '' });
    } catch (error) {
      alert(`Operation failed: ${error.response?.data?.message || 'Server Error'}`);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Delete this product?')) {
      try {
        await api.delete(`/products/${id}`);
        await fetchProducts();
        fetchStats();
      } catch (error) {
        alert("Delete failed");
      }
    }
  };

  const openEditModal = (product) => {
    const sizesArray = product.size || product.sizes || [];
    setFormData({
      id: product.id, name: product.name, price: product.price, category: product.category, image: product.image, description: product.description,
      size: Array.isArray(sizesArray) ? sizesArray.join(', ') : ''
    });
    setIsEditing(true); setShowModal(true);
  };

  const openAddModal = () => {
    setIsEditing(false);
    setFormData({ name: '', price: '', category: 'Tops', size: 'XS, S, M, L, XL', image: '', description: '' });
    setShowModal(true);
  };

  return (
    <div className="admin-dashboard">
      <Container fluid>
        <h1 className="mb-4">Admin Dashboard</h1>

        <Row className="mb-5">
          <Col lg={3} md={6} className="mb-4"><div className="stat-card"><div className="stat-number">{stats.totalProducts}</div><div className="stat-label">Total Products</div></div></Col>
          <Col lg={3} md={6} className="mb-4"><div className="stat-card"><div className="stat-number">{stats.totalUsers}</div><div className="stat-label">Total Users</div></div></Col>
          <Col lg={3} md={6} className="mb-4"><div className="stat-card"><div className="stat-number">{stats.totalOrders}</div><div className="stat-label">Total Orders</div></div></Col>
          <Col lg={3} md={6} className="mb-4"><div className="stat-card"><div className="stat-number">Php {parseFloat(stats.totalRevenue).toLocaleString(undefined, { minimumFractionDigits: 2 })}</div><div className="stat-label">Total Revenue</div></div></Col>
        </Row>

        <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
          <Nav variant="pills" className="mb-4">
            <Nav.Item><Nav.Link eventKey="products">Products</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="users">Users</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="orders">Orders</Nav.Link></Nav.Item>
          </Nav>

          <Tab.Content>
            <Tab.Pane eventKey="products">
              <div className="admin-card">
                <div className="card-header"><h5>Product Management</h5><Button onClick={openAddModal}>+ Add Product</Button></div>
                <Table responsive hover>
                  <thead><tr><th>ID</th><th>Name</th><th>Category</th><th>Price</th><th>Actions</th></tr></thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p.id}>
                        <td>{p.id}</td><td>{p.name}</td><td>{p.category}</td><td>Php {parseFloat(p.price).toFixed(2)}</td>
                        <td>
                          <Button variant="warning" size="sm" className="me-2" onClick={() => openEditModal(p)}>Edit</Button>
                          <Button variant="danger" size="sm" onClick={() => handleDeleteProduct(p.id)}>Delete</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Tab.Pane>

            <Tab.Pane eventKey="users">
              <div className="admin-card">
                <h5>User Management</h5>
                <Table responsive hover>
                  <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Role</th><th>Registered</th></tr></thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u.id}>
                        <td>{u.id}</td>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>{u.phone || 'N/A'}</td>
                        <td>{u.is_admin ? <Badge bg="danger">Admin</Badge> : <Badge bg="primary">Customer</Badge>}</td>
                        <td>{new Date(u.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Tab.Pane>

            <Tab.Pane eventKey="orders">
              <div className="admin-card">
                <h5>Order Management</h5>
                <Table responsive hover>
                  <thead><tr><th>Order ID</th><th>Customer</th><th>Total</th><th>Date</th><th>Status</th><th>Action</th></tr></thead>
                  <tbody>
                    {orders.map(o => (
                      <tr key={o.id}>
                        <td>#{o.id}</td>
                        <td>{o.user ? o.user.name : 'Guest/Deleted'}</td>
                        <td>Php {parseFloat(o.total_price).toFixed(2)}</td>
                        <td>{new Date(o.created_at).toLocaleDateString()}</td>
                        <td>
                          <Badge bg={o.status === 'Delivered' ? 'success' : o.status === 'Cancelled' ? 'danger' : 'warning'}>
                            {o.status}
                          </Badge>
                        </td>
                        <td>
                          <Form.Select 
                            size="sm" 
                            value={o.status} 
                            onChange={(e) => handleUpdateStatus(o.id, e.target.value)}
                            style={{ width: '140px', cursor: 'pointer' }}
                          >
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </Form.Select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton><Modal.Title>{isEditing ? 'Edit Product' : 'Add New Product'}</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddProduct}>
            <Form.Group className="mb-3"><Form.Label>Name</Form.Label><Form.Control name="name" value={formData.name} onChange={handleInputChange} required /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Price (Php)</Form.Label><Form.Control type="number" name="price" value={formData.price} onChange={handleInputChange} step="0.01" required /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Category</Form.Label><Form.Select name="category" value={formData.category} onChange={handleInputChange}><option>Tops</option><option>Bottoms</option><option>Dresses</option><option>Outerwear</option><option>Footwear</option></Form.Select></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Sizes</Form.Label><Form.Control name="size" value={formData.size} onChange={handleInputChange} required /><Form.Text className="text-muted">Comma separated (e.g. S, M, L)</Form.Text></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Image</Form.Label><Form.Control name="image" value={formData.image} onChange={handleInputChange} placeholder="filename.jpg" /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Description</Form.Label><Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleInputChange} required /></Form.Group>
            <Button type="submit" className="btn btn-primary w-100">{isEditing ? 'Update' : 'Add'}</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminDashboard;