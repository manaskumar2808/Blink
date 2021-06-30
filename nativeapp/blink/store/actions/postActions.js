import axios from '../../axios-config';
import getHeader from '../../constants/ApiHeader';
import * as actionTypes from '../actionTypes';

export const fetchPosts = (token, page) => {
    return async dispatch => {
        try {
            const response = await axios.get('post/?page='+page.toString(), getHeader(token));
            if(response.data) {
                console.log('totalPosts : ', response.data.totalPosts);
                if(page == 1) {
                    dispatch(refreshPosts(response.data.posts, response.data.totalPosts));
                } else {
                    dispatch(setPosts(response.data.posts, response.data.totalPosts));
                }
            }
        } catch(error) {
            dispatch(postFail(error));
            throw error;
        }
    }
}


export const fetchUserPosts = (token, userId) => {
    return async dispatch => {
        try {
            const response = await axios.get('post/'+userId+'/posts', getHeader(token));
            if(response.data) {
                return dispatch(setUserPosts(response.data.posts));
            }
        } catch(error) {
            dispatch(postFail(error));
            throw error;
        }
    }
}




export const fetchPost = (token, postId) => {
    return async dispatch => {
        try {
            const response = await axios.get('post/'+postId, getHeader(token));
            if(response.data) {
                dispatch(setPost(response.data.post));
                return response.data.post;
            }
        } catch(error) {
            dispatch(postFail(error));
            throw error;
        }
    }
}

export const refreshPosts = (posts, totalPosts) => {
    const loadedPosts = [];
    for(let key in posts) {
        loadedPosts.push(posts[key]);
    }

    return {
        type: actionTypes.REFRESH_POSTS,
        posts: loadedPosts,
        totalPosts: totalPosts,
    }
}



export const setPosts = (posts, totalPosts) => {
    const loadedPosts = [];
    for(let key in posts) {
        loadedPosts.push(posts[key]);
    }

    return {
        type: actionTypes.SET_POSTS,
        posts: loadedPosts,
        totalPosts: totalPosts,
    }
}


export const setUserPosts = (posts) => {
    const loadedPosts = [];
    for(let key in posts) {
        loadedPosts.push(posts[key]);
    }

    return {
        type: actionTypes.SET_USER_POSTS,
        userPosts: loadedPosts,
    }
}


export const setPost = (post) => {
    return {
        type: actionTypes.SET_POST,
        post: post,
    }
}


export const createPost = (token, postData) => {
    return async dispatch => {
        try {
            const response = await axios.post('post/create', postData, getHeader(token, true));
            if(response.data) {
                console.log(response.data);
                dispatch(postSuccess());
                return response.data.post;
            }
        } catch(error) {
            dispatch(postFail(error));
            throw error;
        }
    }
}


export const updatePost = (token, postId, postData) => {
    return async dispatch => {
        try {
            const response = await axios.patch('post/'+postId, postData, getHeader(token, true));
            if(response.data) {
                console.log(response.data);
                dispatch(postSuccess());
                return response.data.post;
            }
        } catch(error) {
            dispatch(postFail(error));
            throw error;
        }
    }
}


export const deletePost = (token, postId) => {
    return async dispatch => {
        try {
            const response = await axios.delete('post/'+postId, getHeader(token));
            if(response.data) {
                console.log(response.data);
                dispatch(postSuccess());
                return response.data;
            }
        } catch(error) {
            dispatch(postFail(error));
            throw error;
        }
    }
}


export const postSuccess = () => {
    return {
        type: actionTypes.POST_SUCCESS,
    }
}


export const postFail = (error) => {
    return {
        type: actionTypes.POST_FAIL,
        error: error,
    }
}


