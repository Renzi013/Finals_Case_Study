import React, { useContext, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';
import { ProductContext } from '../contexts/ProductContext';
import { CartContext } from '../contexts/CartContext';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const product = getProductById(id);

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

  const handleAddToCart = () => {
    if (!selectedSize) {
      setAlertMessage('Please select a size');
      setShowAlert(true);
      return;
    }

    addToCart(product, selectedSize, quantity);
    setAlertMessage(`${product.name} added to cart!`);
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

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
          <Col lg={6} md={12} className="mb-4">
            <img src={product.image} alt={product.name} className="product-detail-image" />
          </Col>

          <Col lg={6} md={12}>
            <div className="product-details">
              <span className="badge bg-secondary mb-3">{product.category}</span>
              <h1 className="product-title">{product.name}</h1>
              <p className="product-rating">⭐⭐⭐⭐⭐ (124 reviews)</p>

              <div className="price-section mb-4">
                <span className="product-price-large">Php {product.price.toFixed(2)}</span>
                <span className="original-price ms-3">
                  <s>Php {(product.price * 1.2).toFixed(2)}</s>
                </span>
              </div>

              <p className="product-description-full mb-4">
                {product.description}
              </p>

              <div className="product-features mb-4">
                <h5 className="mb-3">Product Features:</h5>
                <ul>
                  <li>Premium quality fabric</li>
                  <li>Comfortable fit</li>
                  <li>Machine washable</li>
                  <li>Available in multiple colors</li>
                </ul>
              </div>

              {/* Size Selection */}
              <Form.Group className="mb-4">
                <Form.Label className="fw-bold">Select Size:</Form.Label>
                <div className="size-options">
                  {product.size.map(size => (
                    <button
                      key={size}
                      className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </Form.Group>

              {/* Quantity Selection */}
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

              {/* Additional Info */}
              <div className="additional-info">
                <p className="mb-2">
                  <strong>✓</strong> Free shipping on orders over $50
                </p>
                <p className="mb-2">
                  <strong>✓</strong> 30-day money-back guarantee
                </p>
                <p className="mb-0">
                  <strong>✓</strong> Secure checkout
                </p>
              </div>
            </div>
          </Col>
        </Row>

        {/* Related Products Section */}
        <div className="related-products-section">
          <h3 className="mb-4">You Might Also Like</h3>
          {/* Related products would go here */}
        </div>
      </Container>
    </div>
  );
};

export default ProductDetailPage;
