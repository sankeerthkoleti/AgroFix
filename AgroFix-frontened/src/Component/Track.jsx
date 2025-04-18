import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [allOrders, setAllOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const result = await fetch('http://localhost:3000/getorderdetails');
        const data = await result.json();
        setAllOrders(data);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      }
    };
    fetchOrders();
  }, []);

  const handleTrack = async () => {
    const match = allOrders.find((order) => order.id == orderId.replace('ORD-', ''));
    if (match) {
      setSelectedOrder(match);
      try {
        const res = await fetch(`http://localhost:3000/getitems/${match.id}`);
        const itemData = await res.json();
        setOrderItems(itemData);
      } catch (err) {
        console.error('Failed to fetch items:', err);
        setOrderItems([]);
      }
    } else {
      setSelectedOrder(null);
      setOrderItems([]);
      alert('Order not found!');
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      Delivered: { color: 'success', icon: 'check-circle' },
      'Packing Done': { color: 'primary', icon: 'box-seam' },
      Cancelled: { color: 'danger', icon: 'x-circle' },
      Pending: { color: 'warning', icon: 'clock' },
    };
    const { color, icon } = statusMap[status] || { color: 'secondary', icon: 'question-circle' };
    return (
      <span className={`badge rounded-pill bg-${color} d-flex align-items-center px-3 py-2`}>
        <i className={`bi bi-${icon} me-2`}></i> {status}
      </span>
    );
  };

  return (
    <div className="bg-light min-vh-100 py-5 px-4">
      <h2 className="fw-bold mb-4 text-dark">Track Your Order</h2>
      <div className="row g-4 d-flex flex-row justify-content-center">
       
        <div className="col-md-6">
          <div className="bg-white rounded shadow-sm p-4">
            <h5 className="mb-2 fw-semibold">Track by Order ID</h5>
            <p className="text-muted small mb-3">Enter your order ID to check its current status.</p>
            <div className="input-group mb-4">
              <input
                type="text"
                className="form-control"
                placeholder="just for example use 33 or 34(Refer database if needed)"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
              />
              <button className="btn btn-success" onClick={handleTrack}>
                Track
              </button>
            </div>

            {selectedOrder && (
              <div className="border rounded p-3 bg-light-subtle">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <h5 className="fw-bold mb-1">ORD-{selectedOrder.id}</h5>
                    <p className="text-muted small mb-0">
                      Placed on {new Date(selectedOrder.timestamp).toLocaleString()}
                    </p>
                  </div>
                  {getStatusBadge(selectedOrder.status)}
                </div>

                <hr />

                <div>
                  <h6 className="fw-semibold"><i className="bi bi-box-seam me-2"></i>Order Details</h6>
                  <p className="mb-2">
                    {orderItems.length} item(s) • RS {orderItems.reduce((acc, i) => acc + parseFloat(i.itemprice.replace('$', '')), 0).toFixed(2)}
                  </p>

                  <h6 className="fw-semibold"><i className="bi bi-geo-alt me-2"></i>Delivery Address</h6>
                  <p>{selectedOrder.address}</p>

                  <h6 className="fw-semibold">Order Items</h6>
                  {orderItems.length > 0 ? orderItems.map((item, idx) => (
                    <div className="d-flex justify-content-between mb-1" key={idx}>
                      <span>
                        {item.itemname}{' '}
                        <small className="text-muted">1 × {item.itemprice}/kg</small>
                      </span>
                      <span className="fw-semibold">RS {item.itemprice}</span>
                    </div>
                  )) : <p className="text-muted">No items found.</p>}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
