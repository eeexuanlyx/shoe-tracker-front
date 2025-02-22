import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getProducts = async (filters = {}) => {
  try {
    const response = await axiosInstance.get("/products", {
      params: filters,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    }
    throw new Error("Failed to fetch products");
  }
};

export const addProduct = async (productData) => {
  try {
    const response = await axiosInstance.post("/products", productData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    }
    throw new Error("Failed to add product");
  }
};

export const updateProduct = async (id, updatedData) => {
  try {
    const response = await axiosInstance.put(`/products/${id}`, updatedData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    }
    throw new Error("Failed to update product");
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    }
    throw new Error("Failed to delete product");
  }
};

export const getFilterOptions = async () => {
  try {
    const response = await axiosInstance.get("/products/filters");
    return response.data;
  } catch (error) {
    console.error("Error fetching filter options:", error);
    return { types: [], brands: [], sizes: [], colors: [] };
  }
};
