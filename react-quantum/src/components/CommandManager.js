import React from 'react'
import Button from "react-bootstrap/Button";

// Import commands
import FlipTileButton from './command_buttons/FlipTileButton.js'
import CreateLinkButton from './command_buttons/CreateLinkButton.js'
import DeleteLinkButton from "./command_buttons/DeleteLinkButton.js";

import config from '../config.json'
import { remove } from 'lodash';

// List of props available:
// this.props.gameState    : entire game state
// this.props.setGameState : callback function to change game state

class CommandManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      globalHistory: [],
      currentTime: 0
    }
    this.addCommand = this.addCommand.bind(this);
    this.resetGameState = this.resetGameState.bind(this);
    this.undo = this.undo.bind(this);
    this.redo = this.redo.bind(this);
    this.endTurn = this.endTurn.bind(this);
    this.execute = this.execute.bind(this);
  }

  addCommand(command) {
    let history = this.state.history;
    history = history.slice(0,this.state.currentTime);
    history.push(command);
    this.execute(command);
    this.setState({
      history: history,
      currentTime: this.state.currentTime+1
    });

    return this.props.gameState.actionPoints >= command.cost;
  }

  execute(command) {
    let newState = command.execute(this.props.gameState);
    newState.actionPoints -= command.cost;
    this.props.setGameState(newState);
    this.removeMatchingBoards();
  }

  removeMatchingBoards() {
    let newState = this.props.gameState;
    newState.players.forEach(player => {
      remove(player.targetBoards, this.props.gameState.gameBoard.isEqual);
    })
    this.props.setGameState(newState);
  }

  undo() {
    if (this.state.currentTime > 0) {
      let newState = this.state.history[this.state.currentTime-1].undo(this.props.gameState);
      newState.actionPoints += this.state.history[this.state.currentTime-1].cost;
      this.setState({ currentTime: this.state.currentTime - 1 });
      this.props.setGameState(newState);
    } else {
      console.log("Attempting to Undo but there is no past.");
    }
  }

  redo() {
    if (this.state.history.length > this.state.currentTime) {
      this.execute(this.state.history[this.state.currentTime]);
      this.setState({ currentTime: this.state.currentTime + 1 });
    } else {
      console.log("Attempting to Redo but there is no future.");
    }
  }

  endTurn() {
    this.resetGameState();
    this.props.setGameState({
      actionPoints: config.startingActionPoints,
      currentPlayer: (this.props.gameState.currentPlayer + 1)%2
    });

    let globalHistory = this.state.globalHistory;
    globalHistory.push(this.history);
    this.setState({
      globalHistory: globalHistory,
      history: [],
      currentTime: 0
    })
  }

  resetGameState() {
    let newBoard = this.props.gameState.gameBoard;
    newBoard.tiles.forEach((tile) => {
      tile.onClickCallback = null;
    });
    newBoard.linksOnClickCallback = null;
    this.props.setGameState({ gameBoard: this.props.gameState.gameBoard });
  }

  render() {
    return (
      <>
        <FlipTileButton
          disabled={config.actionCosts.FlipTile > this.props.gameState.actionPoints}
          setState={this.props.setGameState}
          state={this.props.gameState}
          appendToHistoryAndExecute={this.addCommand}
          resetState={this.resetGameState}
          cost={config.actionCosts.FlipTile}
        />
        <CreateLinkButton
          disabled={config.actionCosts.CreateLink > this.props.gameState.actionPoints}
          setState={this.props.setGameState}
          state={this.props.gameState}
          appendToHistoryAndExecute={this.addCommand}
          resetState={this.resetGameState}
          cost={config.actionCosts.CreateLink}
        />
        <DeleteLinkButton
          disabled={config.actionCosts.DeleteLink > this.props.gameState.actionPoints}
          setState={this.props.setGameState}
          state={this.props.gameState}
          appendToHistoryAndExecute={this.addCommand}
          resetState={this.resetGameState}
          cost={config.actionCosts.DeleteLink}
        />
        <Button onClick={this.undo}>Undo</Button>
        <Button onClick={this.redo}>Redo</Button>
        <Button onClick={this.endTurn}>End Turn</Button>
      </>
    );
  }
}

export default CommandManager;