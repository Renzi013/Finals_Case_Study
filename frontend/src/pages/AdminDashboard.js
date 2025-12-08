import React, { useContext,useState} from 'react';
import {Container, Row, Col, Card, Button, Form, Modal, Nav, Tab} from 'react-bootstrap';
import {ProductContext} from '../contexts/ProductContext';
import {AuthContext} from '../contexts/AuthContext';
import {Table} from 'react-bootstrap';
import axios from 'axios';
import'./AdminDashboard.css';

const AdminDashboard = () => {
  //We only need 'products' and the refresh function ;fetchProducts'
  const { products, fetchProducts } = useContext(ProductContext);
  const {currentUser} = useContext(AuthContext);
  const [active , setActive] = useState('products');
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  //Setup api helper
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}` //admin Token
    }
  });

const [formData, setFormData] = useState({
 id: null,
 name: '',
 price: '',
 category: 'Tops',
 size: 'XS, S, M, L, XL', // Input is a string
 image: '',
 description: ''
 });


 const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    name: value 
  }))

};

const handleAddProduct = async (e) => {
  e.preventDefault();

  // CONVERSION: Frontend String ("S, M") -> Backend Array (["S", "M"])
const productPayload = {
  name: formData.name,
  price: parseFloat(formData.price),
  category: formData.category,
  description: formData.description,
  image: formData.image,
  size: formData.size.split(',').map(s => s.trim()) // Backend expects 'sizes' (plural) array
};

try{
  if(isEditing){
    //update Existing Product
    await api.put(`/products/${formData.id}`, productPayload);
    alert('Product Updated Successfully!');
  } else {
    // Create New Product
    await api.post('/products', productPayload);
    alert('Product Added Successfully!');
  }
  
  //refresh the list immediately so the new items shows up
  await fetchProducts();

  //Reset form and close modal
  setFormData({ name: '', price: '', category: 'Tops', size: '', image: '', description: '' });
 setShowModal(false);
 
} catch (error) {
  console.error(error);
  alert(`Operation failed: ${error.response?.data?.message || 'Server Error'}`);
  }
};

const handleDeleteProduct = async (Id) => {
  if (window.confirm('Are you sure you want to delete this product?')){

    try{
      await api.delete(`/products/${Id}`);
      alert('Product Deleted!');
      await fetchProducts(); //refresh list
    } catch (error) {
      alert (`Delete failed: ${error.response?.data?.message || 'Server Error'}`);
    }
  }
    };

    const openEditModal = (product) => {
      setFormData({
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
        image: product.image, //Keep the URL/Filename as is
        description: product.description,
        //CONVERSION: Backend Array (["S", "M"]) -> Frontend String ("S, M")
        size: Array.isArray(product.sizes) ? product.sizes.join(', ') : ''
      });
      setIsEditing(true);
      setShowModal(true);
    };
      const openAddModal = () => {
        setIsEditing(false);
        setFormData({ 
          name: '', 
          price: '', 
          category: 'Tops', 
          size: 'XS,S,M,L,XL', 
          image: '', 
          description: '' 
        });
        setShowModal(true);
      };

      //Mock Stats (You can wire these up to an API endpoint later if needed)
      const stats = {
        totalProducts: products.length,
        totalUsers: 12, 
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
     <div className="stat-number">{stats.totalProducts}</div>
     <div className="stat-label">Total Products</div>
 </div>
    </Col>
    <Col lg={3} md={6} sm={12} className="mb-4">
      <div className="stat-card">
      <div className="stat-number">{stats.totalUsers}</div>
      <div className="stat-label">Total Users</div>
  </div>
    </Col> 
    <Col lg={3} md={6} sm={12} className="mb-4">
      <div className="stat-card">
      <div className="stat-number">{stats.totalOrders}</div> 
      <div className="stat-label">Total Orders</div>
  </div>
    </Col>
    <Col lg={3} md={6} sm={12} className="mb-4">
      <div className="stat-card">
      <div className="stat-number">{stats.totalRevenue}</div>
      <div className="stat-label">Total Revenue</div>
  </div>
    </Col>
   </Row>

    <Tab.Container activeKey={active} onSelect={(k) => setActive(k)}>
      <Nav variant="pills" className="mb-4">
        <Nav.Item><Nav.Link eventKey="products">Products</Nav.Link></Nav.Item>
      <Nav.Item><Nav.Link eventKey="users">Users</Nav.Link></Nav.Item>
      <Nav.Item><Nav.Link eventKey="orders">Orders</Nav.Link></Nav.Item>
 </Nav>

      <Tab.Content>
        {/* Products Tab */}
        <Tab.Pane eventKey="products">
          <div className="admin-card">
          <div className="card-header">  
        <h5>Product Management</h5>
         <Button className="btn btn-primary" onClick={openAddModal}>
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
          <td>${parseFloat(product.price).toFixed(2)}</td>
          <td>
            <Button variant="warning" size="sm" className="me-2" onClick={() => openEditModal(product)}>
     Edit
     </Button>
     <Button variant="danger" size="sm" onClick={() => handleDeleteProduct(product.id)}>
      Delete
     </Button>
   </td>
   </tr>
   ))}
  </tbody>
 </Table>
 </div>
 </Tab.Pane>

    {/* Placeholder for future features */ }
    <Tab.Pane eventKey="users">
      <div className="admin-card"><p className="text-center py-5">User management coming
soon...</p></div>
    </Tab.Pane>
    <Tab.Pane eventKey="orders">
      <div className="admin-card"><p className="text-center py-5">Order management coming
soon...</p></div>
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
        <Form.Control type="text" name="name" value={formData.name} onChange={handleInputChange} required
/>
        </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Price ($)</Form.Label>
        <Form.Control type="number" name="price" value={formData.price} onChange={handleInputChange}
step="0.01" required />
 </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Category</Form.Label>
        <Form.Select name="category" value={formData.category} onChange={handleInputChange}>
        <option>Tops</option>
        <option>Bottoms</option>
        <option>Dresses</option>
        <option>Outerwear</option>
        <option>Footwear</option>
 </Form.Select>
 </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Sizes (comma separated)</Form.Label>
        <Form.Control 
        type="text" 
        name="size" 
        value={formData.size} 
        onChange={handleInputChange}
        placeholder="XS, S, M, L, XL"
        required
/>
   <Form.Text className="text-muted">Separate sizes with commas (e.g 28, 30, 32)</Form.Text>
 </Form.Group> 

      <Form.Group className="mb-3">
        <Form.Label> Image Filename or URL </Form.Label>
        <Form.Control 
        type="text" 
        name="image" 
        value={formData.image} 
        onChange={handleInputChange}
        placeholder="e.g. whiteTshirt.jpg"
 />
 </Form.Group>

<Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleInputChange} required />
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
