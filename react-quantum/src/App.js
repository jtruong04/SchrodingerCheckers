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

import React,{useState, useEffect} from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, 
        // Switch, 
        // Route 
      } from "react-router-dom";

import {
  CssBaseline, 
  Snackbar 
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useStyles from './materialStyles';
import TopBar from './uiComponents/TopBar';
import LeftDrawer from './uiComponents/LeftDrawer';
import ViewPort from './uiComponents/ViewPort';

import { connect } from 'react-redux';
import { hideAlert } from './actions/alertActions';
import { loadUser } from './actions/authActions';

// import PropTypes from 'prop-types';
import store from './store';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


function App(props) {
  //---------------------
  //      Auth
  //---------------------
  useEffect(() => (
    store.dispatch(loadUser())
  ), []);

  //---------------------
  //      Theming
  //---------------------
  const [darkMode, setDarkMode] = useState(!useMediaQuery('(prefers-color-scheme: dark)'));
  // const prefersDarkMode = ;
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: darkMode ? 'dark' : 'light',
        },
      }),
    [darkMode],
  );
  const classes = useStyles();
  //---------------------
  //    State Hooks
  //---------------------
  const [drawerOpen, setDrawerOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    props.hideAlert();
  };
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className={classes.root}>
          <CssBaseline />
          <TopBar classes={classes} drawerOpen={drawerOpen} handleDrawerOpen={handleDrawerOpen} />
          <LeftDrawer classes={classes} drawerOpen={drawerOpen} handleDrawerClose={handleDrawerClose} darkMode={darkMode} setDarkMode={setDarkMode} />
          <ViewPort classes={classes} drawerOpen={drawerOpen} />
          <Snackbar open={props.snackProps.isVisible} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={4000} onClose={handleSnackClose}>
            <Alert onClose={handleSnackClose} severity={props.snackProps.severity}>
              {props.snackProps.text}
            </Alert>
          </Snackbar>
        </div>
      </Router>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => ({
  snackProps: state.alert
});


export default connect(mapStateToProps, { hideAlert, loadUser })(App);