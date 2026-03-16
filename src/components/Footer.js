import React from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Store</h3>
            <p>Your trusted online shopping destination for quality products at great prices.</p>
          </div>
          
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#products">Products</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Customer Service</h3>
            <ul>
              <li><a href="#shipping">Shipping Info</a></li>
              <li><a href="#returns">Returns</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms & Conditions</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>Email: support@store.com</p>
            <p>Phone: 1-800-STORE-01</p>
            <p>Address: 123 Market Street, Commerce City, CC 12345</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} Store App. All rights reserved.</p>
          <div className="social-links">
            <a href="#facebook" title="Facebook" className="social-facebook">f</a>
            <a href="#twitter" title="Twitter" className="social-twitter">𝕏</a>
            <a href="#instagram" title="Instagram" className="social-instagram">◉</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
