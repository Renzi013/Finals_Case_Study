import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import { CartContext } from '../contexts/CartContext';
import { AuthContext } from '../contexts/AuthContext';
import './CartPage.css';

const CartPage = () => {
  const { cart, removeFromCart, updateCartItem, getTotalPrice, getTotalItems } = useContext(CartContext);
  const { currentUser } = useContext(AuthContext);

  if (cart.length === 0) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <h2 className="mb-4">Your Cart is Empty</h2>
          <p className="text-muted mb-4">Start shopping to add items to your cart</p>
          <Link to="/products">
            <Button className="btn btn-primary btn-lg">Continue Shopping</Button>
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <div className="cart-page">
      <Container>
        <h1 className="my-4">Shopping Cart</h1>

        <Row>
          <Col lg={8}>
            <div className="cart-items">
              <Table className="cart-table" responsive>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Size</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => (
                    <tr key={`${item.id}-${item.size}-${index}`} className="cart-item-row">
                      <td>
                        <div className="cart-item-product">
                          <img src={item.image} alt={item.name} className="cart-item-image" />
                          <span className="cart-item-name">{item.name}</span>
                        </div>
                      </td>
                      <td className="cart-item-price">${item.price.toFixed(2)}</td>
                      <td>{item.size}</td>
                      <td>
                        <div className="quantity-control">
                          <button
                            className="qty-btn"
                            onClick={() => updateCartItem(item.id, item.size, item.quantity - 1)}
                          >
                            -
                          </button>
                          <span className="qty-value">{item.quantity}</span>
                          <button
                            className="qty-btn"
                            onClick={() => updateCartItem(item.id, item.size, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="cart-item-total">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => removeFromCart(item.id, item.size)}
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>

          <Col lg={4}>
            <div className="cart-summary">
              <h4 className="mb-4">Order Summary</h4>

              <div className="summary-row">
                <span>Subtotal ({getTotalItems()} items)</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>

              <div className="summary-row">
                <span>Shipping</span>
                <span className="shipping-fee">
                  {getTotalPrice() > 50 ? <span className="text-success">FREE</span> : '$10.00'}
                </span>
              </div>

              <div className="summary-row">
                <span>Tax</span>
                <span>${(getTotalPrice() * 0.1).toFixed(2)}</span>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-total">
                <span>Total</span>
                <span className="total-price">
                  ${(getTotalPrice() + (getTotalPrice() > 50 ? 0 : 10) + getTotalPrice() * 0.1).toFixed(2)}
                </span>
              </div>

              {currentUser ? (
                <Link to="/checkout" className="w-100 d-block">
                  <Button className="btn btn-primary btn-lg w-100 mb-3">
                    Proceed to Checkout
                  </Button>
                </Link>
              ) : (
                <Link to="/login" className="w-100 d-block">
                  <Button className="btn btn-primary btn-lg w-100 mb-3">
                    Login to Checkout
                  </Button>
                </Link>
              )}

              <Link to="/products" className="w-100 d-block">
                <Button variant="outline-secondary" className="btn-lg w-100">
                  Continue Shopping
                </Button>
              </Link>

              <div className="cart-benefits mt-4">
                <p className="benefit">✓ Free returns within 30 days</p>
                <p className="benefit">✓ Secure checkout</p>
                <p className="benefit">✓ Order tracking</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CartPage;
