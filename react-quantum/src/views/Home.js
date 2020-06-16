/*

The homepage introduces the game to the player and allows them to create/join a game.

TODO: Create section explaining the rules of the game.

*/ 
import React from "react";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <h1>Hello, this is the Home page</h1>;
  }
}

export default Home;