import { useEffect, useState } from "react";
import { getProduct } from "../api/product";
import { getProductos } from "../api/producto";

const [productos, setProductos] = useState([]);

const fetchProductos = async () => {
  try {
    const data = await getProductos();
    setProductos(data);
  } catch (error) {
    console.error("Error al obtener productos", error);
  }
};

export const useProductos = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

const getProductos = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getProduct();
      setData(response.data);
    } catch (error) {
      setError(error?.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductos();
    fetchProductos();
  }, []);

  return { data, loading, error, getProductos };
};