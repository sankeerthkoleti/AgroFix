import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import 'animate.css';
import Context from '../context/AppContext';

const initialOrders = [
  {
    id: "ORD-797332",
    date: "April 18, 2025 at 12:19 AM",
    status: "Delivered",
    amount: "$4.99",
    items: 1,
    customer: "Sai varshith Gade",
    address: "Hyderabad, India",
    payment: "Paid via UPI",
  },
  {
    id: "ORD-579298",
    date: "April 17, 2025 at 05:52 PM",
    status: "Pending",
    amount: "$3.49",
    items: 1,
    customer: "Sai varshith Gade",
    address: "Hyderabad, India",
    payment: "COD",
  },
];

const OrderDetails = ({ order }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(`http://localhost:3000/getItems/${order.id}`);
        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.error("Failed to fetch order items:", error);
      }
    };
    fetchItems();
  }, [order.id]);

  return (
    <div className="card mt-3 p-3 animate__animated animate__fadeInDown">
      <h5 className="mb-3">CUSTOMER INFORMATION</h5>
      <div className="row mb-3">
        <div className="col-md-4">
          <strong>Name</strong>
          <p className="mb-0">{order.customername}</p>
        </div>
        <div className="col-md-4">
          <strong>Email</strong>
          <p className="mb-0">{order.email}</p>
        </div>
        <div className="col-md-4">
          <strong>Phone</strong>
          <p className="mb-0">{order.phoneno}</p>
        </div>
      </div>
      <h6>DELIVERY ADDRESS</h6>
      <p>{order.address}</p>
      <h6>ORDER ITEMS</h6>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Product</th>
            <th>Unit Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx}>
              <td>{item.itemname}</td>
              <td>{item.itemprice} RS / kg</td>
              <td>1</td>
              <td>Rs {(item.itemprice * 1).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-end">
        <strong>
          Total : RS {items.reduce((sum, item) => sum + item.itemprice * 1, 0).toFixed(2)}
        </strong>
      </div>
    </div>
  );
};

const OrderList = () => {
  let { customerOrders } = useContext(Context);
  const [expandedId, setExpandedId] = useState(null);
  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    setOrders(customerOrders);
  }, [customerOrders]);

  const toggleDetails = (id) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      console.log(id,newStatus);
      const res = await fetch(`http://localhost:3000/updateStatus`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });

      if (!res.ok) throw new Error('Failed to update status');

      setOrders(prev =>
        prev.map(order =>
          order.id === id ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getBadgeClass = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-success';
      case 'Pending': return 'bg-warning text-dark';
      case 'Packing done': return 'bg-primary';
      case 'Cancelled': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered': return 'bi-check-circle';
      case 'Pending': return 'bi-clock';
      case 'Packing done': return 'bi-box';
      case 'Cancelled': return 'bi-x-circle';
      default: return 'bi-question-circle';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id === searchTerm || searchTerm === "";
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center mb-3">
        <Link to="/adminpage" className="text-decoration-none me-3">
          <i className="bi bi-arrow-left fs-4 text-dark"></i>
        </Link>
        <h3 className="fw-bold mb-0">Order Management</h3>
      </div>
      <p className="text-muted mb-4">View and manage all orders</p>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by order ID or customer..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="form-select ms-2"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All</option>
          <option>Pending</option>
          <option>Packing done</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>
      </div>

      {filteredOrders.map((order) => (
        <div key={order.id} className="card shadow-sm mb-3 animate__animated animate__fadeIn">
          <div className="card-body d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <i className="bi bi-eye-fill me-3 text-success fs-4"></i>
              <div>
                <div className="fw-semibold">ORD_{order.id}</div>
                <div className="text-muted small">{order.date}</div>
              </div>
            </div>
            <div className="d-none d-md-flex gap-3 align-items-center">
              <span className={`badge ${getBadgeClass(order.status)}`}>
                <i className={`bi ${getStatusIcon(order.status)} me-1`}></i>
                {order.status}
              </span>
            </div>
            <button
              className="btn btn-outline-secondary btn-sm animate__animated animate__pulse"
              onClick={() => toggleDetails(order.id)}
            >
              <i className={`bi ${expandedId === order.id ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
            </button>
          </div>

          {expandedId === order.id && (
            <>
              <div className="card-footer animate__animated">
                <div className="d-flex align-items-center gap-2">
                  <strong>Status:</strong>
                  <select
                    className="form-select w-auto"
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  >
                    <option>Pending</option>
                    <option>Packing done</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </div>
              </div>
              <OrderDetails order={order} />
            </>
          )}
        </div>
      ))}

      {filteredOrders.length === 0 && (
        <p className="text-center text-muted mt-4">No orders found.</p>
      )}
    </div>
  );
};

export default OrderList;
