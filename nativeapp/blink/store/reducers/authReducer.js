import * as actionTypes from '../actionTypes';

const initialState = {
    token: null,
    userId: null,
    expiryDate: null,
    error: null,
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_SUCCESS : 
            return {
                ...state,
                token: action.token,
                userId: action.userId,
                expiryDate: action.expiryDate,
            }
        case actionTypes.AUTH_LOGOUT: 
            return {
                ...state,
                token: null,
                userId: null,
                expiryDate: null,
            }
        case actionTypes.AUTH_FAIL: 
            return {
                ...state,
                token: null,
                userId: null,
                expiryDate: null,
                error: action.error,
            }
        default:
            return state;
    }
}

export default reducer;