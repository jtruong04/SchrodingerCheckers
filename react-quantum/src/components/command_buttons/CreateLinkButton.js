import React from 'react';
import Button from 'react-bootstrap/Button'

import CreateLinkCommand from '../../data_entities/commands/CreateLinkCommand'
import {indexMapper1to2, indexMapper2to1} from '../../helper/indexMapper'

/**
 * This button when clicked first requests a tile. It does so by changing all tiles
 * to a button and giving them a callback function changeStateRequestAdjacentTile. 
 * The clicked tile then returns itself to the callback. It then asks for a second 
 * tile adjacent to the first.
 */

// List of props available:
// this.props.state                     : entire game state
// this.props.setState                  : callback function to change game state
// this.props.appendToHistoryAndExecute : callback function to commit command to history and execute
// this.props.resetState                : callback to remove all request stylings
// this.props.cost                      : cost in action points
// this.props.disabled                  : button state

class CreateLinkButton extends React.Component {
    constructor() {
        super();
        this.changeStateRequestTile = this.changeStateRequestTile.bind(this);
        this.changeStateRequestAdjacentTile = this.changeStateRequestAdjacentTile.bind(this);
        this.receiveDestination = this.receiveDestination.bind(this);
        this.src = null;
        this.dst = null;
    }

    changeStateRequestTile(e) {
        this.props.resetState();
        let newBoard = this.props.state.gameBoard;
        newBoard.tiles.flat().forEach((tile) => {
            tile.onClickCallback = this.changeStateRequestAdjacentTile;
        });
        this.props.setState({ gameBoard: newBoard });
    }

    changeStateRequestAdjacentTile(tile) {
        let newBoard = this.props.state.gameBoard;
        this.src = tile.tileID;
        const size = this.props.state.gameBoard.size;
        newBoard.tiles.forEach((tile) => {
          tile.onClickCallback = null;
        });
        const [row, col] = indexMapper1to2(this.src, size);
        let adjacentTiles = [];
        if( row > 0 ) {
            adjacentTiles.push(indexMapper2to1(row-1, col, size));
        }
        if (row < size - 1) {
            adjacentTiles.push(indexMapper2to1(row+1, col, size));
        }
        if (col > 0) {
            adjacentTiles.push(indexMapper2to1(row, col-1, size));
        }
        if (col < size - 1) {
            adjacentTiles.push(indexMapper2to1(row, col+1, size));
        }
        adjacentTiles.forEach((adjTileID) => {
            newBoard.tiles[adjTileID].onClickCallback = this.receiveDestination;
        });
        this.props.setState({ gameBoard: newBoard });       
    }

    receiveDestination(tile) {
        this.dst = tile.tileID;
        this.createCommand();
    }

    createCommand() {
        this.props.appendToHistoryAndExecute(new CreateLinkCommand(this.props.cost, this.src, this.dst));
        this.props.resetState();
    }

    render() {
        return <Button
                disabled={this.props.disabled}
                onClick={this.changeStateRequestTile}
            >Create Link ({this.props.cost})</Button>;
    }
}

export default CreateLinkButton;
