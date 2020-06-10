import React from 'react';
// FontAwesome Characters
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLongArrowAltDown,
  faLongArrowAltUp,
  faLongArrowAltLeft,
  faLongArrowAltRight
} from "@fortawesome/free-solid-svg-icons";

import './Link.css'
import {indexMapper1to2} from '../helper/indexMapper'

// List of props available:
// props.src             : originating tile
// props.dst             : destination tile
// props.boardSize       : board size
// props.onClickCallback : callback function
// props.isButton        : boolean

function Link(props) {

  const calculateArrowDirection = (fromRow, fromCol, toRow, toCol) => {
    const assert = require("assert");
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
  };

  const calculatePosition = (fromRow, fromCol, toRow, toCol) => {
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
    const top = (50/props.boardSize) + (100/props.boardSize) * fromRow + (50/props.boardSize) * (toRow - fromRow) + yShift + "%";
    const left = (50/props.boardSize) + (100/props.boardSize) * fromCol + (50/props.boardSize) * (toCol - fromCol) + xShift +  "%";
    return [top, left];
  };

  const handleClick = (e) => {
    return props.onClickCallback(props.from, props.to);
  };

  const [fromRow, fromCol] = indexMapper1to2(props.src, props.boardSize);
  const [toRow, toCol] = indexMapper1to2(props.dst, props.boardSize);
  const arrow = calculateArrowDirection(fromRow, fromCol, toRow, toCol);
  const [top, left] = calculatePosition(fromRow, fromCol, toRow, toCol);
  
  return (
    <div
      className={
        "link " + (props.onClickCallback ? "selectableComponent " : " ")
      }
      style={{
        top: top,
        left: left,
      }}
      onClick={props.onClickCallback ? handleClick : null}
    >
      {arrow}
    </div>
  );
}

export default Link;
