import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "./logo.jpg";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const handleSignOut = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Navbar
      style={{
        backgroundColor: "#59D5E0",
        paddingTop: "20px",
        paddingBottom: "20px",
      }}
      variant="light"
      expand="lg"
      className="bg-body-tertiary"
    >
      <Container>
        <Navbar.Brand
          href="/"
          className="d-flex align-items-center"
          style={{ fontSize: "24px" }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{ marginRight: "10px", width: "50px", height: "auto" }}
          />
          Express Rupya
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse style={{ marginBottom: "0" }} id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" style={{ fontSize: "18px" }}>
              Home
            </Nav.Link>
            <Nav.Link href="/createInvoice" style={{ fontSize: "18px" }}>
              Create invoice
            </Nav.Link>
            <Nav.Link href="/dashboard" style={{ fontSize: "18px" }}>
              Dashboard
            </Nav.Link>

            <Nav.Link href="/clients" style={{ fontSize: "18px" }}>
              Clients
            </Nav.Link>
            <Nav.Link href="/lenders" style={{ fontSize: "18px" }}>
              Lenders
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <button onClick={handleSignOut}>Sign Out</button>
    </Navbar>
  );
}

export default Header;
