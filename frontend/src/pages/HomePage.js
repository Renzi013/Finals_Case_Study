import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { ProductContext } from '../contexts/ProductContext';
import './HomePage.css';

const HomePage = () => {
  const { products } = useContext(ProductContext);
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="homepage">
      {/* Hero Banner */}
      <section className="hero-banner">
        <Container>
          <Row>
            <Col lg={8} md={10} sm={12} className="mx-auto text-center">
              <h1>Welcome to StyleHub</h1>
              <p>Discover the latest trends in fashion. Shop our exclusive collection today!</p>
              <Link to="/products">
                <Button size="lg" className="btn btn-light text-primary">
                  Start Shopping
                </Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Products Section */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-5">Featured Products</h2>
          <Row>
            {featuredProducts.map(product => (
              <Col lg={4} md={6} sm={12} key={product.id} className="mb-4">
                <div className="product-card">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <div className="product-body">
                    <h5 className="product-name">{product.name}</h5>
                    <p className="product-price">Php {product.price.toFixed(2)}</p>
                    <p className="product-description">{product.description}</p>
                    <Link to={`/products/${product.id}`}>
                      <Button className="btn btn-primary w-100 mt-auto">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us py-5">
        <Container>
          <h2 className="text-center mb-5">Why Choose StyleHub?</h2>
          <Row>
            <Col lg={3} md={6} sm={12} className="mb-4 text-center">
              <div className="feature-box">
                <div className="feature-icon">🚚</div>
                <h5>Free Shipping</h5>
                <p>On orders over $50. Fast and reliable delivery.</p>
              </div>
            </Col>
            <Col lg={3} md={6} sm={12} className="mb-4 text-center">
              <div className="feature-box">
                <div className="feature-icon">💳</div>
                <h5>Secure Payment</h5>
                <p>100% secure transactions with multiple payment options.</p>
              </div>
            </Col>
            <Col lg={3} md={6} sm={12} className="mb-4 text-center">
              <div className="feature-box">
                <div className="feature-icon">🔄</div>
                <h5>Easy Returns</h5>
                <p>30-day money-back guarantee on all purchases.</p>
              </div>
            </Col>
            <Col lg={3} md={6} sm={12} className="mb-4 text-center">
              <div className="feature-box">
                <div className="feature-icon">⭐</div>
                <h5>Premium Quality</h5>
                <p>Carefully selected items from top brands.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-5">
        <Container>
          <Row>
            <Col lg={8} md={10} sm={12} className="mx-auto text-center">
              <h2>Don't miss out on our latest collection!</h2>
              <p>Sign up for exclusive deals and early access to new products.</p>
              <input
                type="email"
                placeholder="Enter your email"
                className="form-control mb-3"
              />
              <Button className="btn btn-primary">Subscribe</Button>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default HomePage;
