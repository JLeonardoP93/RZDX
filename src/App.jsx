import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import About from './components/About';
import Administrador from './components/Administrador';
import ProductController  from './components/ProductController';
import './App.css';


function App () {
  const [cart, setCart] = useState([]);
  
  // Datos de productos
const products = [
  {
    id: 1,
    name: "Saco de Boxeo",
    price: 100.0,
    category: "Boxeo",
    image:
      "https://res.cloudinary.com/dvoakblan/image/upload/v1750187355/SacoBox1Metro_vu3azd.png",
  },
  {
    id: 2,
    name: "Saco de Boxeo 80 cm",
    price: 90.0,
    category: "Boxeo",
    image:
      "https://res.cloudinary.com/dvoakblan/image/upload/v1750187653/sacoBox80cm_swr4vs.png",
  },
  {
    id: 3,
    name: "Pavos de Boxeo",
    price: 120.0,
    category: "Boxeo",
    image:
      "https://res.cloudinary.com/dvoakblan/image/upload/v1750084019/Imagen_de_WhatsApp_2025-06-16_a_las_09.16.58_a80a20ad-removebg-preview_leioat.png",
  },
  {
    id: 4,
    name: "Guantes mma",
    price: 130.0,
    category: "MMA",
    image:
      "https://res.cloudinary.com/dvoakblan/image/upload/v1750188186/GuantesMmaLegion_rjzn3w.png",
  },
  {
    id: 5,
    name: "Guantes de Boxeo",
    price: 133.0,
    category: "Boxeo",
    image:
      "https://res.cloudinary.com/dvoakblan/image/upload/v1750188186/GuantesBoxLegion_pobuuf.png",
  },
  {
    id: 6,
    name: "Protector genital",
    price: 65.9,
    category: "Boxeo",
    image:
      "https://res.cloudinary.com/dvoakblan/image/upload/v1750188186/ProtecGenitalLegion_mchknw.png",
  },
  {
    id: 7,
    name: "Protector Bucal",
    price: 7.000,
    category: "Boxeo",
    image:  
      "https://res.cloudinary.com/dvoakblan/image/upload/v1750188186/protectorbucal_rcjdec.png"
  },
];

  // Categorizar productos
  const [filters, setFilters] = useState({
    category: 'all',
  });

  // Filtrar productos por categoría
  const filterProducts = (products) => {
    return products.filter(product => {
      return (
        filters.category === 'all' || product.category === filters.category
      )
    })
  }

  const filteredProducts = filterProducts(products);
    
  // Añadir producto al carrito
  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(item => item.id === product.id);
      
      if (existingProduct) {
        return currentCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  // Eliminar producto del carrito
  const removeFromCart = (productId) => {
    setCart((currentCart) => currentCart.filter(item => item.id !== productId));
  };

  // Actualizar cantidad de producto
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      return removeFromCart(productId);
    }
    
    setCart((currentCart) =>
      currentCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Componente para la página de inicio
  const HomePage = () => (
    <>
      <h1 className="main-title">Productos Destacados</h1>
      <ProductList products={filteredProducts} addToCart={addToCart} />
    </>
  );

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar 
          cartItems={cart.length} 
          onChange={setFilters}
        />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<Administrador />} />
            <Route path="/product-controller" element={<ProductController />} />
            <Route path="/cart" element={
              <Cart 
                cartItems={cart} 
                removeFromCart={removeFromCart} 
                updateQuantity={updateQuantity}
                onContinueShopping={() => <Navigate to="/" />}
              />
            } />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;