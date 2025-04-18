import React from 'react';
import { Container, Navbar, Nav, Button, Card, Row, Col } from 'react-bootstrap';
import { FaUser, FaShoppingCart, FaLeaf, FaTruck, FaThumbsUp } from 'react-icons/fa';
import {Link} from "react-router-dom"
const HomePage = () => {
  return (
    <div>
      
      <Container className="my-5">
        <div className="p-5 bg-success text-white rounded-3">
          <h1 className="fw-bold">Fresh Farm Produce,<br />Delivered Directly to You</h1>
          <p className="fs-5 mt-3">
            Order high-quality fruits and vegetables in bulk directly from local farmers.
            Perfect for restaurants, stores, and food services.
          </p>
          <div className="mt-4 d-flex gap-3">
            <Link to="/products">
                <Button variant="warning" className="fw-bold text-white">Browse Products</Button>
            </Link>
            <Link to="/placeorder">
                <Button variant="light" className="text-success fw-semibold border">Place Order</Button>
            </Link>  
          </div>
        </div>
      </Container>

   
      <Container className="mb-5">
        <h2 className="text-center fw-bold mb-4">Why Choose Bounty Basket?</h2>
        <Row className="g-4">
          <Col md={4}>
            <Card className="h-100 text-center">
              <Card.Body>
                <FaLeaf size={32} className="text-success mb-3" />
                <Card.Title>Fresh & Local</Card.Title>
                <Card.Text>
                  All our produce comes directly from local farms to ensure the highest quality.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 text-center">
              <Card.Body>
                <FaTruck size={32} className="text-success mb-3" />
                <Card.Title>Bulk Delivery</Card.Title>
                <Card.Text>
                  We specialize in bulk orders with reliable delivery for your business needs.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 text-center">
              <Card.Body>
                <FaThumbsUp size={32} className="text-success mb-3" />
                <Card.Title>Quality Guaranteed</Card.Title>
                <Card.Text>
                  We stand behind the quality of our products with a satisfaction guarantee.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
