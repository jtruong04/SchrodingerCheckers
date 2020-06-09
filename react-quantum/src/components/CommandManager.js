import React from 'react'
import Button from "react-bootstrap/Button";

// Import commands
import FlipTileButton from './command_buttons/FlipTileButton.js'
import CreateLinkButton from './command_buttons/CreateLinkButton.js'
import DeleteLinkButton from "./command_buttons/DeleteLinkButton.js";

import config from '../config.json'
import { remove } from 'lodash';
// List of props available:
// this.props.state    : entire game state
// this.props.setState : callback function to change game state

class CommandManager extends React.Component {
  constructor(props) {
    super(props);
    this.history = [];
    this.addCommand = this.addCommand.bind(this);
    this.undo = this.undo.bind(this);
    this.redo = this.redo.bind(this);
    this.endTurn = this.endTurn.bind(this);
    this.execute = this.execute.bind(this);
    this.currentTime = 0;
  }

  addCommand(command) {
    this.history = this.history.slice(0,this.currentTime);
    this.history.push(command);
    this.execute(command);
    this.currentTime++;
  }

  execute(command) {
    // console.log(command.cost);
    let newState = command.execute(this.props.state);
    newState.actionPoints -= command.cost;
    this.props.setState(newState);
    this.removeMatchingBoards();
  }

  removeMatchingBoards() {
    let newState = this.props.state;
    newState.players.forEach(player => {
      remove(player.targetBoards, this.props.state.gameBoard.isEqual);
    })
    this.props.setState(newState);
  }

  undo() {
    if (this.currentTime > 0) {
      this.currentTime--;
      let newState = this.history[this.currentTime].undo(this.props.state);
      newState.actionPoints += this.history[this.currentTime].cost;
      this.props.setState(newState);
    } else {
      console.log("Attempting to Undo but there is no past.");
    }
  }

  redo() {
    if (this.history.length > this.currentTime) {
      this.execute(this.history[this.currentTime]);
      // let newState = this.history[this.currentTime].execute(this.props.state);
      // newState.actionPoints -= this.history[this.currentTime].cost;
      // this.props.setState(newState);
      this.currentTime++;
    } else {
      console.log("Attempting to Redo but there is no future.");
    }
  }

  endTurn() {
    let turnState = this.props.state;
    turnState.actionPoints = config.startingActionPoints;
    turnState.currentPlayer = (turnState.currentPlayer + 1)%2;
    this.props.setState(turnState);
  }

  render() {
    // console.log(config.actionCosts.FlipTile > this.props.state.actionPoints);
    return (
      <>
        <FlipTileButton
          disabled={config.actionCosts.FlipTile > this.props.state.actionPoints}
          setState={this.props.setState}
          state={this.props.state}
          appendToHistoryAndExecute={this.addCommand}
          cost={config.actionCosts.FlipTile}
        />
        <CreateLinkButton
          disabled={config.actionCosts.CreateLink > this.props.state.actionPoints}
          setState={this.props.setState}
          state={this.props.state}
          appendToHistoryAndExecute={this.addCommand}
          cost={config.actionCosts.CreateLink}
        />
        <DeleteLinkButton
          disabled={config.actionCosts.DeleteLink > this.props.state.actionPoints}
          setState={this.props.setState}
          state={this.props.state}
          appendToHistoryAndExecute={this.addCommand}
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