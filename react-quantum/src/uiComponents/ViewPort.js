import React from 'react';
import clsx from 'clsx';
// import Typography from '@material-ui/core/Typography';
import { Switch, Route } from "react-router-dom";

import Lobby from '../views/Lobby';
import Game from '../views/Game';
import Home from '../views/Home';
import Rankings from '../views/Rankings';
import Profile from '../views/Profile';

function ViewPort(props) {

    const {classes, drawerOpen} = props;

    return (
        <main
            className={clsx(classes.content, {
                [classes.contentShift]: drawerOpen,
            })}
        >
            <div className={classes.drawerHeader} />
            <Switch>
                <Route path="/play" component={Lobby} />
                <Route path="/game" component={Game} />
                <Route path="/rankings" component={Rankings} />
                <Route path="/profile" component={Profile} />
                <Route path="/" component={Home} />
            </Switch>
        </main> 
    );

}

export default ViewPort;