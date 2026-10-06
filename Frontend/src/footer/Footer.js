import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        {/* About */}
        <div className="footer-section">
          <h3>Student Registration</h3>
          <p>
            A simple and reliable system for managing student registration and
            academic information.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <a href="#registration">Registration</a>
          <a href="#update">Update Student</a>
          <a href="#information">Student Information</a>
        </div>

        {/* Services */}
        <div className="footer-section">
          <h3>System</h3>
          <a href="#registration">Register Student</a>
          <a href="#update">Update Information</a>
          <a href="#information">View Students</a>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: yosefzeyede12@gmail.com</p>
          <p>Phone: +251 963691452</p>
          <p>Ethiopia</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy;{new Date().getFullYear()} Student Registration System. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
