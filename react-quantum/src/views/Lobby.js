/*

The homepage introduces the game to the player and allows them to create/join a game.

TODO: Create section explaining the rules of the game.
TODO: Code the buttons to actually create/join rooms instead of both taking us directly to /game.

*/
import React from "react";
import { Link } from 'react-router-dom';

import {Container,Paper, Button, ButtonBase} from "@material-ui/core";

class Lobby extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Container>
                <Paper>
                    <h1>Schrodinger Checkers</h1>
                    <ButtonBase component={Link} to="/game">
                        <Button variant="contained" color="primary">Create Room</Button>
                    </ButtonBase>{" "}
                    <ButtonBase component={Link} to="/game">
                        <Button variant="contained" color="primary">Join Room</Button>
                    </ButtonBase>{" "}
                </Paper>
            </Container>
        );
    }
}

export default Lobby;