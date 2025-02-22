import React, { useState } from "react";
import { addProduct } from "../api/api";

const ProductForm = ({ onProductAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    brand: "",
    size: "",
    color: "",
    quantity: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addProduct(formData);
      onProductAdded();
      setFormData({
        name: "",
        type: "",
        brand: "",
        size: "",
        color: "",
        quantity: 0,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Type</label>
        <input
          type="text"
          className="form-control"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Brand</label>
        <input
          type="text"
          className="form-control"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Size</label>
        <input
          type="text"
          className="form-control"
          name="size"
          value={formData.size}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Color</label>
        <input
          type="text"
          className="form-control"
          name="color"
          value={formData.color}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Quantity</label>
        <input
          type="number"
          className="form-control"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add Product
      </button>
    </form>
  );
};

export default ProductForm;
