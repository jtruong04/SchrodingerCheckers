import React from 'react';
import Button from 'react-bootstrap/Button'

import FlipTileCommand from '../../data_entities/commands/FlipTileCommand'

class FlipTileButton extends React.Component {
  constructor() {
    super();
    this.requestTile = this.requestTile.bind(this);
  }

  computeFlippedTiles(initTileID) {
    // const listOfAllTiles = this.props.gameBoard.tiles;
    // const listOfLinks = this.props.gameBoard.links;
    let listOfFlippedTiles = [initTileID];
    // TODO: Find all flipped tiles;
    return listOfFlippedTiles;
  }

  requestTile(e) {
    let newBoard = this.props.state.gameBoard;
    newBoard.tiles.flat().forEach(tile => {
      tile.onClickCallback = this.createCommand.bind(this);
    });
    this.props.setState({ gameBoard: newBoard});
  }

  createCommand(tile) {
    this.props.appendToHistoryAndExecute(
      new FlipTileCommand(this.computeFlippedTiles(tile.tileID))
    );
    let newBoard = this.props.state.gameBoard;
    newBoard.tiles.forEach(tile => {
      tile.onClickCallback = null;
    });
    this.props.setState({ gameBoard: this.props.state.gameBoard });
  }

  render() {
    return (
      <Button onClick={this.requestTile}>Flip Tile</Button>
    );
  }

}

export default FlipTileButton;
