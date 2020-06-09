import React from 'react';
import Board from './Board.js';
import {Col} from 'react-bootstrap';
import './Player.css';
// List of props available:
// this.props.player
class Player extends React.Component {
  // constructor() {
  //   super();
  // }

  render() {
    return this.props.player.targetBoards.map((board, idx)=>(
      <Col xs={2} className='playerBoard' key={idx}>
          <Board board={board}/>
      </Col>
    ));
  }
}

export default Player;