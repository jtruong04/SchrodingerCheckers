/*

The App page does one thing and one thing only. It handles displaying the various pages.
At the top of the page is the navbar. This is persistant throughout all views. Below that,
it displays the current view. We have 4 views in the app

1) Home - This prompts the user to create/join a room to play the game
2) Game - This handles the game itself and is where the bulk of the time spent will be
3) Rankings - Displays the players rank and the top rankings in the world
4) Profile - Allows player to view/manage their user account

There should be no need to change App.js unless we add another view or want to change the layout.

*/

import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";

import Home from './views/Home.js'
import Game from "./views/Game.js";
import Profile from "./views/Profile.js";
import Rankings from "./views/Rankings.js";
import Navigation from "./Navigation.js"
import PubNub from 'pubnub';

class App extends React.Component {
  constructor(props){
    super(props)
    
    this.pubnub = new PubNub({
      publishKey: "pub-c-075d6884-ce3e-4809-acdc-147545392971",
      subscribeKey: "sub-c-0c2c540c-9707-11ea-8e71-f2b83ac9263d"
    });

    this.state = {
      gameChannel: '',
      isCreator: false,
    }
  }

  // callback function for home to get the gameChannel
  fromHomeGC = (gc) => {
    this.setState({
      gameChannel: gc
    })
  }
  fromHomeCreator = (creator) => {
    this.setState({
      isCreator: creator,
    })
  }

  render(){
    return (
      <Router>
        {/* NAVIGATION BAR */}
        <Navigation />
        {/* MAIN DISPLAY AREA */}
        <Container className="mt-3">
          <Switch>
            <Route path="/game">
              <Game pubnub={this.pubnub} gameChannel={this.state.gameChannel} isCreator={this.state.isCreator}/>
            </Route>
            <Route path="/rankings">
              <Rankings />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/">
              <Home pubnub={this.pubnub} callbackGameChannel={this.fromHomeGC.bind(this)} callbackIsCreator={this.fromHomeCreator.bind(this)}/>
            </Route>
          </Switch>
        </Container>
      </Router>
    );
  }
}
export default App;
