import React from 'react';

import Tile from './Tile.js';
import Link from './Link.js';

import { makeStyles } from '@material-ui/core/styles';
import {Grid} from "@material-ui/core";
import './Board.css';

// List of props available:
// this.props.board : the game board

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    // maxWidth: '540px',
    // margin: '5px auto',
    // border: '2px solid black'
  }

}));
function Board(props) {
  const classes = useStyles();

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
    // console.log("Map:", mapOfLinks);
    mapOfLinks.forEach((dstList, src) =>
      dstList.forEach(
        (dst) => (
          renderedLinks.push(
            <Link
              key={(src * props.board.size * props.board.size) + dst}
              dst={dst}
              src={src}
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
    <div className={classes.root}>
      {renderBoard()}
      {renderLinks()}
    </div>
  );
  
}

export default Board;
