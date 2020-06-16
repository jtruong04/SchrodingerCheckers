import React from 'react';
import Button from '@material-ui/core/Button'

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
// this.props.cost                      : cost in action points
// this.props.disabled                  : button state

class FlipTileButton extends React.Component {
  constructor(props) {
    super(props)
    this.changeStateRequestTile = this.changeStateRequestTile.bind(this);
    this.receiveTile = this.receiveTile.bind(this);
    this.links = props.state.gameBoard.links;
  }

  changeStateRequestTile(e) {
    this.props.resetState();
    let newBoard = this.props.state.gameBoard;
    newBoard.tiles.flat().forEach((tile) => {
      tile.onClickCallback = this.receiveTile.bind(this);
    });
    this.props.setState({ gameBoard: newBoard });
  }

  receiveTile(tile) {
    let setOfFlippedTiles = this.computeFlippedTiles([tile.tileID], new Set());
    this.createCommand(setOfFlippedTiles);
  }

  computeFlippedTiles(searchQueue, searchedTiles){
    if(searchQueue.length === 0) {
      return searchedTiles;
    }
    let currentTile = searchQueue.shift();
    searchedTiles.add(currentTile);
    this.links.get(currentTile).forEach((tile) => {
      if(!searchedTiles.has(tile)) {
        searchQueue.push(tile);
      }
    })
    return this.computeFlippedTiles(searchQueue, searchedTiles);
  }

  createCommand(listOfTiles) {
    const goOn = this.props.appendToHistoryAndExecute(new FlipTilesCommand(this.props.cost, listOfTiles));
    if(goOn) {
      this.changeStateRequestTile();
    } else {
      this.props.resetState();
    }
  }

  render() {
    return <Button variant="contained" color="primary"
        disabled={this.props.disabled}
        onClick={this.changeStateRequestTile}
    >Flip Tile ({this.props.cost})</Button>;
  }
}

export default FlipTileButton;
