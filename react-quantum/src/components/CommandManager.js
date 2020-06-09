import React from 'react'
import Button from "react-bootstrap/Button";

// Import commands
import FlipTileButton from './command_buttons/FlipTileButton.js'
import CreateLinkButton from './command_buttons/CreateLinkButton.js'
import DeleteLinkButton from "./command_buttons/DeleteLinkButton.js";

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
    let newState = command.execute(this.props.state);
    this.props.setState(newState);
  }

  undo() {
    if (this.currentTime > 0) {
      this.currentTime--;
      let newState = this.history[this.currentTime].undo(this.props.state);
      this.props.setState(newState);
    } else {
      console.log("Attempting to Undo but there is no past.");
    }
  }

  redo() {
    if (this.history.length > this.currentTime) {
      let newState = this.history[this.currentTime].execute(this.props.state);
      this.props.setState(newState);
      this.currentTime++;
    } else {
      console.log("Attempting to Redo but there is no future.");
    }
  }

  render() {
    return (
      <>
        <FlipTileButton
          setState={this.props.setState}
          state={this.props.state}
          appendToHistoryAndExecute={this.addCommand}
        />
        <CreateLinkButton
          setState={this.props.setState}
          state={this.props.state}
          appendToHistoryAndExecute={this.addCommand}
        />
        <DeleteLinkButton
          setState={this.props.setState}
          state={this.props.state}
          appendToHistoryAndExecute={this.addCommand}
        />
        <Button onClick={this.undo}>Undo</Button>
        <Button onClick={this.redo}>Redo</Button>
      </>
    );
  }
}

export default CommandManager;