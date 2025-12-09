import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Form, Badge } from 'react-bootstrap';
import { CartContext } from '../contexts/CartContext';
import { AuthContext } from '../contexts/AuthContext';
import './Navbar.css';

const NavbarComponent = () => {
  const { getTotalItems } = useContext(CartContext);
  const { currentUser, isAdmin, logout } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar className="navbar-custom sticky-top" expand="lg">
      <Container>
        {/* Redirect Admin to Dashboard on logo click, Customer to Home */}
        <Navbar.Brand as={Link} to={isAdmin ? "/admin" : "/"}>
          WearDistrict
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          
          {/* LEFT SIDE LINKS */}
          <Nav className="me-auto">
            {isAdmin ? (
              // ADMIN VIEW: Only Dashboard
              <Nav.Link as={Link} to="/admin">Admin Dashboard</Nav.Link>
            ) : (
              // CUSTOMER VIEW: Home & Shop
              <>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/products">Shop</Nav.Link>
              </>
            )}
          </Nav>

          {/* CUSTOMER ONLY: Search & Right Side Nav */}
          {!isAdmin && (
            <>
              <Form className="search-bar d-flex" onSubmit={handleSearch}>
                <Form.Control
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="btn btn-sm btn-primary ms-2">
                  Search
                </button>
              </Form>

              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/cart" className="position-relative">
                  Cart
                  {getTotalItems() > 0 && (
                    <Badge bg="danger" className="position-absolute top-0 start-100 translate-middle">
                      {getTotalItems()}
                    </Badge>
                  )}
                </Nav.Link>

                {currentUser ? (
                  <>
                    <Nav.Link as={Link} to="/account"> {currentUser.name}</Nav.Link>
                    <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                  </>
                ) : (
                  <>
                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    <Nav.Link as={Link} to="/register">Register</Nav.Link>
                  </>
                )}
              </Nav>
            </>
          )}

          {/* ADMIN ONLY: Logout Button */}
          {isAdmin && (
            <Nav className="ms-auto">
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
          )}

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;