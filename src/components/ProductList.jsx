import React, { useState, useEffect } from "react";
import {
  getProducts,
  updateProduct,
  deleteProduct,
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

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const products = await getProducts(filters);
      setProducts(products);
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
    <div className="container">
      <h1 className="my-4">Shoes Tracker</h1>
      <ProductForm onProductAdded={fetchProducts} />

      {/* Search and Filters Form */}
      <div className="my-4">
        <h2>Search and Filters</h2>
        <form>
          <div className="row g-3">
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by name"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-md-2">
              <input
                type="text"
                className="form-control"
                placeholder="Type"
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-md-2">
              <input
                type="text"
                className="form-control"
                placeholder="Brand"
                name="brand"
                value={filters.brand}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-md-2">
              <input
                type="text"
                className="form-control"
                placeholder="Size"
                name="size"
                value={filters.size}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-md-2">
              <input
                type="text"
                className="form-control"
                placeholder="Color"
                name="color"
                value={filters.color}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-md-1">
              <button
                type="button"
                className="btn btn-secondary w-100"
                onClick={() =>
                  setFilters({
                    search: "",
                    type: "",
                    brand: "",
                    size: "",
                    color: "",
                  })
                }
              >
                Clear
              </button>
            </div>
          </div>

          {/* Search Button */}
          <div className="row mt-3">
            <div className="col-md-2">
              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={fetchProducts}
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Product List */}
      <div className="my-4">
        <h2>Products</h2>
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
