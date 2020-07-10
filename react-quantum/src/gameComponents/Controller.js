import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { isValidLink } from '../helper/inputValidation';
import {
    GET_STATE,
    FLIP_TILE,
    CREATE_LINK,
    DELETE_LINK,
    UNDO,
    REDO,
    CLEAR_HISTORY,
    END_TURN,
} from '../actions/types';
import gameActions from '../actions/gameActions';
import config from '../config.json';

function Controller(props) {
    const {
        setInputMode,
        setInputs,
        inputMode,
        actionPoints,
        setState,
    } = props;

    const ActionHandler = {
        [UNDO]: {
            name: 'Undo',
            source: null,
            numInputs: 0,
            cost: config.actionCosts[UNDO] || 0,
            execute: function () {
                props.undo(props.inputMode.inputs, this.cost);
            },
            buttonConfig: {
                variant: 'outlined',
            },
        },
        [REDO]: {
            name: 'Redo',
            source: null,
            numInputs: 0,
            cost: config.actionCosts[REDO] || 0,
            execute: function () {
                props.redo(props.inputMode.inputs, this.cost);
            },
            buttonConfig: {
                variant: 'outlined',
            },
        },
        [FLIP_TILE]: {
            name: 'Flip Tile',
            source: 'TILE',
            numInputs: 1,
            cost: config.actionCosts[FLIP_TILE] || 0,
            execute: function () {
                props.flipTile(props.inputMode.inputs, this.cost);
            },
            buttonConfig: {
                variant: 'contained',
                color:
                    props.inputMode.mode === FLIP_TILE ? 'primary' : 'default',
            },
        },
        [CREATE_LINK]: {
            name: 'Create Link',
            source: 'TILE',
            numInputs: 2,
            cost: config.actionCosts[CREATE_LINK] || 0,
            execute: function () {
                props.createLink(props.inputMode.inputs, this.cost);
            },
            buttonConfig: {
                variant: 'contained',
                color:
                    props.inputMode.mode === CREATE_LINK
                        ? 'primary'
                        : 'default',
            },
        },
        [DELETE_LINK]: {
            name: 'Delete Link',
            source: 'LINK',
            numInputs: 2,
            cost: config.actionCosts[DELETE_LINK] || 0,
            execute: function () {
                props.deleteLink(props.inputMode.inputs, this.cost);
            },
            buttonConfig: {
                variant: 'contained',
                color:
                    props.inputMode.mode === DELETE_LINK
                        ? 'primary'
                        : 'default',
            },
        },
        [END_TURN]: {
            name: 'End Turn',
            source: null,
            numInputs: 0,
            cost: config.actionCosts[END_TURN] || 0,
            execute: function () {
                props.endTurn(props.inputMode.inputs, this.cost);
            },
            buttonConfig: {
                variant: 'outlined',
                color: 'secondary',
            },
        },
    };

    // Makes sure that player can't execute an action if they can't afford it.
    React.useEffect(() => {
        if (inputMode.mode) {
            if (config.actionCosts[inputMode.mode] > actionPoints) {
                setInputMode(null);
            }
        }
    }, [setInputMode, inputMode, actionPoints, config.actionCosts]);

    React.useEffect(() => {
        const { mode, inputs } = inputMode;
        if (mode) {
            if (inputs.length >= ActionHandler[mode].numInputs) {
                ActionHandler[mode].execute();
                setInputs([]);
                if (ActionHandler[mode].numInputs === 0) {
                    setInputMode(null);
                }
            }
        }
    }, [ActionHandler, inputMode, setInputMode, setInputs]);

    const renderButtons = () => {
        return Object.keys(ActionHandler).map((action, idx) => (
            <Button
                key={idx}
                {...ActionHandler[action].buttonConfig}
                onClick={() =>
                    setInputMode(
                        inputMode.mode !== action ? action : null,
                        ActionHandler[action].source
                    )
                }
            >
                {ActionHandler[action].name}
            </Button>
        ));
    };

    return renderButtons();
}

Controller.propTypes = {};

const mapStateToProps = (state) => ({
    actionPoints: state.game.state.present.actionPoints,
});
const mapDispatchToProps = {
    undo: gameActions[UNDO],
    redo: gameActions[REDO],
    endTurn: gameActions[END_TURN],
    flipTile: gameActions[FLIP_TILE],
    deleteLink: gameActions[DELETE_LINK],
    createLink: gameActions[CREATE_LINK],
};

export default connect(mapStateToProps, mapDispatchToProps)(Controller);