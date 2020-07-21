import io from 'socket.io-client';

const socket = io();

export default socket;

// Redux Middleware
export const socketEmitter = (store) => (next) => (action) => {
    if (socket && !action.stale && action.type.substring(0, 3) === 'CMD') {
        // console.log(action);
        action.stale = true;
        socket.emit('action', action);
    }
    return next(action);
};
