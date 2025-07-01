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
      
      <ul className={styles.navLinks}>
        <li>
          <span className={styles.navItem} onClick={onHomeClick}>Inicio</span>
        </li>
        <li>
          <a href="#about" className={styles.navItem}>Sobre Nosotros</a>
        </li>
        <li>
          <span className={styles.navItem}>Productos</span>
        </li>
        <li className={styles.categoryContainer}>
          <label htmlFor="category" className={styles.categoryLabel}>Categorías</label>
          <select id="category" className={styles.categorySelect} onChange={handleChangeCategory}>
            <option value="all">Todas</option>
            <option value="Boxeo">Boxeo</option>
            <option value="MMA">MMA</option>
            <option value="accessories">Accesorios</option>
          </select>
        </li>
        <li>
          <a href="#contact" className={styles.navItem}>Contacto</a>
        </li>
      </ul>
      
      <div className={styles.cartIconContainer} onClick={onCartClick}>
        <FaShoppingCart className={styles.cartIcon} />
        {cartItems > 0 && <span className={styles.cartBadge}>{cartItems}</span>}
      </div>
    </nav>
  );
};

export default Navbar;