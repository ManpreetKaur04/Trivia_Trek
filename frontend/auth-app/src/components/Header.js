import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';  

function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');  

  const handleLogout = () => {
    localStorage.removeItem('token');  
    navigate('/');  
  };

  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="sm">
        <Container>
          <Navbar.Brand as={Link} to="/">Trivia Trek</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/auth/register">
                Register
              </Nav.Link>
              <Nav.Link as={Link} to="/">
                About
              </Nav.Link>
              {token ? (
                <Nav.Link as="button" onClick={handleLogout} className="btn btn-outline-danger">
                  Logout
                </Nav.Link>
              ) : (
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
