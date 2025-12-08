import React, { useContext, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Alert,
  Spinner
} from 'react-bootstrap';

import { ProductContext } from '../contexts/ProductContext';
import { CartContext } from '../contexts/CartContext';

import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getProductById, loading } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);

  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const product = getProductById(id);

  // ✔ Loading State
  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading product details...</p>
      </Container>
    );
  }

  // ✔ If product does not exist
  if (!product) {
    return (
      <Container className="text-center py-5">
        <h2>Product Not Found</h2>
        <p>Sorry, the product you're looking for doesn't exist.</p>

        <Link to="/products">
          <Button>Back to Products</Button>
        </Link>
      </Container>
    );
  }

  // ✔ Add to cart handler
  const handleAddToCart = () => {
    if (!selectedSize) {
      setAlertMessage('Please select a size');
      setShowAlert(true);
      return;
    }

    addToCart(product, selectedSize, quantity);
    setAlertMessage(`${product.name} added to cart!`);
    setShowAlert(true);

    setTimeout(() => setShowAlert(false), 3000);
  };

  // ✔ Buy Now handler
  const handleBuyNow = () => {
    if (!selectedSize) {
      setAlertMessage('Please select a size');
      setShowAlert(true);
      return;
    }

    addToCart(product, selectedSize, quantity);
    navigate('/cart');
  };

  return (
    <div className="product-detail-page">
      <Container>
        <Link to="/products" className="back-link mb-4 d-inline-block mt-4">
          ← Back to Products
        </Link>

        {/* Alert Message */}
        {showAlert && (
          <Alert
            variant={alertMessage.includes('added') ? 'success' : 'warning'}
            onClose={() => setShowAlert(false)}
            dismissible
          >
            {alertMessage}
          </Alert>
        )}

        <Row className="mb-5">
          {/* Product Image */}
          <Col lg={6} md={12} className="mb-4">
            <img
              src={product.image}
              alt={product.name}
              className="product-detail-image"
            />
          </Col>

          {/* Product Information */}
          <Col lg={6} md={12}>
            <div className="product-details">
              <span className="badge bg-secondary mb-3">
                {product.category}
              </span>

              <h1 className="product-title">{product.name}</h1>
              <p className="product-rating">⭐⭐⭐⭐⭐ (124 reviews)</p>

              {/* Price */}
              <div className="price-section mb-4">
                <span className="product-price-large">
                  Php {product.price.toFixed(2)}
                </span>
                <span className="original-price ms-3">
                  <s>Php {(product.price * 1.2).toFixed(2)}</s>
                </span>
              </div>

              <p className="product-description-full mb-4">
                {product.description}
              </p>

              {/* Size Selection */}
              <Form.Group className="mb-4">
                <Form.Label className="fw-bold">Select Size:</Form.Label>
                <div className="size-options">
                  {product.size &&
                    product.size.map(size => (
                      <button
                        key={size}
                        className={`size-btn ${
                          selectedSize === size ? 'active' : ''
                        }`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                </div>
              </Form.Group>

              {/* Quantity Selector */}
              <Form.Group className="mb-4">
                <Form.Label className="fw-bold">Quantity:</Form.Label>
                <div className="quantity-selector">
                  <Button
                    variant="outline-primary"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>

                  <span className="quantity-display">{quantity}</span>

                  <Button
                    variant="outline-primary"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </Form.Group>

              {/* Action Buttons */}
              <div className="action-buttons mb-4">
                <Button
                  className="btn btn-primary btn-lg w-100 mb-3"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>

                <Button
                  variant="outline-primary"
                  className="btn-lg w-100"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductDetailPage;
