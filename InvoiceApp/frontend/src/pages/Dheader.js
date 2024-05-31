import React from "react";
import Logo from "../header/logo.jpg";
import "./Invoice/Dheader.css";

function DHeader() {
  return (
    <div className="header-container">
    <div className="header-content">
      <div className="header-logo">
        <img src={Logo} alt="logo" />
      </div>
      <div className="header-text">
        <h1 className="heading">Dashboard</h1>
        <p className="subheading">Empowering Your Business Processes</p>
      </div>
    </div>
  </div>
  );
}

export default DHeader;
