/*

The homepage introduces the game to the player and allows them to create/join a game.

TODO: Create section explaining the rules of the game.
TODO: Code the buttons to actually create/join rooms instead of both taking us directly to /game.

*/ 
import React from "react";

import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";
import shortid from 'shortid';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import PropTypes from 'prop-types';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCreateModal: false,
      showJoinModal: false,
    };
    this.pubnub = this.props.pubnub;
    
    this.gameChannel = null;
    this.roomId = null;
    this.joinRoomInput = '';
    this.joinInput = React.createRef();

    //define PropType for callback
    Home.protoTypes = {
      callback: PropTypes.func,
    }

  };
  
  //triggers callback function passed in from props
  callbackGameChannel(gameChannel) {
    this.props.callbackGameChannel(gameChannel);
  }

  callbackIsCreator(creator){
    this.props.callbackIsCreator(creator)
  }

// opens modal and then created a gameChannel variable
  showCreateModal = () =>{
    this.roomId = shortid.generate().substring(0,5);
    this.gameChannel = 'schrodingercheckers--' + this.roomId;

    this.setState({
      showCreateModal: true,
    });
  };

  closeCreateModal = () =>{
    this.setState({
      showCreateModal: false,
    })
  }
  showJoinModal = () =>{
    this.setState({
      showJoinModal: true,
    })
  }
  closeJoinModal = () => {
    this.setState({
      showJoinModal: false,
    })
  }
  handleJoinInputChange = () => {
    this.joinRoomInput = this.joinInput.current.value;
  }
// subs the game creator to the gameChannel
  createGame = () => {
    this.pubnub.subscribe({
      channels: [this.gameChannel],
      withPresence: true,
    });

    this.callbackGameChannel(this.gameChannel);
    this.callbackIsCreator(true);
  }

  joinGame = () => {
    this.pubnub.subscribe({
      channels: [this.joinRoomInput],
      withPresence: true,
    });
    this.callbackGameChannel('schrodingercheckers--'+this.joinRoomInput);
    this.callbackIsCreator(false);
  }
  render() {
    return (
      <Container>
        <Jumbotron>
          <h1>Schrodinger Checkers</h1>
          <Button variant="dark" onClick={this.showCreateModal}>Create Room</Button>
          <Button variant="dark" onClick={this.showJoinModal}>Join Room</Button>
        </Jumbotron>

        <Modal onHide={this.closeCreateModal} show={this.state.showCreateModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title> Make sure to give this code to your opponent!</Modal.Title>
          </Modal.Header>

          <Modal.Body style={{textAlign:'center',fontSize:'24px'}}>
            RoomID: <label style={{fontWeight:'bold'}}>{this.roomId}</label>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeCreateModal}>Cancel</Button>
            <LinkContainer to="/game">
              <Button variant="primary" onClick={this.createGame}>Start Match!</Button>
            </LinkContainer>{" "}
          </Modal.Footer>
        </Modal>

        <Modal onHide={this.closeJoinModal} show={this.state.showJoinModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Ask your opponent for their room code!</Modal.Title>
          </Modal.Header>

          <Modal.Body style={{textAlign:'center',fontSize:'24px'}}>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-default">RoomID</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                aria-label="RoomID"
                aria-describedby="inputGroup-sizing-default"
                ref={this.joinInput} 
                type = 'text'
                onChange={()=>this.handleJoinInputChange()}
              />
            </InputGroup>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeJoinModal}>Cancel</Button>
            <LinkContainer to="/game">
              <Button variant="primary" onClick={this.joinGame}>Start Match!</Button>
            </LinkContainer>{" "}
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}

export default Home;