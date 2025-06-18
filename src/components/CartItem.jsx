function CartItem ({ item, removeFromCart, updateQuantity }) {
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item-image" />
      
      <div className="cart-item-details">
        <h3 className="cart-item-name">{item.name}</h3>
        <p className="cart-item-price">${item.price.toFixed(2)}</p>
      </div>
      
      <div className="cart-item-quantity">
        <button 
          className="quantity-btn" 
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
        >
          -
        </button>
        <span className="quantity">{item.quantity}</span>
        <button 
          className="quantity-btn" 
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
        >
          +
        </button>
      </div>
      
      <button 
        className="remove-item-btn" 
        onClick={() => removeFromCart(item.id)}
      >
        Eliminar
      </button>
    </div>
  );
};

export default CartItem;