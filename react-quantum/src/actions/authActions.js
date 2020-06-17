import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    EMIT_ALERT
} from "./types";

import { returnErrors } from './errorActions';
import axios from 'axios';

// Check token and load user
export const loadUser = () => (dispatch, getState) => {
    // User loading
    dispatch({ type: USER_LOADING });
    axios.get('/user/load', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            })
        })
}

export const register = ({ username, email, password }) => (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    }
    const body = new FormData();
    body.append('username', username);
    body.append('password', password);
    body.append('email', email);
    // console.log(body);

    axios.post('/user/register', body, config)
        .then(res => {
            dispatch({
                type: EMIT_ALERT,
                payload: {
                    text: 'Registration successful',
                    severity: 'success'
                }
            });
            dispatch({
                type: REGISTER_SUCCESS,
                payload: {
                    ...res.data,
                    remember: false
                }
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: EMIT_ALERT,
                payload: {
                    text: 'Registration failed: ' + err.response.data.msg,
                    severity: 'error'
                }
            });
            dispatch({
                type: REGISTER_FAIL
            })
        })
}

export const login = ({ username, password, remember }) => (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    }
    const body = new FormData();
    body.append('username', username);
    body.append('password', password);
    axios.post('/user/login', body, config)
        .then(res => {
            dispatch({
                type: EMIT_ALERT,
                payload: {
                    text: 'Logged in',
                    severity: 'success'
                }
            });
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    ...res.data,
                    remember: remember
                }
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: EMIT_ALERT,
                payload: {
                    text: 'Login failed: ' + err.response.data.msg,
                    severity: 'error'
                }
            });
            dispatch({
                type: LOGIN_FAIL
            })
        })
}

export const logout = () => dispatch => {
    dispatch({
        type: EMIT_ALERT,
        payload: {
            text: 'Logged out',
            severity: 'success'
        }
    });
    dispatch({
        type: LOGOUT_SUCCESS
    });
};

export const tokenConfig = getState => {
    // Get token from localStorage
    const token = getState().auth.token;
    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    }
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return config
}