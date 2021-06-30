import axios from '../../axios-config';
import getHeader from '../../constants/ApiHeader';
import * as actionTypes from '../actionTypes';

export const fetchUsers = (token) => {
    return async dispatch => {
        try {
            const response = await axios.get('user/', getHeader(token));
            if(response.data) {
                dispatch(setUsers(response.data.users));
            }
        } catch(error) {
            dispatch(userFail(error));
            throw error;
        }
    }
}

export const fetchCurrentUser = (token, userId) => {
    return async dispatch => {
        try {
            const response = await axios.get('user/'+userId, getHeader(token));
            if(response.data) {
                return dispatch(setCurrentUser(response.data.user));
            }
        } catch(error) {
            dispatch(userFail(error));
            throw error;
        }
    }
}


export const fetchUser = (token, userId) => {
    return async dispatch => {
        try {
            const response = await axios.get('user/'+userId, getHeader(token));
            if(response.data) {
                return dispatch(setUser(response.data.user));
            }
        } catch(error) {
            dispatch(userFail(error));
            throw error;
        }
    }
}



export const setUsers = (users) => {
    const loadedUsers = [];
    for(let key in users) {
        loadedUsers.push(users[key]);
    }

    return {
        type: actionTypes.SET_USERS,
        users: loadedUsers,
    }
}


export const setCurrentUser = (user) => {
    return {
        type: actionTypes.SET_CURRENT_USER,
        currentUser: user,
    }
}

export const setUser = (user) => {
    return {
        type: actionTypes.SET_USER,
        user: user,
    }
}



export const updateCurrentUser = (token, userId, userData) => {
    return async dispatch => {
        try {
            const response = await axios.patch('user/'+userId, userData, getHeader(token, true));
            if(response.data) {
                console.log(response.data);
                dispatch(setCurrentUser(response.data.user));
                return response.data.user;
            }
        } catch(error) {
            dispatch(userFail(error));
            throw error;
        }
    }
}


export const setProfileImage = (imageFile) => {
    return {
        type: actionTypes.SET_PROFILE_IMAGE,
        profileImage: imageFile,
    }
}

export const unSetProfileImage = (imageFile) => {
    return {
        type: actionTypes.UNSET_PROFILE_IMAGE,
    }
}

export const setThemeIndex = (index) => {
    return {
        type: actionTypes.SET_THEME_INDEX,
        themeIndex: index,
    }
}


export const userFail = (error) => {
    return {
        type: actionTypes.USER_FAIL,
        error: error,
    }
}