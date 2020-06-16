import React from "react";

import {Grid} from "@material-ui/core";
// Pure Data
import Board_Data from '../data_entities/Board_Data'
import Player_Data from '../data_entities/Player_Data'

// Components
import Board from "../gameComponents/Board.js"
import Player from "../gameComponents/Player.js";
import CommandManager from '../gameComponents/CommandManager'

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
      <>
       <Grid container spacing={3} >
          <Grid item xs={2} ></Grid>
          <Player player={this.state.players[1]} />
          <Grid item xs={2} ></Grid>
      </Grid>
        <Grid container spacing={3} >
          <Grid item xs ></Grid>
          <Grid item xs={6} zeroMinWidth noWrap>
            <Board board = {this.state.gameBoard} />
          </Grid>
          <Grid item xs></Grid>
        </Grid>
        <Grid container spacing={3} >
          <Grid item xs={2} ></Grid>
          <Player player={this.state.players[0]} />
          <Grid item xs={2} ></Grid>
        </Grid>
        <Grid container spacing={3} >
          <Grid item xs={2} ></Grid>
            <CommandManager 
              setGameState={this.setState}
              gameState={this.state}
            />
          <Grid item xs={2} ></Grid>
        </Grid>

      </>
      // <Container>
      //   <Row>
      //     <Col></Col>
      //     <Col></Col>
      //   </Row>
      //   <Row>
      //     <Col></Col>
      //     <Col xs={6}>
      //         <Board 
      //           board = {this.state.gameBoard}
      //         />
      //     </Col>
      //     <Col></Col>
      //   </Row>
      //   <Row>
      //     <Col></Col>
      //     <Player player={this.state.players[0]} />
      //     <Col></Col>
      //   </Row>
      //   <Row>
      //     <CommandManager 
      //       setGameState={this.setState}
      //       gameState={this.state}
      //     />
      //   </Row>
      //   <Row>
      //     <p>Current Player: {this.state.currentPlayer}</p>,
      //     <p>Action Points: {this.state.actionPoints}</p>
      //   </Row>
      // </Container>
    );
  }
}

export default Game;