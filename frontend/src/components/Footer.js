import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer mt-5">
      <Container>
        <Row className="mb-4">
          <Col md={3} sm={6} className="mb-4">
            <h5>About WearDistrict</h5>
            <p className="footer-text">
              Your go-to destination for trendy and high-quality clothing. Shop the latest fashion with confidence.
            </p>
          </Col>
          <Col md={3} sm={6} className="mb-4">
            <h5>Customer Service</h5>
            <ul className="list-unstyled">
              <li><Link to="/contact" className="footer-link">Contact Us</Link></li>
              <li><Link to="/faq" className="footer-link">FAQ</Link></li>
              <li><Link to="/shipping" className="footer-link">Shipping Info</Link></li>
              <li><Link to="/returns" className="footer-link">Returns</Link></li>
            </ul>
          </Col>
          <Col md={3} sm={6} className="mb-4">
            <h5>Company</h5>
            <ul className="list-unstyled">
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><Link to="/careers" className="footer-link">Careers</Link></li>
              <li><Link to="/blog" className="footer-link">Blog</Link></li>
              <li><Link to="/press" className="footer-link">Press</Link></li>
            </ul>
          </Col>
          <Col md={3} sm={6} className="mb-4">
            <h5>Connect With Us</h5>
            <ul className="list-unstyled">
              <li><a href="#facebook" className="footer-link">Facebook</a></li>
              <li><a href="#twitter" className="footer-link">Twitter</a></li>
              <li><a href="#instagram" className="footer-link">Instagram</a></li>
              <li><a href="#linkedin" className="footer-link">LinkedIn</a></li>
            </ul>
          </Col>
        </Row>
        <Row className="border-top pt-4">
          <Col md={6} className="mb-3">
            <ul className="list-unstyled d-flex gap-3">
              <li><Link to="/privacy" className="footer-link">Privacy Policy</Link></li>
              <li><Link to="/terms" className="footer-link">Terms of Service</Link></li>
              <li><Link to="/cookies" className="footer-link">Cookie Policy</Link></li>
            </ul>
          </Col>
          <Col md={6} className="text-md-end">
            <p className="footer-text">© {currentYear} WearDistrict. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
