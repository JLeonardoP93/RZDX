import React, { useEffect, useState } from "react";
import {
  getProductos,
  createProducto,
  updateProducto,
  deleteProducto,
} from "../api/producto";
import "./ProductController.css";

const initialForm = {
  nombre: "",
  imagen: "",
  precio_uni: "",
  descripcion: "",
  stock: "",
  id_categoria: "",
};

function ProductController() {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Función para obtener el nombre de la categoría
  const getCategoryName = (id) => {
    switch(parseInt(id)) {
      case 1: return "Boxeo";
      case 2: return "MMA";
      default: return "Sin categoría";
    }
  };

  // Cargar productos al inicio
  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const data = await getProductos();
      // Ordenar por ID descendente (más nuevos primero)
      const sortedData = data.sort((a, b) => b.id_producto - a.id_producto);
      setProductos(sortedData);
    } catch (error) {
      console.error("Error al obtener productos", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validaciones adicionales
    if (form.precio_uni <= 0) {
      alert("El precio debe ser mayor a 0");
      return;
    }
    if (form.stock < 0) {
      alert("El stock no puede ser negativo");
      return;
    }
    if (!form.imagen.startsWith('http')) {
      alert("La imagen debe ser una URL válida (http/https)");
      return;
    }
    if (!form.id_categoria || form.id_categoria === "") {
      alert("Debe seleccionar una categoría");
      return;
    }

    try {
      const cleanData = {
        nombre: form.nombre.trim(), // Limpiar espacios al guardar
        imagen: form.imagen.trim(),
        precio_uni: parseFloat(form.precio_uni),
        descripcion: form.descripcion.trim(),
        stock: parseInt(form.stock),
        id_categoria: parseInt(form.id_categoria),
      };

      if (editingId) {
        await updateProducto(editingId, cleanData);
        alert("Producto actualizado con éxito");
      } else {
        await createProducto(cleanData);
        alert("Producto creado con éxito");
      }

      setForm(initialForm);
      setEditingId(null);
      setShowModal(false);
      fetchProductos();

    } catch (error) {
      console.error("Error al guardar producto", error.response?.data || error.message);
      alert("Error al guardar producto");
    }
  };

  const handleEdit = (producto) => {
    setForm({
      nombre: producto.nombre.trim(), // Eliminar espacios
      imagen: producto.imagen.trim(),
      precio_uni: producto.precio_uni,
      descripcion: producto.descripcion.trim(),
      stock: producto.stock,
      id_categoria: producto.id_categoria,
    });
    setEditingId(producto.id_producto);
    setShowModal(true);
  };

  const handleCancelEdit = () => {
    setForm(initialForm);
    setEditingId(null);
    setShowModal(false);
  };

  const openCreateModal = () => {
    setForm(initialForm);
    setEditingId(null);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este producto?")) return;
    try {
      await deleteProducto(id);
      fetchProductos();
    } catch (error) {
      console.error("Error al eliminar producto", error);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1 className="admin-title">Administrador de Productos</h1>
        <button 
          className="create-btn-floating"
          onClick={openCreateModal}
        >
          + Crear Producto
        </button>
      </div>

      <div className="products-section">
        <h2 className="section-title">Productos Registrados ({productos.length})</h2>
        
        {productos.length === 0 ? (
          <div className="no-products">
            <p>No hay productos registrados</p>
            <p>¡Comienza creando tu primer producto!</p>
          </div>
        ) : (
          <div className="admin-product-grid">
            {productos.map((producto) => (
              <div key={producto.id_producto} className="admin-product-card">
                <div className="admin-product-image-container">
                  <img 
                    src={producto.imagen} 
                    alt={producto.nombre} 
                    className="admin-product-image"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x220/f8f9fa/666?text=Imagen+no+disponible';
                    }}
                  />
                  <div className="admin-product-stock">Stock: {producto.stock}</div>
                </div>
                
                <div className="admin-product-info">
                  <h3 className="admin-product-name">{producto.nombre}</h3>
                  <p className="admin-product-price">${producto.precio_uni}</p>
                  <p className="admin-product-description">{producto.descripcion}</p>
                  <p className="admin-product-category">Categoría: {getCategoryName(producto.id_categoria)}</p>
                </div>
                
                <div className="admin-actions">
                  <button 
                    onClick={() => handleEdit(producto)}
                    className="edit-btn"
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => handleDelete(producto.id_producto)}
                    className="delete-btn"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCancelEdit}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                {editingId ? "Editar Producto" : "Crear Nuevo Producto"}
              </h2>
              <button className="modal-close-btn" onClick={handleCancelEdit}>
                ✕
              </button>
            </div>
            
            <div className="modal-body">
              <form className="modal-form" onSubmit={handleSubmit}>
                <div className="form-grid">
                  <input 
                    name="nombre" 
                    placeholder="Nombre del producto" 
                    value={form.nombre} 
                    onChange={handleChange} 
                    required 
                    className="form-input"
                  />
                  <input 
                    name="precio_uni" 
                    placeholder="Precio" 
                    type="number" 
                    step = "1000"
                    min="0"
                    value={form.precio_uni} 
                    onChange={handleChange} 
                    required 
                    className="form-input"
                  />
                  <input 
                    name="stock" 
                    placeholder="Stock" 
                    type="number" 
                    min="0"
                    value={form.stock} 
                    onChange={handleChange} 
                    required 
                    className="form-input"
                  />
                  <select 
                    name="id_categoria" 
                    value={form.id_categoria} 
                    onChange={handleChange} 
                    required 
                    className="form-input"
                  >
                    <option value="">Seleccionar categoría</option>
                    <option value="1">Boxeo</option>
                    <option value="2">MMA</option>
                  </select>
                </div>
                <input 
                  name="imagen" 
                  placeholder="URL de la imagen (https://...)" 
                  value={form.imagen} 
                  onChange={handleChange} 
                  required 
                  className="form-input full-width"
                />
                <textarea 
                  name="descripcion" 
                  placeholder="Descripción del producto" 
                  value={form.descripcion} 
                  onChange={handleChange} 
                  required 
                  className="form-textarea"
                  rows="3"
                />
                <div className="modal-actions">
                  <button type="button" onClick={handleCancelEdit} className="cancel-btn">
                    Cancelar
                  </button>
                  <button type="submit" className="submit-btn">
                    {editingId ? "Actualizar Producto" : "Crear Producto"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductController;

