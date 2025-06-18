import CartItem from './CartItem';

function Cart ({ cartItems, removeFromCart, updateQuantity, onContinueShopping }) {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 
    0
  );

  return (
    <div className="cart-container">
      <h2 className="cart-title">Tu Carrito de Compras</h2>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Tu carrito está vacío</p>
          <button 
            className="continue-shopping-btn"
            onClick={onContinueShopping}
          >
            Continuar comprando
          </button>
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
            <button 
              className="continue-shopping-btn"
              onClick={onContinueShopping}
            >
              Continuar comprando
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
