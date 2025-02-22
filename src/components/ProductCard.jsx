import React, { useState } from "react";

const ProductCard = ({ product, onEdit, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [editedProduct, setEditedProduct] = useState({ ...product });

  const handleEditClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveChanges = async () => {
    await onEdit(editedProduct);
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">Type: {product.type}</p>
        <p className="card-text">Brand: {product.brand}</p>
        <p className="card-text">Size: {product.size}</p>
        <p className="card-text">Color: {product.color}</p>
        <p className="card-text">Quantity: {product.quantity}</p>
        <button className="btn btn-warning me-2" onClick={handleEditClick}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(product.id)}>
          Delete
        </button>

        {/* Edit Modal */}
        {showModal && (
          <div
            className="modal"
            style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Product</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleCloseModal}
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={editedProduct.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Type</label>
                      <input
                        type="text"
                        className="form-control"
                        name="type"
                        value={editedProduct.type}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Brand</label>
                      <input
                        type="text"
                        className="form-control"
                        name="brand"
                        value={editedProduct.brand}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Size</label>
                      <input
                        type="text"
                        className="form-control"
                        name="size"
                        value={editedProduct.size}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Color</label>
                      <input
                        type="text"
                        className="form-control"
                        name="color"
                        value={editedProduct.color}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Quantity</label>
                      <input
                        type="number"
                        className="form-control"
                        name="quantity"
                        value={editedProduct.quantity}
                        onChange={handleChange}
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCloseModal}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSaveChanges}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
