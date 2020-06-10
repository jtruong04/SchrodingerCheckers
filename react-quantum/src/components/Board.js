import React from 'react';

import Tile from './Tile.js';
import Link from './Link.js';

import Row from 'react-bootstrap/Row';

import './Board.css';

// List of props available:
// this.props.board : the game board

function Board(props) {

  const renderBoard = () => {
    return (
      props.board.tiles.map((tile) => (
        <Tile
          key={tile.tileID}
          tile={tile}
          size={props.board.size}
        />
      ))
    )
  };

  const renderLinks = () => {
    const mapOfLinks = props.board.links;
    let renderedLinks = []
    
    mapOfLinks.forEach((destList, src) =>
      destList.forEach(
        (dest) => (
          renderedLinks.push(
            <Link
              key={(src * props.board.size * props.board.size) + dest}
              to={dest}
              from={src}
              boardSize={props.board.size}
              onClickCallback={props.board.linksOnClickCallback}
              isButton={props.board.linksIsButton}
            />
          )
        )
      )
    );

    return renderedLinks;
  };

  
  return (
    <Row className='gameBoard'>
      {renderBoard()}
      {renderLinks()}
    </Row>
  );
  
}

export default Board;
