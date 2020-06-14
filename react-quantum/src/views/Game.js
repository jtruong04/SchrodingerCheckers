import React from "react";

// Bootstrap Components
import {Container, Col, Row} from "react-bootstrap";

// Pure Data
import Board_Data from '../data_entities/Board_Data'
import Player_Data from '../data_entities/Player_Data'

// Components
import Board from "../components/Board.js"
import Player from "../components/Player.js";
import CommandManager from '../components/CommandManager'

// CSS Styling
import './Game.css'

// Config
import config from '../config.json';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.pubnub = this.props.pubnub;

    this.state = {
      gameBoard: new Board_Data({ size: config.boardSize, randomizeTiles: false }),
      players: [
        new Player_Data({ numBoards: config.numberTargetCards, size: config.boardSize }),
        // new Player_Data({ numBoards: config.numberTargetCards, size: config.boardSize }),
      ],
      actionPoints: config.startingActionPoints,
      currentPlayer: 0
    };
    this.setState = this.setState.bind(this); // Any functions used as callback functions need to be bound  
                                              // because of how JS defines this. You'll 
                                              // see this a bunch throughout the code.

    //Listener for PubNub
    this.pubnub.addListener({
      message:(msg)=>{
        console.log('listener')
        console.log(msg)
        if(msg.message.newGame && msg.message.opponent){
          if(this.props.isCreator){
            this.setState({
              players: this.state.players.push(msg.message.opponent)
            })
            this.pubnub.publish({
              message: {
                newGame: true,
                player: this.state.players[0],
              },
              channel: this.props.gameChannel
            }).then((response)=>{
              if(response.error){
                console.log(response.error);
              }
            });
          }else{
            this.setState({
              players: this.state.playets.unshift(msg.message.opponent)
            })
          }
        }
      }
    });
    
    //want the person who joins to publish to insure we have two players.
    // then double check for two players incase someone tried to join without a "good" code

    // delay pretty  big here for when the second person gets registered. Prob need to add a listener
    // and send a message from the join button for when its ready and trigger it that way.
    console.log(this.props.gameChannel)
    console.log(this.props.isCreator)
    if(this.props.gameChannel && !this.props.isCreator){
      console.log('in')
      this.pubnub.hereNow({
        channels: [this.props.gameChannel],
      }).then((response)=>{
        console.log('here now')
        console.log(response)
        if(response.totalOccupancy === 2){
          this.pubnub.publish({
            message:{
              newGame: true,
              player: this.state.players[0]
            },
            channel: this.props.gameChannel
          }).then((response)=>{
            if(response.error){
              console.log(response.error);
            }
          });
        }
      })
    }


  }

  render() {
    let r1;
    let r2;
    if(this.state.players.length === 2){
      r1 =  <Row><Col></Col><Player player={this.state.players[1]} /><Col></Col></Row>;
      r2 =  <Row><Col></Col><Player player={this.state.players[0]} /><Col></Col></Row>;
    }
    return (
      <Container>
        <p>gameChannel: {this.props.gameChannel}</p>
        <p>isCreator: {this.props.isCreator.toString()}</p>
        {/* <Row>
          <Col></Col>
          <Player player={this.state.players[1]} />
          <Col></Col>
        </Row> */}
        {r1}
        <Row>
          <Col></Col>
          <Col xs={6}>
              <Board 
                board = {this.state.gameBoard}
              />
          </Col>
          <Col></Col>
        </Row>
        {/* <Row>
          <Col></Col>
          <Player player={this.state.players[0]} />
          <Col></Col>
        </Row> */}
        {r2}
        <Row>
          <CommandManager 
            setGameState={this.setState}
            gameState={this.state}
          />
        </Row>
        <Row>
          <p>Current Player: {this.state.currentPlayer}</p>,
          <p>Action Points: {this.state.actionPoints}</p>
        </Row>
      </Container>
    );
  }
}

export default Game;