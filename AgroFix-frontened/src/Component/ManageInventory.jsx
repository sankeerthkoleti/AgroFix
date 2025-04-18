import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'animate.css';
import { Link } from 'react-router-dom';

const InventoryTable = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    category: 'Fruit',
    price: '',
    image: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch('https://agrofix-by9i.onrender.com/getcatalogue');
    const data = await res.json();
    setProducts(data);
  };

  const filteredProducts = products.filter(product =>
    (filter === 'All' || product.category === filter) &&
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddProduct = async () => {
    if (!newItem.name || !newItem.category || !newItem.price || !newItem.image) {
      alert('All fields including image are required!');
      return;
    }

    try {
      const res = await fetch('https://agrofix-by9i.onrender.com/addproduct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      });
      if (res.ok) {
        setShowModal(false);
        setNewItem({ name: '', category: 'Fruit', price: '', image: '' });
        fetchProducts();
      } else {
        alert('Failed to add product');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (productId) => {
    try {
      const res = await fetch(`https://agrofix-by9i.onrender.com/deleteproduct/${productId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        fetchProducts();
      } else {
        alert('Failed to delete product');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container py-4 bg-light min-vh-100">
      <div className="d-flex align-items-center mb-4">
        <Link to="/adminpage">
          <i className="bi bi-arrow-left fs-4 me-3"></i>
        </Link>
        <div>
          <h3 className="fw-bold mb-0">Inventory Management</h3>
          <p className="text-muted mb-0">Add, edit or remove products</p>
        </div>
      </div>

      <div className="row mb-4 g-2 align-items-center">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="🔍 Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option>All</option>
            <option>Fruit</option>
            <option>Vegetable</option>
          </select>
        </div>
        <div className="col-md-3 text-md-end">
          <button
            className="btn btn-success w-100 animate__animated animate__pulse"
            onClick={() => setShowModal(true)}
          >
            <i className="bi bi-plus-lg me-2"></i>Add Product
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-hover bg-white rounded shadow-sm">
          <thead className="table-light">
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Category</th>
              <th scope="col">Price</th>
              <th scope="col" className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="align-middle animate__animated animate__fadeIn">
                <td>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '6px' }}
                  />
                </td>
                <td className="fw-semibold">{product.name}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td className="text-end">
                  <button
                    className="btn btn-link text-danger animate__animated animate__fadeInUp"
                    onClick={() => handleDelete(product.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-muted py-4">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content animate__animated animate__zoomIn">
              <div className="modal-header">
                <h5 className="modal-title">Add New Product</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                />
                <select
                  className="form-select mb-2"
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                >
                  <option>Fruit</option>
                  <option>Vegetable</option>
                </select>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Price (e.g., $3.99/kg)"
                  value={newItem.price}
                  onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Image URL"
                  value={newItem.image}
                  onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleAddProduct}>Add</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryTable;
