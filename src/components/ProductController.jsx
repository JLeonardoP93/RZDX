import React, { useEffect, useState } from "react";
import {
  getProductos,
  createProducto,
  updateProducto,
  deleteProducto,
} from "../api/producto";

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

  // Cargar productos al inicio
  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const data = await getProductos();
      setProductos(data);
    } catch (error) {
      console.error("Error al obtener productos", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const cleanData = {
        ...form,
        precio_uni: parseFloat(form.precio_uni),
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
      fetchProductos();

    } catch (error) {
      console.error("Error al guardar producto", error.response?.data || error.message);
      alert("Error al guardar producto");
    }
  };

  const handleEdit = (producto) => {
    setForm({
      nombre: producto.nombre,
      imagen: producto.imagen,
      precio_uni: producto.precio_uni,
      descripcion: producto.descripcion,
      stock: producto.stock,
      id_categoria: producto.id_categoria,
    });
    setEditingId(producto.id_producto);
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
    <div>
      <h2>{editingId ? "Editar Producto" : "Crear Producto"}</h2>
      <form onSubmit={handleSubmit}>
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
        <input name="imagen" placeholder="URL Imagen" value={form.imagen} onChange={handleChange} required />
        <input name="precio_uni" placeholder="Precio" type="number" value={form.precio_uni} onChange={handleChange} required />
        <input name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} required />
        <input name="stock" placeholder="Stock" type="number" value={form.stock} onChange={handleChange} required />
        <input name="id_categoria" placeholder="ID Categoría" type="number" value={form.id_categoria} onChange={handleChange} required />
        <button type="submit">{editingId ? "Actualizar" : "Crear"}</button>
        {editingId && (
          <button type="button" onClick={() => {
            setForm(initialForm);
            setEditingId(null);
          }}>
            Cancelar edición
          </button>
        )}
      </form>

      <hr />

      <h2>Listado de Productos</h2>
      {productos.map((p) => (
        <div key={p.id_producto} style={{ marginBottom: "1rem", border: "1px solid #ccc", padding: "10px" }}>
          <strong>{p.nombre}</strong> - ${p.precio_uni}
          <br />
          <img src={p.imagen} alt={p.nombre} style={{ maxWidth: "300px", maxHeight: "300px" }} />
          <br />
          <em>{p.descripcion}</em>
          <br />
          <button onClick={() => handleEdit(p)}>Editar</button>
          <button onClick={() => handleDelete(p.id_producto)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}

export default ProductController;

