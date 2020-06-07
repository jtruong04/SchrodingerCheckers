import React from 'react';

import Tile from './Tile.js'

// List of props available:
// this.props.board : the game board

// TODO: Render links
class Board extends React.Component {
  render() {
    return this.props.board.tiles.map((tile)=> (
      <Tile 
        key={tile.tileID}
        tile={tile}
      />
    ));
  }
}

export default Board;
