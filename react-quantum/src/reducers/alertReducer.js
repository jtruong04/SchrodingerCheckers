import { EMIT_ALERT, HIDE_ALERT } from '../actions/types';

const initialState = {
    isVisible: false,
    text: '',
    severity: ''
}

export default function (state = initialState, action) {
    switch (action.type) {
        case EMIT_ALERT:
            return {
                ...state,
                ...action.payload,
                isVisible: true
            };
        case HIDE_ALERT:
            return {
                isVisible: false,
                text: '',
                severity: ''
            }
        default:
            return state;
    }
}