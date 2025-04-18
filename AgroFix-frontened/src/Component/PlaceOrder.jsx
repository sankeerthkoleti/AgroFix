import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import Context from '../context/AppContext';
import OrderSuccess from './OrderSuccess';

const PlaceOrder = () => {
  let { select, changeSelect, setorder,deleteAllselectedItems } = useContext(Context);
  const [productsList, setProductsList] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [successpage, setsuccesspage] = useState(false);
  const [orderId, setorderId] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    setSelectedItems(Object.values(select));
  }, [select]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let data = await fetch('https://agrofix-by9i.onrender.com/products');
        let res = await data.json();
        setProductsList(res);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = (product) => {
    if (!selectedItems.find((item) => item.id === product.id)) {
      setSelectedItems([...selectedItems, product]);
    }
    
  };

  const handleRemoveProduct = (id) => {
    console.log();
    console.log();
    console.log(id);
    console.log(selectedItems);
    const updated = selectedItems.filter((item) => item.id !== id);
    console.log(updated)
    setSelectedItems(updated);
    changeSelect(updatedSelect);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrder = async () => {
    setorder(select, formData);
    let obj = {
      customername: formData.fullName,
      phoneno: formData.phone,
      email: formData.email,
      address: formData.address,
    };

    let res = await fetch('https://agrofix-by9i.onrender.com/addorder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj),
    });

    let data = await res.json();
    setorderId(data);

    obj = {
      userId: data,
      items: selectedItems,
    };

    res = await fetch('https://agrofix-by9i.onrender.com/addorderitems', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj),
    });

    await res.json();
    setsuccesspage(true);
    deleteAllselectedItems();
  };

  return (
    <>
      {successpage ? (
        <OrderSuccess name={formData.fullname} orderid={orderId.customerId} />
      ) : (
        <Container fluid className="py-5" style={{ backgroundColor: '#f4faf4' }}>
          <h2 className="mb-4 fw-bold">Place Your Bulk Order</h2>
          <Row className="d-flex flex-row justify-content-center">
            
            <Col md={5}>
            <Card className="p-4 shadow-sm" style={{ minHeight: '500px' }}>
  <h5 className="mb-3 fw-semibold">Select Products</h5>
  <div
    style={{
      maxHeight: '400px',
      overflowY: 'auto',
      paddingRight: '8px'
    }}
    className="custom-scrollbar"
  >
    {productsList.map((product) => (
      <div
        key={product.id}
        className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-3"
      >
        <div className="d-flex align-items-center">
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: 60,
              height: 60,
              objectFit: 'cover',
              borderRadius: 6
            }}
            className="me-3"
          />
          <div>
            <h6 className="mb-0">{product.name}</h6>
            <small>${product.price}/kg</small>
          </div>
        </div>
        <Button
          variant="outline-success"
          size="sm"
          onClick={() => handleAddProduct(product)}
        >
          Add
        </Button>
      </div>
    ))}
  </div>
</Card>

            </Col>

            
            <Col md={5}>
              <Card className="p-4 shadow-sm">
                <h5 className="mb-3 fw-bold">Order Summary</h5>
                {selectedItems.length === 0 ? (
                  <Alert variant="light">
                    No items in your order yet. Please select products from the list.
                  </Alert>
                ) : (
                  <ul className="list-unstyled mb-3">
                    <hr />
                    {selectedItems.map((item) => (
                      <li key={item.id} className="mb-2">
                        <div className="d-flex justify-content-between align-items-center">
                          <span>
                            {item.name} / Kg — Rs {item.price}
                          </span>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleRemoveProduct(item.id)}
                          >
                            <i className="bi bi-trash"></i>
                          </Button>
                        </div>
                      </li>
                    ))}
                    <hr />
                  </ul>
                )}

                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold">Delivery Address</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      name="address"
                      placeholder="Enter your complete delivery address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Button
                    variant="success"
                    className="w-100 fw-semibold"
                    onClick={handleOrder}
                  >
                    <FaShoppingCart className="me-2" />
                    Place Order
                  </Button>
                </Form>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default PlaceOrder;
