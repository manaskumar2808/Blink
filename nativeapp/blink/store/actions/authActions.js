import axios from '../../axios-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as actionTypes from '../actionTypes';


let timer;

export const autoLogin = () => {
    return async dispatch => {
        try {
            const response = await AsyncStorage.getItem('authData');
            const responseData = JSON.parse(response);
            if(responseData && responseData.token && responseData.userId) {
                console.log(responseData);
                dispatch(authSuccess(responseData.token, responseData.userId, responseData.expiryDate));
                return true;
            }
        } catch(error) {
            dispatch(authFail(error));
            return false;
        }
    }
}


export const login = (email, password) => {
    const authData = {
        email,
        password,
    }
    return async dispatch => {
        try {
            const response = await axios.post('auth/login', authData);
            if(response) {
                console.log(response.data);
                const result = await dispatch(createStore(response.data.token, response.data.userId, response.data.expiryDate));
                if(result) {
                    dispatch(autoLogout());
                }
            }
        } catch(error) {
            dispatch(authFail(error));
            throw error;
        }
    }
}

export const signup = (userName, email, password) => {
    const authData = {
        userName, 
        email, 
        password,
    }
    return async dispatch => {
        try {
            const response = await axios.post('auth/signup', authData);
            if(response) {
                console.log(response.data);
                const result = await dispatch(createStore(response.data.token, response.data.userId, response.data.expiryDate));
                if(result) {
                    dispatch(autoLogout());
                }
            }
        } catch(error) {
            dispatch(authFail(error));
            throw error;
        }
    }
}


export const createStore = (token, userId, expiryDate) => {
    return async dispatch => {
        const authData = {
            token: token,
            userId: userId,
            expiryDate: expiryDate,
        }
        try {
            await AsyncStorage.setItem('authData', JSON.stringify(authData));
            dispatch(authSuccess(token, userId, expiryDate));
        } catch(error) {
            dispatch(authFail(error));
            throw error;
        }
    }
}


export const autoLogout = () => {
    return dispatch => {
        setTimeout(() => {
            console.log('setting timeout');
            dispatch(logout());
        }, 10);
    }
}


export const logout = () => {
    return async dispatch => {
        console.log('logout dispatch');
        try {
            await AsyncStorage.removeItem('authData');
            dispatch(authLogout());
        } catch(error) {
            dispatch(authFail());
            throw error;
        }
    }
}


export const clearLogoutTimer = () => {
    if(timer) {
        clearTimeout(timer);
    }
}

export const authLogout = () => {
    console.log('logged out');
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}


export const authSuccess = (token, userId, expiryDate) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token, 
        userId: userId,
        expiryDate: expiryDate,
    }
}


export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    }
}