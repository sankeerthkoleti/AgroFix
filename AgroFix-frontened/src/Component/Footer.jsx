import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-success text-white pt-5 pb-3">
      <div className="container">
        <div className="row">
          {/* About Section */}
          <div className="col-md-4 mb-3">
            <h5>About Bounty Basket</h5>
            <p>
              Connecting local farmers with bulk buyers. Fresh produce delivered
              directly to your doorstep.
            </p>
          </div>

        
          <div className="col-md-4 mb-3">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>
                <span className="me-2">📞</span>+1 (555) 123-4567
              </li>
              <li>
                <span className="me-2">✉️</span>hello@bountybasket.com
              </li>
              <li>
                <span className="me-2">📍</span>123 Farm Lane, Harvest City
              </li>
            </ul>
          </div>

     
          <div className="col-md-4 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#products" className="text-white text-decoration-none">Products</a></li>
              <li><a href="#place-order" className="text-white text-decoration-none">Place Order</a></li>
              <li><a href="#track-order" className="text-white text-decoration-none">Track Order</a></li>
              <li><a href="#admin" className="text-white text-decoration-none">Admin Dashboard</a></li>
            </ul>
          </div>
        </div>

        <hr className="border-light" />

      
        <div className="text-center">
          <p className="mb-1">Made with <span style={{ color: 'red' }}>♥</span> by Bounty Basket</p>
          <small>© 2025 Bounty Basket. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
