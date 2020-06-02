/*

The homepage introduces the game to the player and allows them to create/join a game.

TODO: Create section explaining the rules of the game.
TODO: Code the buttons to actually create/join rooms instead of both taking us directly to /game.

*/ 
import React from "react";

import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        <Jumbotron>
          <h1>Schrodinger Checkers</h1>
          <LinkContainer to="/game">
            <Button variant="dark">Create Room</Button>
          </LinkContainer>{" "}
          <LinkContainer to="/game">
            <Button variant="dark">Join Room</Button>
          </LinkContainer>{" "}
        </Jumbotron>
      </Container>
    );
  }
}

export default Home;