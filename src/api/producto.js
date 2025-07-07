import axios from "axios";

const API_URL = "https://backecommerce-03tv.onrender.com/api"; // Asegúrate que coincida con tu backend

export const getProductos = async () => {
  const res = await axios.get(`${API_URL}/product`);
  return res.data;
};

export const createProducto = async (producto) => {
  const res = await axios.post(`${API_URL}/product`, producto);
  return res.data;
};

export const updateProducto = async (id, producto) => {
  const res = await axios.put(`${API_URL}/product/${id}`, producto);
  return res.data;
};

export const deleteProducto = async (id) => {
  const res = await axios.delete(`${API_URL}/product/${id}`);
  return res.data;
};
