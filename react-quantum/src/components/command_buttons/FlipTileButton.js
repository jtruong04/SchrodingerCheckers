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
  constructor(props) {
    super(props)
    this.changeStateRequestTile = this.changeStateRequestTile.bind(this);
    this.receiveTile = this.receiveTile.bind(this);
    this.links = props.state.gameBoard.links;
  }

  changeStateRequestTile(e) {
    let newBoard = this.props.state.gameBoard;
    newBoard.tiles.flat().forEach((tile) => {
      tile.onClickCallback = this.receiveTile.bind(this);
    });
    this.props.setState({ gameBoard: newBoard });
  }

  receiveTile(tile) {
    let setOfFlippedTiles =  this.computeFlippedTiles(tile.tileID, new Set());
    this.createCommand(setOfFlippedTiles);
  }

  computeFlippedTiles(tileID, alreadySearchedTiles){
    let searchedTiles = alreadySearchedTiles;
    searchedTiles.add(tileID);
    this.links.get(tileID).forEach((tile) => {
      if(!searchedTiles.has(tile)) {
        searchedTiles = new Set(searchedTiles, this.computeFlippedTiles(tile, searchedTiles))
      }
    })
    // console.log(tileID, searchedTiles);
    return searchedTiles;
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
