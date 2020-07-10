import {
    SET_STATE,
    FLIP_TILE,
    CREATE_LINK,
    DELETE_LINK,
    UNDO,
    REDO,
    CLEAR_HISTORY,
    END_TURN,
} from './types';

export default {
    [SET_STATE]: (newState) => {
        return {
            type: SET_STATE,
            payload: newState,
        };
    },
    [FLIP_TILE]: (inputs, cost) => {
        return {
            type: FLIP_TILE,
            payload: inputs[0],
            cost: cost,
        };
    },
    [CREATE_LINK]: (inputs, cost) => {
        return {
            type: CREATE_LINK,
            payload: {
                src: inputs[0],
                dst: inputs[1],
            },
            cost: cost,
        };
    },
    [DELETE_LINK]: (inputs, cost) => {
        return {
            type: DELETE_LINK,
            payload: {
                src: inputs[0],
                dst: inputs[1],
            },
            cost: cost,
        };
    },
    [UNDO]: (inputs, cost) => {
        return {
            type: UNDO,
        };
    },
    [REDO]: (inputs, cost) => {
        return {
            type: REDO,
        };
    },
    [CLEAR_HISTORY]: (inputs, cost) => {
        return {
            type: CLEAR_HISTORY,
        };
    },
    [END_TURN]: (inputs, cost) => {
        return {
            type: END_TURN,
        };
    },
};
