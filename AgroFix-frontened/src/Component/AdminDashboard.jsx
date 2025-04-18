import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Context from "../context/AppContext";

const AdminDashboard = () => {
  const { setcustomerOrders } = useContext(Context);
  const navi = useNavigate();
  const [orders, setOrders] = useState([]);

  const navigate = () => navi("/inventory");
  const navigatetoorders = () => navi("/vieworders");

  useEffect(() => {
    const call = async () => {
      const result = await fetch("http://localhost:3000/getorderdetails");
      const data = await result.json();
      setOrders(data);
      setcustomerOrders(data);
    };
    call();
  }, []);

  const totalOrders = orders.length;
  const pending = orders.filter(order => order.status.toLowerCase() === "pending").length;
  const inProgress = orders.filter(order => order.status.toLowerCase() === "packing done").length;
  const delivered = orders.filter(order => order.status.toLowerCase() === "delivered").length;

  const dashboardCards = [
    { title: "Total Orders", value: totalOrders, icon: "bi-bag" },
    { title: "Pending", value: pending, icon: "bi-clock" },
    { title: "In Progress", value: inProgress, icon: "bi-truck" },
    { title: "Delivered", value: delivered, icon: "bi-check-circle" },
  ];

  return (
    <div className="container my-4">
      <h2 className="fw-bold">Admin Dashboard</h2>
      <p className="text-muted">Overview of orders and inventory</p>

      <div className="row text-center mb-4">
        {dashboardCards.map((card, idx) => (
          <div className="col-md-3 col-sm-6 mb-3" key={idx}>
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="mb-1 text-muted">{card.title}</h6>
                  <i className={`bi ${card.icon} fs-4 text-success`}></i>
                </div>
                <h3>{card.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row mb-4">
        <div className="col-lg-8 mb-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h5>Latest Orders</h5>
                <Link to="/vieworders" className="btn btn-link text-success">View All</Link>
              </div>
              <table className="table mt-3">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Email</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, idx) => (
                    <tr key={idx}>
                      <td className="fw-bold text-success">ORD_{order.id}</td>
                      <td>{order.customername}</td>
                      <td>{order.email}</td>
                      <td>
                        <span className={`badge ${getBadgeClass(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td colSpan="4" className="text-center text-muted py-4">
                        No orders found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-lg-4 mb-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5>Quick Actions</h5>
              <button className="btn btn-outline-success w-100 mt-2" onClick={navigate}>
                <i className="bi bi-bag-check me-2"></i>Manage Inventory
              </button>
              <button className="btn btn-outline-success w-100 mt-2" onClick={navigatetoorders}>
                <i className="bi bi-bag-check me-2"></i>Manage Orders
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const getBadgeClass = (status) => {
  const st = status.toLowerCase();
  if (st === "packing done") return "bg-warning text-dark";
  if (st === "pending") return "bg-info text-dark";
  if (st === "delivered") return "bg-success";
  return "bg-danger";
};

export default AdminDashboard;
