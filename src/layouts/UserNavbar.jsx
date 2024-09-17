import {
  Button,
  ButtonGroup,
  Container,
  Dropdown,
  Nav,
  Navbar,
} from "react-bootstrap";
import { TbLogin2 } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";

import { getCurrentUser, removeAll } from "../utils/session";
import { isLoggedIn } from "../utils/login";

const UserNavbar = () => {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();

  const getUserInfo = () => {
    const data = getCurrentUser();
    if (!data) return "";
    const { name } = JSON.parse(data);
    if (!name) return "";
    return name;
  };

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
            {loggedIn && getUserInfo() ? (
              <>
                <Dropdown as={ButtonGroup}>
                  <Button
                    variant="secondary"
                    onClick={() => navigate("/admin/dashboard")}
                  >
                    Welcome {getUserInfo()}
                  </Button>
                  <Dropdown.Toggle
                    split
                    variant="secondary"
                    id="dropdown-split-basic"
                  />
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => navigate("/admin/profile")}>
                      My Profile
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => navigate("/admin/orders")}>
                      My Orders
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      onClick={() => {
                        removeAll();
                        navigate("/");
                      }}
                    >
                      Log Out
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <Link to="/login">
                <TbLogin2 size="1.5rem" />
              </Link>
            )}
          </Navbar.Text>
        </Container>
      </Navbar>
    </div>
  );
};

export default UserNavbar;
