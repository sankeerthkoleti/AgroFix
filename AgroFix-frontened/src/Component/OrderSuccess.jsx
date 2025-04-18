import React from "react";
import {Link} from "react-router-dom"


const OrderSuccess = ({ name = "Sai varshith Gade", orderid = "ORD-959542" }) => {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="text-center bg-white p-5 rounded shadow">
        <div className="mb-4">
          <i className="bi bi-check-circle-fill text-success" style={{ fontSize: "3rem" }}></i>
        </div>
        <h2 className="fw-bold">Order Placed Successfully!</h2>
        <p className="mb-1">
          Thank you for your order, <strong>{name}</strong>.
        </p>
        <p>
          Your order ID is: <strong className="text-primary">{orderid}</strong>
        </p>
        <div className="d-flex justify-content-center mt-4 gap-3">
          <Link to="/track">
                <button className="btn btn-success">Track Your Order</button>
          </Link>
          <Link to="/products">
                <button className="btn btn-outline-success">Place Another Order</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
