import { Container, Nav, Navbar } from "react-bootstrap";
import { TbLogin2 } from "react-icons/tb";
import { Link } from "react-router-dom";

const UserNavbar = () => {
  return (
    <div>
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        bg="dark"
        data-bs-theme="dark"
      >
        <Container fluid>
          <Navbar.Brand href="/">XYZ Hotel</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="/contact" className="nav-link">
                Contact
              </Link>
              <Link to="/about" className="nav-link">
                About
              </Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Text>
            <Link to="/login">
              <TbLogin2 size="1.5rem" />
            </Link>
          </Navbar.Text>
        </Container>
      </Navbar>
    </div>
  );
};

export default UserNavbar;
