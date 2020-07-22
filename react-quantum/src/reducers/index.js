import { combineReducers } from 'redux';
import undoable from 'redux-undo';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import alertReducer from './alertReducer';
import gameStateReducer from './gameStateReducer';
import gameMetaReducer from './gameMetaReducer';

const gameReducer = combineReducers({
    meta: gameMetaReducer,
    state: undoable(gameStateReducer, {
        undoType: 'CMD_UNDO',
        redoType: 'CMD_REDO',
        clearHistoryType: 'CMD_CLEAR_HISTORY',
        filter: function filterActions(action, currentState, previousHistory) {
            return action.type.substring(0, 3) === 'CMD';
        },
    }),
});

export default combineReducers({
    auth: authReducer,
    error: errorReducer,
    alert: alertReducer,
    game: gameReducer,
});
