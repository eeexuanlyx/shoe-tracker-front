import React, { useState, useEffect } from "react";
import {
  getProducts,
  updateProduct,
  deleteProduct,
  getFilterOptions,
} from "../../src/api/api.js";
import ProductForm from "./ProductForm.jsx";
import ProductCard from "./ProductCard.jsx";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    type: "",
    brand: "",
    size: "",
    color: "",
  });

  const [filterOptions, setFilterOptions] = useState({
    types: [],
    brands: [],
    sizes: [],
    colors: [],
  });

  const [showForm, setShowForm] = useState(false); // Toggle state for product form

  useEffect(() => {
    fetchProducts();
    fetchFilterOptions();
  }, []);

  const fetchProducts = async () => {
    try {
      const products = await getProducts(filters);
      setProducts(products);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFilterOptions = async () => {
    try {
      const options = await getFilterOptions();
      setFilterOptions({
        types: options.types.sort(), // Sort alphabetically (A-Z)
        brands: options.brands.sort(), // Sort alphabetically (A-Z)
        sizes: options.sizes.sort((a, b) => a - b), // Sort numerically (smallest to largest)
        colors: options.colors.sort(), // Sort alphabetically (A-Z)
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleEditProduct = async (updatedProduct) => {
    try {
      await updateProduct(updatedProduct.id, updatedProduct);
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 flex flex-col items-center">
      <h1 className="text-center text-4xl font-bold my-4">Shoes Tracker</h1>

      {/* Toggle Button for Adding Product */}
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-4"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Cancel" : "+ Add Product"}
      </button>

      {/* Product Form (Toggles Visibility) */}
      {showForm && (
        <ProductForm
          onClose={() => setShowForm(false)}
          onProductAdded={fetchProducts}
        />
      )}

      {/* Search and Filters */}
      <div className="bg-gray-100 max-w-2xl p-4 rounded-lg">
        <h3 className="text-lg font-semibold">Search and Filters</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-3">
          <input
            type="text"
            className="p-2 border rounded bg-gray-200 text-black"
            placeholder="Search by name"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
          />
          <select
            name="type"
            className="p-2 border rounded bg-gray-200 text-black"
            value={filters.type}
            onChange={handleFilterChange}
          >
            <option value="">Type</option>
            {filterOptions.types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <select
            name="brand"
            className="p-2 border rounded bg-gray-200 text-black"
            value={filters.brand}
            onChange={handleFilterChange}
          >
            <option value="">Brand</option>
            {filterOptions.brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
          <select
            name="size"
            className="p-2 border rounded bg-gray-200 text-black"
            value={filters.size}
            onChange={handleFilterChange}
          >
            <option value="">Size</option>
            {filterOptions.sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <select
            name="color"
            className="p-2 border rounded bg-gray-200 text-black"
            value={filters.color}
            onChange={handleFilterChange}
          >
            <option value="">Color</option>
            {filterOptions.colors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
          <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={() => {
              setFilters({
                search: "",
                type: "",
                brand: "",
                size: "",
                color: "",
              });
              fetchProducts();
            }}
          >
            Clear
          </button>
        </div>
        <button
          className="mt-3 bg-blue-500 text-white p-2 rounded"
          onClick={fetchProducts}
        >
          Search
        </button>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
