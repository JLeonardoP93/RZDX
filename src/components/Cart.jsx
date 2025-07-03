import CartItem from './CartItem';
import { Link } from 'react-router-dom';
import './Cart.css';

function Cart({ cartItems, removeFromCart, updateQuantity }) {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 
    0
  );

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h2 className="cart-title">Tu Carrito de Compras</h2>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Tu carrito está vacío</p>
            <Link to="/" className="continue-shopping-link">
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
              <button className="checkout-btn">Finalizar Compra</button>
              <Link to="/" className="continue-shopping-link">
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