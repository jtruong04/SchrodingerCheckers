import React from 'react';
import Button from 'react-bootstrap/Button'

import FlipTilesCommand from '../../data_entities/commands/FlipTilesCommand'

/**
 * 
 * This button when clicked first requests a tile. It does so by changing all tiles
 * to a button and giving them a callback function computeFlippedTiles. The clicked
 * tile then returns itself to the callback. computeFlippedTiles follows the link
 * graph and computes all tiles that needs to be flipped. It passes that list to
 * createCommand which creates a FlipTileCommand and passes that to the Command Manager.
 * Lastly, since it no longer needs to request a tile, it removes the callback.
 * 
 */

// List of props available:
// this.props.state                     : entire game state
// this.props.setState                  : callback function to change game state
// this.props.appendToHistoryAndExecute : callback function to commit command to history and execute

class FlipTileButton extends React.Component {
  constructor() {
    super();
    this.changeStateRequestTile = this.changeStateRequestTile.bind(this);
  }

  changeStateRequestTile(e) {
    let newBoard = this.props.state.gameBoard;
    newBoard.tiles.flat().forEach((tile) => {
      tile.onClickCallback = this.computeFlippedTiles.bind(this);
    });
    this.props.setState({ gameBoard: newBoard });
  }

  computeFlippedTiles(tile) {
    // const listOfAllTiles = this.props.gameBoard.tiles;
    // const listOfLinks = this.props.gameBoard.links;
    let listOfFlippedTiles = [tile.tileID];
    // TODO: Find all flipped tiles;
    this.createCommand(listOfFlippedTiles);
  }

  createCommand(listOfTiles) {
    this.props.appendToHistoryAndExecute(new FlipTilesCommand(listOfTiles));
    this.changeStateRemoveCallback();
  }

  changeStateRemoveCallback() {
    let newBoard = this.props.state.gameBoard;
    newBoard.tiles.forEach((tile) => {
      tile.onClickCallback = null;
    });
    this.props.setState({ gameBoard: this.props.state.gameBoard });
  }

  render() {
    return <Button onClick={this.changeStateRequestTile}>Flip Tile</Button>;
  }
}

export default FlipTileButton;
