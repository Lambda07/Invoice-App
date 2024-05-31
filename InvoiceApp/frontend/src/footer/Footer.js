import React from "react";

const Footer = () => {
  const footerStyle = {
    backgroundColor: "#2d3748",
    color: "#edf2f7",
    padding: "0.2 rem",
    textAlign: "center",
    position: "fixed",
    bottom: 0,
    width: "100%",
  };

  const linkStyle = {
    color: "#a0aec0",
    margin: "0 0.5rem",
    textDecoration: "none",
  };

  const socialIconStyle = {
    fontSize: "1.5rem",
    color: "#a0aec0",
    margin: "0 0.5rem",
    textDecoration: "none",
  };

  return (
    <footer style={footerStyle}>
      <div>
        <p>
          &copy; {new Date().getFullYear()} Express Rupya Capital Advisors. All
          Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
