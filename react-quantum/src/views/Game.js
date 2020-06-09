import React from "react";

// Bootstrap Components
import {Container, Col, Row} from "react-bootstrap";

// Pure Data
import Board_Data from '../data_entities/Board_Data'
import Player_Data from '../data_entities/Player_Data'

// Components
import Board from "../components/Board.js"
// import Player from "../components/Player.js";
import CommandManager from '../components/CommandManager'

// CSS Styling
import './Game.css'

// Config
import config from '../config.json';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameBoard: new Board_Data({ boardSize: config.boardSize, randomizeTiles: false }),
      players: [
        new Player_Data({ numBoards: 3 }),
        new Player_Data({ numBoards: 3 }),
      ],
      actionPoints: config.startingActionPoints,
      currentPlayer: 0
    };
    this.setState = this.setState.bind(this); // Any functions used as callback functions need to be bound  
                                              // because JS is stupid about how 'this' is defined. You'll 
                                              // see this a bunch throughout the code.
  }

  render() {
    return (
      <Container>
        <Row>
          <Col></Col>
          <Col xs={6} className='gameBoard'>
            <Row>
              <Board 
                board = {this.state.gameBoard}
              />
            </Row>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <CommandManager 
            setState={this.setState}
            state={this.state}
          />
        </Row>
        <Row>
          <p>Current Player: {this.state.currentPlayer}</p>,
          <p>Action Points: {this.state.actionPoints}</p>
        </Row>
      </Container>
    );
  }
}

export default Game;