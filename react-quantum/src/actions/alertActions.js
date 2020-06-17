import { EMIT_ALERT, HIDE_ALERT } from './types';

export const emitAlert = (text, severity) => {
    return {
        type: EMIT_ALERT,
        payload: {
            text: text,
            severity: severity
        }
    };
};

export const hideAlert = (tileIndex) => {
    return {
        type: HIDE_ALERT,
    };
};