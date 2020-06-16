import React from 'react';
import Board from './Board.js';
import {Col} from 'react-bootstrap';
import {Grid} from '@material-ui/core';
import './Player.css';
// List of props available:
// this.props.player
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex',
    // flexWrap: 'wrap',
    // maxWidth: '540px',
    margin: '0 auto',
    // border: '2px solid black'
  }
})
)

const Player = (props) => {
  const classes = useStyles();

  return props.player.targetBoards.map((board, idx)=>(
    <Grid item xs={2} className={classes.root}>
      <Board board={board} />
    </Grid> 
  ));
};

export default Player;