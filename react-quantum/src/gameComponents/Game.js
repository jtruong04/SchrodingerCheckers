import React from 'react';

import { Grid } from '@material-ui/core';
// Components
import Board from './Board';
import Controller from './Controller';
// Config
import config from '../config.json';
// import { generateAllCards } from '../helper/generateRandomCard';
import CardCarousel from './CardCarousel';

class Game extends React.Component {
    constructor(props) {
        super(props);
        // This will eventually be moved to redux
        this.state = {
            inputMode: {
                source: null,
                mode: null,
                inputs: [],
            },
            event: {
                source: null,
                payload: [],
                e: null,
            },
        };
        this.setState = this.setState.bind(this);
        this.handleEvent = this.handleEvent.bind(this);
        this.setInputMode = this.setInputMode.bind(this);
        this.setInputs = this.setInputs.bind(this);
    }

    consumeEvent() {
        this.setState({
            ...this.state,
            event: {
                source: null,
                payload: [],
                e: null,
            },
        });
    }

    setInputMode(mode, source) {
        this.setState({
            ...this.state,
            inputMode: {
                mode: mode,
                source: source,
                inputs: [],
            },
        });
    }

    setInputs(inputs) {
        this.setState({
            ...this.state,
            inputMode: {
                ...this.state.inputMode,
                inputs: inputs,
            },
        });
    }

    handleEvent(event) {
        if (event.source === this.state.inputMode.source) {
            this.setState({
                ...this.state,
                inputMode: {
                    ...this.state.inputMode,
                    inputs: [...this.state.inputMode.inputs, ...event.payload],
                },
            });
        }
    }

    render() {
        return (
            <>
                <Grid
                    container
                    spacing={1}
                    direction='row'
                    justify='center'
                    alignItems='center'
                    alignContent='center'
                >
                    <Grid item xs={10}>
                        <Board
                            size={config.boardSize}
                            handleEvent={this.handleEvent}
                            inputMode={this.state.inputMode}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <CardCarousel
                            numCards={config.numberTargetCards}
                            numPlayers={2}
                            size={config.boardSize}
                            handleEvent={this.handleEvent}
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <Controller
                            setInputMode={this.setInputMode}
                            setInputs={this.setInputs}
                            inputMode={this.state.inputMode}
                            size={config.boardSize}
                            // setState={this.setState}
                        />
                    </Grid>
                </Grid>
            </>
        );
    }
}

export default Game;
