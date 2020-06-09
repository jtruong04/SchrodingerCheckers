import React from 'react';

import Tile from './Tile.js';
import Link from './Link.js';

import Row from 'react-bootstrap/Row';

import './Board.css';
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
          size={this.props.board.size}
        />
      ))
    )
  }

  renderLinks() {
    const mapOfLinks = this.props.board.links;
    let renderedLinks = []
    
    mapOfLinks.forEach((destList, src) =>
      destList.forEach(
        (dest) => (
          renderedLinks.push(
            <Link
              key={(src * this.props.board.size * this.props.board.size) + dest}
              to={dest}
              from={src}
              boardSize={this.props.board.size}
              onClickCallback={this.props.board.linksOnClickCallback}
              isButton={this.props.board.linksIsButton}
            />
          )
        )
      )
    );

    return renderedLinks;
  }

  render() {
    return (
      <Row className='gameBoard'>
      {this.renderBoard()}
      {this.renderLinks()}
      </Row>
    );
  }
}

export default Board;
