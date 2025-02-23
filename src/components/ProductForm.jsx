import React, { useState } from "react";
import { addProduct } from "../api/api";

const ProductForm = ({ onProductAdded }) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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

  const handleError = (error) => {
    setErrorMessage("Failed to add product. Please try again.");
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addProduct(formData);
      onProductAdded();
      setSuccessMessage("Product added successfully");
      setErrorMessage("");
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
      handleError(error);
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md w-full max-w-xl mb-8">
      <h3 className="text-lg font-semibold mb-4">Add Product</h3>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded bg-gray-200 text-black"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Type
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded bg-gray-200 text-black"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Brand
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded bg-gray-200 text-black"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Size
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded bg-gray-200 text-black"
            name="size"
            value={formData.size}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Color
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded bg-gray-200 text-black"
            name="color"
            value={formData.color}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            className="w-full p-2 border rounded bg-gray-200 text-black"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            onInput={handleChange}
            required
          />
        </div>
        <div className="md:col-span-2 flex justify-end ">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg"
          >
            Add Product
          </button>
        </div>
        {/*  Success Message */}
        {successMessage && (
          <div className="text-sm text-green-500 mb-4">{successMessage}</div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="text-sm text-red-500 mb-4">{errorMessage}</div>
        )}
      </form>
    </div>
  );
};

export default ProductForm;
