import React from "react";

// Bootstrap Components
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

// Pure Data
import Board_Data from '../data_entities/Board_Data'
import Player_Data from '../data_entities/Player_Data'

// Components
import Board from "../components/Board.js"
import CommandManager from '../components/CommandManager'

// CSS Styling
import './Game.css'

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameBoard: new Board_Data(),
      players: [new Player_Data(), new Player_Data()]
    };
    this.setState = this.setState.bind(this);
  }

  // /**
  //  * @param {string} key String in the form "fromRow,fromCol,toRow,toCol"
  //  */
  // renderSingleLink(key) {
  //   let [fromRow,fromCol,toRow,toCol] = key.split(",");
  //   let assert = require("assert");
  //   assert(
  //     (fromRow - toRow === 0 && Math.abs(fromCol - toCol) === 1) ||
  //       (Math.abs(fromRow - toRow) === 1 && fromCol - toCol === 0)
  //   );
  //   let arrow = "0";
  //   if (toRow - fromRow === 1) {
  //     arrow = <FontAwesomeIcon icon={faLongArrowAltDown} />;
  //   } else if (toRow - fromRow === -1) {
  //     arrow = <FontAwesomeIcon icon={faLongArrowAltUp} />;
  //   } else if (toCol - fromCol === 1) {
  //     arrow = <FontAwesomeIcon icon={faLongArrowAltRight} />;
  //   } else if (toCol - fromCol === -1) {
  //     arrow = <FontAwesomeIcon icon={faLongArrowAltLeft} />;
  //   }
  //   return (
  //     <div
  //       key={this.state.gameBoard.links[key].linkID}
  //       className="link"
  //       style={{
  //         top: (12.5 + 25 * fromRow + 13 * (toRow - fromRow)) + "%",
  //         left: (12.5 + 25 * fromCol + 13 * (toCol - fromCol)) + "%",
  //       }}
  //     >
  //       {arrow}
  //     </div>
  //   );
  // }

  // renderLinks() {
  //   return Object.keys(this.state.gameBoard.links).map((key)=>(
  //     this.renderSingleLink(key)
  //   ));
  // }

  // renderBoard() {
  //   return this.state.gameBoard.tiles.flat().map((tile) => (
  //     <div
  //       key = {tile.tileID}
  //       className={
  //         "tile " +
  //         (tile.state ? "blackTile" : "whiteTile")
  //       }
  //     ></div>
  //   ));
  // }

  render() {
    return (
      <Container>
        <Row>
          <Col></Col>
          <Col xs={6} className='gameBoard'>
            <Row>
              <Board 
                board = {this.state.gameBoard}
              />
            </Row>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <CommandManager 
            setState={this.setState}
            board={this.state.gameBoard}
            players={this.state.players}
          />
        </Row>
      </Container>
    );
  }
}

export default Game;