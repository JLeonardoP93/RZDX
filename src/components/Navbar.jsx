import { FaShoppingCart, FaUserCog } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar({ cartItems, onChange }) {
  const handleChangeCategory = (event) => {
    onChange(prevState => ({
      ...prevState,
      category: event.target.value
    }));
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarBrand}>
        <NavLink to="/" className={styles.brandLink}>
          <img src="https://res.cloudinary.com/dvoakblan/image/upload/v1750188186/logo_jnafhw.png" alt="Logo" width={50} />
          <span className={styles.companyName}>RZDX Implementos Deportivos</span>
        </NavLink>
      </div>
      
      <ul className={styles.navLinks}>
        <li>
          <NavLink 
            to="/" 
            className={({isActive}) => 
              isActive ? `${styles.navItem} ${styles.activeNavItem}` : styles.navItem
            }
            end
          >
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/about" 
            className={({isActive}) => 
              isActive ? `${styles.navItem} ${styles.activeNavItem}` : styles.navItem
            }
          >
            Sobre Nosotros
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/products" 
            className={({isActive}) => 
              isActive ? `${styles.navItem} ${styles.activeNavItem}` : styles.navItem
            }
          >
            Productos
          </NavLink>
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
          <NavLink 
            to="/admin" 
            className={({isActive}) => 
              isActive ? `${styles.navItem} ${styles.activeNavItem}` : styles.navItem
            }
          >
            <FaUserCog className={styles.adminIcon} /> Admin
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/product-controller" 
            className={({isActive}) => 
              isActive ? `${styles.navItem} ${styles.activeNavItem}` : styles.navItem
            }
          >
            Gestión Productos
          </NavLink>
        </li>
      </ul>
      
      <NavLink to="/cart" className={styles.cartLink}>
        <div className={styles.cartIconContainer}>
          <FaShoppingCart className={styles.cartIcon} />
          {cartItems > 0 && <span className={styles.cartBadge}>{cartItems}</span>}
        </div>
      </NavLink>
    </nav>
  );
}

export default Navbar;