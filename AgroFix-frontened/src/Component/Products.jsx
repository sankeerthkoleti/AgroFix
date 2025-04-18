import React, { useState, useEffect, useContext } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Context from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

import "./Products.css"
const ProductCatalog = () => {
  let [products, setProducts] = useState([{ name: "banana", price: 2, category: "fruit", image: "" }]);
  let [originalProductList,setOriginal] = useState([]);
  let [inputvalue,setInputvalue] = useState("");
  let [load, setLoad] = useState(true);
  const { changeSelect } = useContext(Context);
  let navigat = useNavigate();

  useEffect(() => {
    console.log("called");
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://agrofix-by9i.onrender.com/products");
        const data = await res.json();
        console.log(data);
        setLoad(false);
        setProducts(data);
        setOriginal(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  let change = (e)=>{
    console.log(e.target.value);
    setInputvalue(e.target.value);
    
    let new_list = originalProductList.filter((x) =>
        x.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setProducts(new_list);
  }
  return (
    <div className="container-fluid py-5" style={{ backgroundColor: '#f3f9f4', minHeight: '100vh' }}>
      <h1 className="fw-bold mb-4">Product Catalog</h1>

     
      <div className="row mb-4">
        <div className="col-md-10 d-flex flex-row justify-content-center col-7">
          <input
            type="text"
            className="form-control h-100 w-30 shadow-sm"
            placeholder="Search products..."
            style={{ height: '100px' }}
            onChange={change}
            value={inputvalue}
          />
        </div>
        
      </div>

      
      <div className="row g-4">
        {load ? (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
            <ClipLoader color="#36d7b7" loading={true} size={50} />
          </div>
        ) : (
          products.map((product, index) => (
            <div className="col-lg-3 col-md-6 col-12" key={index}>
              <div className="card shadow-sm border-0 h-100">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                  style={{
                    height: '150px',
                    objectFit: 'cover',
                    borderTopLeftRadius: '0.5rem',
                    borderTopRightRadius: '0.5rem',
                  }}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title fw-semibold">{product.name}</h5>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <span className="fw-bold text-success">${product.price}</span>
                    <span className="text-muted">/kg</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <span className="badge rounded-pill bg-success bg-opacity-25 text-success">
                      {product.category}
                    </span>
                    <div>
                      <button className="btn btn-outline-success btn-sm me-2">View</button>
                      <button className="btn btn-success btn-sm btn-click-animate" onClick={() => {changeSelect(product);navigat("/placeorder")}}>
                        <i className="bi bi-cart"></i> Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductCatalog;
