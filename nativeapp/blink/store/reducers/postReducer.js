import * as actionTypes from '../actionTypes';

const initialState = {
    posts: [],
    userPosts: [],
    post: null,
    totalPosts: null,
    error: null,
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_POSTS:
            return {
                ...state,
                posts: [...state.posts, ...action.posts],
                totalPosts: action.totalPosts,
                error: null,
            }
        case actionTypes.REFRESH_POSTS:
            return {
                ...state,
                posts: action.posts,
                totalPosts: action.totalPosts,
                error: null,
            }
        case actionTypes.SET_USER_POSTS:
            return {
                ...state,
                userPosts: action.userPosts,
                error: null,
            }
        case actionTypes.SET_POST: 
            return {
                ...state,
                post: action.post,
                error: null,
            }
        case actionTypes.POST_SUCCESS:
            return {
                ...state,
                error: null,
            }
        case actionTypes.POST_FAIL:
            return {
                ...state,
                error: action.error,
            }
        default: 
            return state;
    }
}

export default reducer;