import { useState } from 'react';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';
import './Cart.css';

function Cart({ cartItems, removeFromCart, updateQuantity, clearCart }) {
  const [showThankYou, setShowThankYou] = useState(false);
  
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 
    0
  );

  const handleCheckout = () => {
    setShowThankYou(true);
    setTimeout(() => {
      clearCart();
      setShowThankYou(false);
    }, 5000);
  };

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h2 className="cart-title">Tu Carrito de Compras</h2>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Tu carrito está vacío</p>
            <Link to="/products" className="continue-shopping-link">
              Continuar comprando
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map(item => (
                <CartItem
                  key={item.id}
                  item={item}
                  removeFromCart={removeFromCart}
                  updateQuantity={updateQuantity}
                />
              ))}
            </div>
            
            <div className="cart-summary">
              <h3>Total: ${total.toFixed(2)}</h3>
              
              {!showThankYou ? (
                <button className="checkout-btn" onClick={handleCheckout}>
                  Finalizar Compra
                </button>
              ) : (
                <div className="thank-you-message">
                  <div className="success-icon">✅</div>
                  <h3>¡Gracias por tu compra!</h3>
                  <p>Tu pedido ha sido procesado exitosamente.</p>
                  <p>En <strong>RZDX</strong> valoramos tu confianza.</p>
                </div>
              )}
              
              <Link to="/products" className="continue-shopping-link">
                Continuar comprando
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;