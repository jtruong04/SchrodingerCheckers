import React from "react";

// Bootstrap Components
import {Container, Col, Row} from "react-bootstrap";

// Pure Data
import Board_Data from '../data_entities/Board_Data'
import Player_Data from '../data_entities/Player_Data'

// Components
import Board from "../components/Board.js"
import Player from "../components/Player.js";
import CommandManager from '../components/CommandManager'

// CSS Styling
import './Game.css'

// Config
import config from '../config.json';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameBoard: new Board_Data({ size: config.boardSize, randomizeTiles: false }),
      players: [
        new Player_Data({ numBoards: config.numberTargetCards, size: config.boardSize }),
        new Player_Data({ numBoards: config.numberTargetCards, size: config.boardSize }),
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
          <Player player={this.state.players[1]} />
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col xs={6}>
              <Board 
                board = {this.state.gameBoard}
              />
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Player player={this.state.players[0]} />
          <Col></Col>
        </Row>
        <Row>
          <CommandManager 
            setGameState={this.setState}
            gameState={this.state}
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