import { combineReducers } from 'redux';
import undoable, { groupByActionTypes } from 'redux-undo';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import alertReducer from './alertReducer';
import gameStateReducer from './gameStateReducer';
import gameMetaReducer from './gameMetaReducer';
import { FLIP_TILE } from '../actions/types';

const gameReducer = combineReducers({
    meta: gameMetaReducer,
    state: undoable(gameStateReducer, {
        undoType: 'CMD_UNDO',
        redoType: 'CMD_REDO',
        clearHistoryType: 'CMD_CLEAR_HISTORY',
        filter: function filterActions(action, currentState, previousHistory) {
            return action.type.substring(0, 3) === 'CMD';
        },
        groupBy: groupByActionTypes([FLIP_TILE]),
    }),
});

export default combineReducers({
    auth: authReducer,
    error: errorReducer,
    alert: alertReducer,
    game: gameReducer,
});
