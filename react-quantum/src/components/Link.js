import React from 'react';
// import Button from 'react-bootstrap/Button';
// FontAwesome Characters
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLongArrowAltDown,
  faLongArrowAltUp,
  faLongArrowAltLeft,
  faLongArrowAltRight
} from "@fortawesome/free-solid-svg-icons";
import Button from 'react-bootstrap/Button';

import './Link.css'
// import "../views/Game.css";
import {indexMapper1to2} from '../helper/indexMapper'

// List of props available:
// this.props.from            : originating tile
// this.props.to              : destination tile
// this.props.boardSize       : board size
// this.props.onClickCallback : callback function
// this.props.isButton        : boolean

class Link extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  calculateArrowDirection(fromRow, fromCol, toRow, toCol) {
    // console.log(fromRow,fromCol,toRow,toCol);
    let assert = require("assert");
    assert(
      (fromRow - toRow === 0 && Math.abs(fromCol - toCol) === 1) ||
      (Math.abs(fromRow - toRow) === 1 && fromCol - toCol === 0)
    );
    if (toRow - fromRow === 1) {
      return <FontAwesomeIcon icon={faLongArrowAltDown} />;
    } else if (toRow - fromRow === -1) {
      return <FontAwesomeIcon icon={faLongArrowAltUp} />;
    } else if (toCol - fromCol === 1) {
      return <FontAwesomeIcon icon={faLongArrowAltRight} />;
    } else if (toCol - fromCol === -1) {
      return <FontAwesomeIcon icon={faLongArrowAltLeft} />;
    }
  }

  calculatePosition(fromRow, fromCol, toRow, toCol) {
    let xShift = 0, yShift = 0;
    const shift = 4;
    if (toRow - fromRow === 1) {
      xShift = -shift;
    } else if (toRow - fromRow === -1) {
      xShift = +shift;
    } else if (toCol - fromCol === 1) {
      yShift = +shift
    } else if (toCol - fromCol === -1) {
      yShift = -shift;
    }
    let top = (50/this.props.boardSize) + (100/this.props.boardSize) * fromRow + (50/this.props.boardSize) * (toRow - fromRow) + yShift + "%";
    let left = (50/this.props.boardSize) + (100/this.props.boardSize) * fromCol + (50/this.props.boardSize) * (toCol - fromCol) + xShift +  "%";
    return [top, left];
  }

  handleClick(e) {
    // console.log(this.props)
    return this.props.onClickCallback(this.props.from, this.props.to);
  }

  render() {
    // console.log(this.props);
    let [fromRow, fromCol] = indexMapper1to2(this.props.from, this.props.boardSize);
    let [toRow, toCol] = indexMapper1to2(this.props.to, this.props.boardSize);
    // console.log(fromRow, fromCol);
    let arrow = this.calculateArrowDirection(fromRow, fromCol, toRow, toCol);
    let [top, left] = this.calculatePosition(fromRow, fromCol, toRow, toCol);
    // console.log(top, left);
    if (this.props.onClickCallback) {
      return (
        <Button
          bsPrefix={
            "link selectableComponent"
          }
          style={{
            top: top,
            left: left,
          }}
          onClick={this.handleClick}
        >
          {arrow}
        </Button>
      );
    } else {
      return (
        <div
          className={
            "link"
          }
          style={{
            top: top,
            left: left,
          }}
        >
          {arrow}
        </div>
      );
    }


   

  }

}

export default Link;
