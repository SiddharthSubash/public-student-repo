import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const Navigation = () => {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 576) {
        setExpanded(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Navbar
      bg="light"
      expand="sm"
      expanded={expanded}
      fixed="top"
      className="justify-content-center"
    >
      <div>
        <h1>
          <Navbar.Brand>Countries Info App</Navbar.Brand>
        </h1>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/home" onClick={() => setExpanded(false)}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/list" onClick={() => setExpanded(false)}>
              Country List
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/population"
              onClick={() => setExpanded(false)}
            >
              Population Chart
            </Nav.Link>
            <Nav.Link as={Link} to="/gdp" onClick={() => setExpanded(false)}>
              GDP
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Navigation;
