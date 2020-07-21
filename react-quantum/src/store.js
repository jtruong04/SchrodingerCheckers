import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { socketEmitter } from './socket';
const initialState = {};
// const middleware = [thunk];

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : (f) => f;

const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(thunk), applyMiddleware(socketEmitter), devTools)
);

export default store;
