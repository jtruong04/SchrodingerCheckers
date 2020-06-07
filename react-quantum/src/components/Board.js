import React from 'react';

import Tile from './Tile.js'
// Props: board

class Board extends React.Component {
  render() {
    // console.log("Board props:", this.props.board.tiles)
    return this.props.board.tiles.map((tile)=> (
      <Tile 
        key={tile.tileID}
        tile={tile}
      />
    ));
  }
}

export default Board;
