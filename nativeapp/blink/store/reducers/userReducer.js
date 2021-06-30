import * as actionTypes from '../actionTypes';

const initialState = {
    users: [],
    user: null,
    currentUser: null,
    error: null,
    profileImage: null,
    themeIndex: null,
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_USERS: 
            return {
                ...state,
                users: action.users,
                error: null,
            }
        case actionTypes.SET_USER: 
            return {
                ...state,
                user: action.user,
                error: null,
            }
        case actionTypes.SET_CURRENT_USER: 
            return {
                ...state,
                currentUser: action.currentUser,
                error: null,
            }
        case actionTypes.SET_PROFILE_IMAGE:
            return {
                ...state,
                profileImage: action.profileImage,
            }
        case actionTypes.UNSET_PROFILE_IMAGE:
            return {
                ...state,
                profileImage: null,
            }
        case actionTypes.SET_THEME_INDEX:
            return {
                ...state,
                themeIndex: action.themeIndex,
            }
        case actionTypes.USER_FAIL:
            return {
                ...state,
                error: action.error,
            }
        default:
            return state;
    }
}

export default reducer;