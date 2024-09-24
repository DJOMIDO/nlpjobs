// scr/components/Footer.tsx

import React from "react";
import "./Footer.css";
import logo from "../assets/logo.svg";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo-wrapper">
          <img src={logo} alt="logo" />
        </div>
        <p>&copy; 2024 nlp.jobs All rights reserved.</p>
        <div className="footer-links">
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-of-service">Terms of Service</a>
          <a href="/contact">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
