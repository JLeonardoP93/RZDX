import { FaShoppingCart, FaStore } from 'react-icons/fa';
import styles from './Navbar.module.css';

function Navbar ({ cartItems, onHomeClick, onCartClick, onChange }) {

  const handleChangeCategory = (event) => {
    onChange(prevState => ({
      ...prevState,
      category: event.target.value
    })) 
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarBrand} onClick={onHomeClick}>
         <img src="https://res.cloudinary.com/dvoakblan/image/upload/v1750188186/logo_jnafhw.png" alt="Logo" width={50} />
        <span className={styles.companyName}>RZDX Implementos Deportivos</span>
      </div>
      
      <ul className="nav-links">
        <li onClick={onHomeClick}>Inicio</li>
        <li><a href='#about'>Sobre Nosotros</a></li>
        <li>Productos</li>
        <li><label htmlFor='category'>Categorías</label>
        <select id='category' className='category-select' onChange={handleChangeCategory}>
          <option value='all'>Todas</option>
          <option value='Boxeo'>Boxeo</option>
          <option value='MMA'>MMA</option>
          <option value='accessories'>Accesorios</option></select>
        </li>
        <li><a href='#contact'>Contacto</a></li>
      </ul>
      
      <div className={styles.cartIconContainer} onClick={onCartClick}>
        <FaShoppingCart className={styles.cartIcon} />
        {cartItems > 0 && <span className={styles.cartBadge}>{cartItems}</span>}
      </div>
    </nav>
  );
};

export default Navbar;