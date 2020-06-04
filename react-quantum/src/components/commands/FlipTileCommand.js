import React from 'react';
import Button from 'react-bootstrap/Button'

import Command from './Command.js'

class FlipTileCommand extends Command {
  constructor() {
    super();
    this.requestTile = this.requestTile.bind(this);
    // console.log(this.props.board.tiles.length);
  }

  requestTile(e) {
    let newBoard = this.props.board;
    console.log(newBoard);
    newBoard.tiles.flat().forEach(tile => {
      // console.log(tile.tileID);
      // tile.state=false;
      tile.onClickCallback = this.flipTile.bind(this);
    });
    console.log(newBoard);
    this.props.setState({ gameBoard: newBoard});
  }

  flipTile(tile) {
    tile.state = !tile.state;
    let newBoard = this.props.board;
    newBoard.tiles.flat().forEach(tile => {
      tile.onClickCallback = null;
    });
    this.props.setState({ gameBoard: this.props.board });
  }

  render() {
    return (
      <Button onClick={this.requestTile}>Click Here</Button>
    );
  }

}

export default FlipTileCommand;
