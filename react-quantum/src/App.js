import React, { Component } from 'react';
import PubNub from 'pubnub';
import Swal from "sweetalert2";  
import shortid  from 'shortid';


class App extends Component {
  constructor(props){
    super(props);
    this.pubnub = new PubNub({
      publishKey: "pub-c-075d6884-ce3e-4809-acdc-147545392971",
      subscribeKey: "sub-c-0c2c540c-9707-11ea-8e71-f2b83ac9263d"
    });
    this.state = {
      ap: 3,
      isPlayer: false,
      isRoomCreator: false,
      isDisabled: false,
      myTurn: false,
    };

    this.lobbyChannel = null;
    this.gameChannel = null;
    this.roomId = null;
  }

  componentWillUnmount = () => {
    this.pubnub.unsubscribe({
      channels : [this.lobbyChannel, this.gameChannel]
    });
  }
  subscribeToGameChannel = () => {
    // Create a different channel for the game
    this.gameChannel = 'schrodingercheckersGame--' + this.roomId;
    this.pubnub.subscribe({
      channels: [this.gameChannel]
    });
    this.setState({
      isPlaying: true
    });
    // Close the modals if they are opened
    Swal.close();

  }
  componentDidUpdate = () => {
    // Check that the player is connected to a channel
    // if (this.lobbyChannel != null){
      this.pubnub.addListener({
        message: (msg) =>{
          if(msg.message.notRoomCreator){
            this.subscribeToGameChannel();
          }
        }
      });
  }
  //display here now to console
  onPressHereNow = (e) => {
    console.log("Here Now")
    console.log(this.lobbyChannel)
    console.log(this.gameChannel)
    this.pubnub.hereNow({
      channels: [this.lobbyChannel,this.gameChannel],
    }).then((response)=>{
      console.log('here Now button Response')
      console.log(response)
      });
    }
  // Create a room channel
  onPressCreate = (e) => {
    //Create a random name for the channel
    this.roomId = shortid.generate().substring(0,5);
    this.lobbyChannel = 'schrodingercheckers--' + this.roomId;

    this.pubnub.subscribe({
      channels: [this.lobbyChannel],
      withPresence: true
    });

    //open the modal
    Swal.fire({
      position: 'top',
      allowOutsideClick: false,
      title: this.roomId,
      width: 275,
      padding: '0.7em',
      //Custom CSS
      customClass: {
        heightAuto: false,
        title: 'title-class',
        popup: 'popup-class',
        confirmButton: 'button-class'
      }
    })

    this.setState({
      isRoomCreator: true,
      isDisabled: true, //Disable the 'Create' button
      myTurn: true, // Room creator goes first
    });
  }

  // The 'Join' button was pressed
  onPressJoin = (e) => {
    Swal.fire({
      position: 'top',
      input: 'text',
      allowOutsideClick: false,
      inputPlaceholder: 'Enter the room id',
      showCancelButton: true,
      confirmButtonColor: 'rgb(208,33,41)',
      confirmButtonText: 'OK',
      width: 275,
      padding: '0.7em',
      customClass: {
        heightAuto: false,
        popup: 'popup-class',
        confirmButton: 'join-button-class ',
        cancelButton: 'join-button-class'
      }
    }).then((result)=>{
      //Check if the user typed a value in the input field
      if(result.value){
        this.joinRoom(result.value);
      }
    })
  }

  joinRoom = (value) => {
    this.roomId = value;
    this.lobbyChannel = 'schrodingercheckers--' + this.roomId;

    //Check the number of people in the channel
    this.pubnub.hereNow({
      channels: [this.lobbyChannel],
    }).then((response)=>{
      if(response.totalOccupancy < 2){
        this.pubnub.subscribe({
          channels: [this.lobbyChannel],
          withPresence: true
        });

        this.pubnub.publish({
          message:{
            notRoomCreator: true,
          },
          channel: this.lobbyChannel
        }).then((response)=>{
          // after publish response goes through
          if(!response.error){
            this.subscribeToGameChannel();
          }else{
            console.log(response.error)
          }
        });
      }
      else{
        // Game in progress
        Swal.fire({
          position: 'top',
          allowOutsideClick: false,
          title: 'Error',
          text: 'Game in progress. Try another room.',
          width: 275,
          padding: '0.7em',
          customClass: {
              heightAuto: false,
              title: 'title-class',
              popup: 'popup-class',
              confirmButton: 'button-class'
          }
        })
      }
    }).catch((error)=>{
      console.log(error)
    });
  }

  // Reset everything
  endGame = () => {
    this.setState({
      ap: 3,
      isPlaying: false,
      isRoomCreator: false,
      isDisabled: false,
      myTurn: false,
    });

    this.lobbyChannel = null;
    this.gameChannel = null;
    this.roomId = null;  

    this.pubnub.unsubscribe({
      channels : [this.lobbyChannel, this.gameChannel]
    });
  }
  render(){
    return(
      <div>
        <div className="button-container">
          <button 
            className="create-button "
            disabled={this.state.isDisabled}
            onClick={(e) => this.onPressCreate()}
            > Create 
          </button>
          <button 
            className="join-button"
            onClick={(e) => this.onPressJoin()}
            > Join 
          </button>
          <button
            onClick={(e)=> this.onPressHereNow()}
            >
              Here Now
            </button>
        </div>   
      </div>
    )
  }
}

export default App;
