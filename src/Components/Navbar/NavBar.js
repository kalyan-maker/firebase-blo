import React from "react";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import "./Navbar.css";

const Links = [
  {
    label: "Home",
    route: "/home",
  },
  {
    label: "About",
    route: "/about",
  },
  {
    label: "login/register",
    route: "/login",
  },
];

const userlinks = [
  {
    label: "Home",
    route: "/home",
  },
  {
    label: "About",
    route: "/about",
  },
  {
    label: "createpost",
    route: "/create-post",
  },
];

export default function NavBar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      logout();
      navigate("/");
      alert("successfully logout");
    } catch (err) {
      console.log(err);
      alert("error occured unable to login");
    }
  }
  return (
    <Navbar bg="" expand="lg" className="navbaritem">
      <Container>
        <Nav.Link as={Link} to="/" className="text-decoration-none blog">
          {"{ Blog }"}
        </Nav.Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {currentUser ? (
            <>
              <Nav className="mx-auto">
                {userlinks.map((links) => (
                  <Nav.Link
                    key={links.label}
                    as={Link}
                    to={links.route}
                    className="links"
                  >
                    {links.label}
                  </Nav.Link>
                ))}
                <Dropdown style={{ marginLeft: "20px" }}>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <img
                      src={currentUser.PhotoURL}
                      alt={currentUser.displayName}
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/profile">
                      Profile
                    </Dropdown.Item>
                    <div className="line-1">
                      <hr className="line-l" />
                    </div>
                    <Dropdown.Item onClick={submit}>LogOut</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav>
            </>
          ) : (
            <>
              <Nav className="mx-auto">
                {Links.map((links) => (
                  <Nav.Link
                    key={links.label}
                    as={Link}
                    to={links.route}
                    className="links"
                  >
                    {links.label}
                  </Nav.Link>
                ))}
              </Nav>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
