import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { FaUser, FaShoppingCart, FaLeaf } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import "./Header.css"

let Header = () => {
    let navi = useNavigate();
    let navigate = ()=>{
        navi("./adminpage");
    }
    let changePage = ()=>{
        navi("./placeorder")
    }
  return (
    <Navbar bg="light" expand="lg" className="px-4 py-2 shadow-sm h-10 pt-4 pb-4">
      <Navbar.Brand href="#" className="fw-bold text-success">
        <FaLeaf className="me-2" />
        Agrofix
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-between">
        <Nav className="mx-auto gap-4">
          <NavLink 
            to="/" 
            className={({ isActive }) =>
              `nav-link-custom ${isActive ? 'active-link' : 'text-dark'}`
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/products" 
            className={({ isActive }) =>
              `nav-link-custom   ${isActive ? 'active-link' : 'text-dark'}`
            }
          >
            Products
          </NavLink>
          <NavLink 
            to="/placeorder" 
            className={({ isActive }) =>
              `nav-link-custom ${isActive ? 'active-link' : 'text-dark'}`
            }
          >
            Place Order
          </NavLink>
          <NavLink 
            to="/track" 
            className={({ isActive }) =>
              `nav-link-custom ${isActive ? 'active-link' : 'text-dark'}`
            }
          >
            Track Order
          </NavLink>
        </Nav>

        <div className="d-flex gap-3">
          <Button variant="link" className="text-success fw-semibold text-decoration-none" onClick={navigate}>
            <FaUser className="me-1" /> Admin
          </Button>
          <Button variant="success" onClick={changePage}>
            <FaShoppingCart className="me-1" /> Order Now
          </Button>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
