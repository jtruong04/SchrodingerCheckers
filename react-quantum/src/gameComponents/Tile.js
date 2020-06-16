import React from 'react';
import './Tile.css'

import { makeStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import clsx from 'clsx';
import { Paper } from '@material-ui/core';
import globalStyles from '../materialStyles';
// List of props available:
// props.tile : tile data
const useStyles = makeStyles((theme) => ({
  tile: {
    // width: '23%',
    // padding: '0 0 calc(23%) 0',
    margin: '1%',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '10%'
  },
  blackTile: {
    background: grey[900]
  },
  whiteTile: {
    background: grey[50]
  }
}));


function Tile(props) {

  const classes = useStyles();
  const globalClasses = globalStyles();

  const handleClick = (e) => {
    return props.tile.onClickCallback(props.tile);
  }

  return (
      <Paper
        elevation={3}
        className={clsx(
          classes.tile,
          props.tile.state ? classes.blackTile : classes.whiteTile,
          props.tile.onClickCallback ? globalClasses.selectableComponent : null
        )
        }
        onClick={props.tile.onClickCallback ? handleClick : null}
        style={{
          width: 100 / props.size - 2 + "%",
          padding: `0 0 calc(${100 / props.size - 2}%) 0`
        }}
      ></Paper>
    );
}

export default Tile;
