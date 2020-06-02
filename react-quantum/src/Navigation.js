import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";


class Navigation extends React.Component {
  render() {
    return (<Navbar bg="dark" variant="dark">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand href="/">Schrodinger Checkers</Navbar.Brand>
        </LinkContainer>
        <Nav className="mr-auto">
          <LinkContainer to="/rankings">
            <Nav.Link>Rankings</Nav.Link>
          </LinkContainer>{" "}
        </Nav>
        <Nav className="ml-auto">
          <LinkContainer to="/profile">
            <Nav.Link>Profile</Nav.Link>
          </LinkContainer>{" "}
        </Nav>
      </Container>
    </Navbar>
    );
  }
}

export default Navigation;