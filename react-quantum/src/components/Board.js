import React from 'react';

import Tile from './Tile.js'
import Link from './Link.js'

// List of props available:
// this.props.board : the game board

// TODO: Render links
class Board extends React.Component {

  renderBoard() {
    return (
      this.props.board.tiles.map((tile) => (
        <Tile
          key={tile.tileID}
          tile={tile}
          size={this.props.board.boardSize}
        />
      ))
    )
  }

  renderLinks() {
    const mapOfLinks = this.props.board.links;
    let renderedLinks = []
    
    mapOfLinks.forEach( (destList, src) => (
      destList.forEach((dest)=>(
        // console.log(src, dest, src * this.boardSize ^ 2 + dest),
        renderedLinks.push(<Link
          key={src * this.boardSize^2 + dest }
          to={dest}
          from={src}
          boardSize={this.props.board.boardSize}
          onClickCallback = {this.props.board.linksOnClickCallback}
          isButton = {this.props.board.linksIsButton}
        />)
      ))
    ))

    return renderedLinks;
  }

  render() {
    return (
      <>
      {this.renderBoard()}
      {this.renderLinks()}
      </>
    );
  }
}

export default Board;
