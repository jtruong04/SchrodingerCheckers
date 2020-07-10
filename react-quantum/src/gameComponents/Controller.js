import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { isValidLink } from '../helper/inputValidation';
import {
    // GET_STATE,
    FLIP_TILE,
    CREATE_LINK,
    DELETE_LINK,
    UNDO,
    REDO,
    // CLEAR_HISTORY,
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
        // setState,
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
                disabled: !props.canUndo,
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
                disabled: !props.canRedo,
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
                disabled: config.actionCosts[FLIP_TILE] > props.actionPoints,
            },
        },
        [CREATE_LINK]: {
            name: 'Create Link',
            source: 'TILE',
            numInputs: 2,
            cost: config.actionCosts[CREATE_LINK] || 0,
            execute: function () {
                const [src, dst] = props.inputMode.inputs;
                if (isValidLink(src, dst, props.size)) {
                    props.createLink(props.inputMode.inputs, this.cost);
                }
            },
            buttonConfig: {
                variant: 'contained',
                color:
                    props.inputMode.mode === CREATE_LINK
                        ? 'primary'
                        : 'default',
                disabled: config.actionCosts[CREATE_LINK] > props.actionPoints,
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
                disabled: config.actionCosts[DELETE_LINK] > props.actionPoints,
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
    }, [setInputMode, inputMode, actionPoints]);

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

// Controller.propTypes = {};

const mapStateToProps = (state) => ({
    actionPoints: state.game.state.present.actionPoints,
    canUndo: state.game.state.index > 0,
    canRedo: state.game.state.index < state.game.state.limit - 1,
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
