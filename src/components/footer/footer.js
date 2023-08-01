import React from 'react';
import './footer.css';

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h4>Customer Service</h4>
          <ul>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>FAQ</li>
            <li>Shipping and Returns</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Categories</h4>
          <ul>
            <li>Thermo Boxes</li>
            <li>Containers</li>
            <li>Accessories</li>
            <li>Sale</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Follow Us</h4>
          <ul>
            <li>Facebook</li>
            <li>Instagram</li>
            <li>Twitter</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 ThermoBox. All rights reserved.</p>
      </div>
    </div>
  );
}
