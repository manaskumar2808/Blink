import React, { useEffect, useState } from 'react';
import axios from '../axios-config';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableWithoutFeedback,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import * as FileSystem from 'expo-file-system';

import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { UIActivityIndicator } from 'react-native-indicators';

import CircularProfileItem from '../components/CircularProfileItem';
import Colors from '../constants/Colors';

import * as actions from '../store/index';

import postData from '../data/Post';
import userData from '../data/User';
import baseUrl from '../constants/BaseUrl';
import getHeader from '../constants/ApiHeader';

const DetailScreen = props => {
    const dispatch = useDispatch();
    const postId = props.navigation.getParam('postId');

    // const post = useSelector(state => state.pst.post);
    const [post, setPost] = useState(null);

    const token = useSelector(state => state.ath.token);

    const [isLoading, setIsLoading] = useState(true);
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [likes, setLikes] = useState(0);

    
    useEffect(() => {
        if(!token) {
            props.navigation.navigate('auth');
        }
    }, [token]);

    useEffect(() => {
        dispatch(actions.fetchPost(token, postId))
        .then(result => {
            setPost(result);
            const response = axios.get(baseUrl + 'like/'+postId+'/likes', getHeader(token));
            return response;
        })
        .then(response => {
            setLikes(response.data.likes);
            const result = axios.get(baseUrl + 'like/'+postId+'/is-liked', getHeader(token));
            return result;
        })
        .then(response => {
            setIsLiked(response.data.isLiked);
            const result = axios.get(baseUrl + 'save/' + postId + '/is-saved', getHeader(token));
            return result;
        })
        .then(response => {
            setIsSaved(response.data.isSaved);
            setIsLoading(false);
        })
        .catch(error => {
            setIsLoading(false);
            console.log(error);
        });
    }, [dispatch]);

    const iconSize = 27;


    const getFileName = (fileUri) => {
        const uriArray = fileUri.split('/');
        return uriArray.slice(-1)[0];
    }


    const downloadResumable = post ? FileSystem.createDownloadResumable(baseUrl + post.imageUrl, FileSystem.documentDirectory + getFileName(baseUrl + post.imageUrl)) : null;

    const download = async () => {
        try {
            const result = await downloadResumable.downloadAsync();
            console.log('finished downloading file : ', result.uri);
        } catch(error) {
            console.log(error);
        }
    }

    const like = () => {
        if(isLiked) {
            setIsLiked(false);
            setLikes(prevState => prevState - 1);
            axios.delete(baseUrl + 'like/' + postId + '/unlike', getHeader(token))
            .then(response => {
                if(response.status !== 200) {
                    const error = new Error("Cannot unlike the post at the moment!");
                    error.statusCode = 422;
                    throw error;
                }
                console.log(response.data);
            })
            .catch(error => {
                setIsLiked(true);
                setLikes(prevState => prevState + 1);
                console.log(error);
            });
        } else {
            setIsLiked(true);
            setLikes(prevState => prevState + 1);
            axios.post(baseUrl + 'like/', {
                postId: postId,
            }, getHeader(token))
            .then(response => {
                if(response.status !== 200) {
                    const error = new Error("Cannot unlike the post at the moment!");
                    error.statusCode = 422;
                    throw error;
                }
                console.log(response.data);
            })
            .catch(error => {
                setIsLiked(false);
                setLikes(prevState => prevState - 1);
                console.log(error);
            });
        }
    }

    const save = () => {
        if(isSaved) {
            setIsSaved(false);
            axios.delete(baseUrl + 'save/' + postId + '/unsave', getHeader(token))
            .then(response => {
                if(response.status !== 200) {
                    const error = new Error("Cannot unsave the post at the moment!");
                    error.statusCode = 422;
                    throw error;
                }
                console.log(response.data);
            })
            .catch(error => {
                setIsSaved(true);
                console.log(error);
            });
        } else {
            setIsSaved(true);
            axios.post(baseUrl + 'save/', {
                postId: postId,
            }, getHeader(token))
            .then(response => {
                if(response.status !== 200) {
                    const error = new Error("Cannot unsave the post at the moment!");
                    error.statusCode = 422;
                    throw error;
                }
                console.log(response.data);
            })
            .catch(error => {
                setIsSaved(false);
                console.log(error);
            });
        }
    }

    const goToProfileView = (userId) => {
        props.navigation.navigate('profileView', {
            userId,
        });
    }


    if(isLoading) {
        return (
            <View style={styles.loaderContainer}>
                <UIActivityIndicator 
                    size={30}
                    color={Colors.primary}
                />
            </View>
        );
    }

    return (
        <View style={styles.root}>
            <ImageBackground
                source={{uri: baseUrl + post.imageUrl}}
                style={styles.image}
                resizeMode="contain"
            >
                <View style={{flex: 1}}></View>
                <View style={styles.infoContainer}>
                    <TouchableWithoutFeedback onPress={() => goToProfileView(post.creator._id)}>
                        <View style={styles.infoHeader}>
                            <CircularProfileItem 
                                imageUrl={baseUrl + post.creator.profileImageUrl}
                                radius={40}
                            />
                            <View style={styles.userInfoContainer}>
                                <Text style={styles.userName}>
                                    {post.creator.userName}
                                </Text>
                                <Text style={styles.email}>
                                    {post.creator.email}
                                </Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.infoBody}>
                        <Text style={styles.title}>
                            {post.title}
                        </Text>
                        <Text style={styles.timestamp}>
                            Posted on {moment(post.createdAt).format('lll')}
                        </Text>
                    </View>
                    <View style={styles.infoFooter}>
                        <View style={styles.iconContainer}>
                            <AntDesign name={isLiked ? "heart" : "hearto"} size={iconSize} color="#fff" onPress={like} />
                        </View>
                        <View style={styles.iconContainer}>
                            <AntDesign name="download" size={iconSize} color="#fff" onPress={download} />
                        </View>
                        <View style={styles.iconContainer}>
                            <FontAwesome name={isSaved ? "bookmark" : "bookmark-o"} size={iconSize} color="#fff" onPress={save} />
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}


DetailScreen.navigationOptions = navData => {
    return {
        headerTitle: "Viewer",
    }
}

const styles = StyleSheet.create({
    root: {
       flex: 1, 
       backgroundColor: Colors.blackish,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.blackish,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    infoContainer: {
        backgroundColor: "rgba(0,0,0,.5)",
        padding: 20,
    },
    infoHeader: {
        flexDirection: "row",
        alignItems: "center",
    },
    infoBody: {
        marginVertical: 10,
    },
    infoFooter: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 30,
    },
    userInfoContainer: {
        marginLeft: 10,
    },
    userName: {
        color: "#fff",
        fontSize: 21,
        fontWeight: "400",
    },
    email: {
        color: Colors.primary,
        fontSize: 16,
        fontWeight: "400",
    },
    title: {
        color: "#fff",
        fontSize: 25,
        fontWeight: "600",
    },
    timestamp: {
        color: "#fff",
    },
    iconContainer: {
        marginHorizontal: 80,
    },
});


export default DetailScreen;