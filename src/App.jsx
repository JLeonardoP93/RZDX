import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import About from "./components/About";
import ProductController from "./components/ProductController";
import { Home } from "./components/home";
import "./App.css";

function App() {
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
      name: "Coquilla",
      price: 65.9,
      category: "Boxeo",
      image:
        "https://res.cloudinary.com/dvoakblan/image/upload/v1750188186/ProtecGenitalLegion_mchknw.png",
    },
    {
      id: 7,
      name: "Protector Bucal",
      price: 7.0,
      category: "Boxeo",
      image:
        "https://res.cloudinary.com/dvoakblan/image/upload/v1750188186/protectorbucal_rcjdec.png",
    },
    {
      id: 8,
      name: "vendas de boxeo",
      price: 50.0,
      category: "Boxeo",
      image:
        "https://res.cloudinary.com/dmwohsz6e/image/upload/v1751875586/elite180handwrap_black_xgiiul.jpg",
    },
    {
      id: 9,
      name: "Espinilleras Venum",
      price: 250.0,
      category: "MMA",
      image:
        "https://res.cloudinary.com/dmwohsz6e/image/upload/v1751874883/71Ge-wIqvUL_m1icto.jpg",
    },
    {
      id: 10,
      name: "Cinturon UFC",
      price: 500.0,
      category: "MMA",
      image:
        "https://res.cloudinary.com/dmwohsz6e/image/upload/v1751875327/4w27bqdt_hkpmkb.jpg",
    },
    {
      id: 11,
      name: "Pera de Boxeo",
      price: 60.0,
      category: "Boxeo",
      image:
        "https://res.cloudinary.com/dmwohsz6e/image/upload/v1751875437/61GDGyA4yOL_kf0i4n.jpg",
    },
    {
      id: 12,
      name: "Casco de Boxeo",
      price: 150.0,
      category: "Boxeo",
      image:
        "https://res.cloudinary.com/dmwohsz6e/image/upload/v1751875785/everlast-everfresh-boxing-headgear-black-1_vcdobs.jpg",
    },
    {
      id: 13,
      name: "Shorts Ilia Topuria",
      price: 50.0,
      category: "MMA",
      image:
        "https://res.cloudinary.com/dmwohsz6e/image/upload/v1751873911/Captura_de_pantalla_2025-07-07_023808_pw9jga.png",
    },
  ];

  // Categorizar productos
  const [filters, setFilters] = useState({
    category: "all",
  });

  // Filtrar productos por categoría
  const filterProducts = (products) => {
    return products.filter((product) => {
      return (
        filters.category === "all" || product.category === filters.category
      );
    });
  };

  const filteredProducts = filterProducts(products);

  // Añadir producto al carrito
  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return currentCart.map((item) =>
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
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId)
    );
  };

  // Actualizar cantidad de producto
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      return removeFromCart(productId);
    }

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Limpiar carrito completo
  const clearCart = () => {
    setCart([]);
  };

  // Componente para la página de productos
  const ProductsPage = () => (
    <>
      <h1 className="main-title">Productos Destacados</h1>
      <ProductList products={filteredProducts} addToCart={addToCart} />
    </>
  );

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar cartItems={cart.length} onChange={setFilters} />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/product-controller" element={<ProductController />} />
            <Route
              path="/cart"
              element={
                <Cart
                  cartItems={cart}
                  removeFromCart={removeFromCart}
                  updateQuantity={updateQuantity}
                  clearCart={clearCart}
                  onContinueShopping={() => <Navigate to="/" />}
                />
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
