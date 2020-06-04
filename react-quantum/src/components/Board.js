import React from 'react';

import Tile from './Tile.js'
// Props: board

class Board extends React.Component {
  render() {
    return this.props.board.tiles.flat().map((tile)=> (
      <Tile 
        key={tile.tileID}
        tile={tile}
      />
    ));
  }
}

export default Board;
