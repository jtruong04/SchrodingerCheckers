import { combineReducers } from 'redux';

// // import boardReducer from './boardReducer';
import errorReducer from './errorReducer';
// import authReducer from './authReducer';
import alertReducer from './alertReducer';


export default combineReducers({
    // auth: authReducer,
    error: errorReducer,
    alert: alertReducer,
    // board: boardReducer,
})