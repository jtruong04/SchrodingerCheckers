import React from "react";

// Bootstrap Components
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
// import Button from "react-bootstrap/Button";

// FontAwesome Characters
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLongArrowAltDown,
  faLongArrowAltUp,
  faLongArrowAltLeft,
  faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";

// Our components
import Board from "../entities/Board.js"

// CSS Styling
import './Game.css'

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameBoard: new Board(),
    };
  }

  /**
   * @param {string} key String in the form "fromRow,fromCol,toRow,toCol"
   */
  renderSingleLink(key) {
    let [fromRow,fromCol,toRow,toCol] = key.split(",");
    let assert = require("assert");
    assert(
      (fromRow - toRow === 0 && Math.abs(fromCol - toCol) === 1) ||
        (Math.abs(fromRow - toRow) === 1 && fromCol - toCol === 0)
    );
    let arrow = "0";
    if (toRow - fromRow === 1) {
      arrow = <FontAwesomeIcon icon={faLongArrowAltDown} />;
    } else if (toRow - fromRow === -1) {
      arrow = <FontAwesomeIcon icon={faLongArrowAltUp} />;
    } else if (toCol - fromCol === 1) {
      arrow = <FontAwesomeIcon icon={faLongArrowAltRight} />;
    } else if (toCol - fromCol === -1) {
      arrow = <FontAwesomeIcon icon={faLongArrowAltLeft} />;
    }
    return (
      <div
        key={this.state.gameBoard.links[key].linkID}
        className="link"
        style={{
          top: (12.5 + 25 * fromRow + 13 * (toRow - fromRow)) + "%",
          left: (12.5 + 25 * fromCol + 13 * (toCol - fromCol)) + "%",
        }}
      >
        {arrow}
      </div>
    );
  }

  renderLinks() {
    return Object.keys(this.state.gameBoard.links).map((key)=>(
      this.renderSingleLink(key)
    ));
  }

  renderBoard() {
    return this.state.gameBoard.tiles.flat().map((tile) => (
      <div
        key = {tile.tileID}
        className={
          "tile " +
          (tile.state ? "blackTile" : "whiteTile")
        }
      ></div>
    ));
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>P1 Cards (TODO)</Col>
          <Col xs={6} className='gameboard'>
            <Row>
              {this.renderBoard()}
              {this.renderLinks()}
            </Row>
          </Col>
          <Col>P2 Cards (TODO)</Col>
        </Row>
        <Row>History (TODO)</Row>
      </Container>
    );
  }
}

export default Game;