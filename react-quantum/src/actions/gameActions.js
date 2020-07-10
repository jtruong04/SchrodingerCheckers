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

import { traverseGraphDepth } from '../helper/traverseGraph';

export default {
    [SET_STATE]: (newState) => {
        return {
            type: SET_STATE,
            payload: newState,
        };
    },
    [FLIP_TILE]: (inputs, cost) => (dispatch, getState) => {
        const flippedTilesWithDepth = traverseGraphDepth(
            getState().game.state.present.board.links,
            [
                {
                    node: inputs[0],
                    depth: 0,
                },
            ]
        );
        flippedTilesWithDepth.forEach((depth, idx) => {
            setTimeout(
                () =>
                    dispatch({
                        type: FLIP_TILE,
                        payload: depth,
                        cost: idx === 0 ? cost : 0,
                    }),
                idx * 100
            );
        });
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
    [END_TURN]: (inputs, cost) => (dispatch) => {
        dispatch({
            type: END_TURN,
        });
        dispatch({
            type: CLEAR_HISTORY,
        });
    },
};
