import React, { useEffect, useState } from 'react';
import axios from '../axios-config';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ImageBackground,
    FlatList,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import { Divider } from 'react-native-elements';

import { UIActivityIndicator } from 'react-native-indicators';

import Colors from '../constants/Colors';

import * as actions from '../store/index';

import PostTile from '../components/UI/PostTile';

import userData from '../data/User';
import BaseUrl from '../constants/BaseUrl';
import getHeader from '../constants/ApiHeader';
import Theme from '../constants/Theme';

const ProfileViewScreen = props => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.usr.user);
    const token = useSelector(state => state.ath.token);
    const userId = props.navigation.getParam('userId');

    const [userPosts, setUserPosts] = useState([]);
    const [userLikes, setUserLikes] = useState(0);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(!token) {
            props.navigation.navigate('auth');
        }
    }, [token]);


    useEffect(() => {
        dispatch(actions.fetchUser(token, userId))
        .then(result => {
            const response = axios.get('post/'+userId+'/posts', getHeader(token));
            return response;
        })
        .then(response => {
            setUserPosts(response.data.posts);
            const result = axios.get('like/user/'+userId+'/likes', getHeader(token));
            return result;
        })
        .then(response => {
            setUserLikes(response.data.userLikes);
            setIsLoading(false);
        })
        .catch(error => {
            console.log(error);
            setIsLoading(false);
        });
    },[]);


    const goToView = (postId) => {
        props.navigation.navigate('view', {
            postId: postId,
        });
    }

    const goBack = () => {
        props.navigation.goBack();
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
            <FlatList 
                keyExtractor={item => item._id.toString()}
                data={userPosts}
                renderItem={({item, index}) => (
                    <PostTile
                        id={item._id} 
                        title={item.title}
                        imageUrl={item.imageUrl}
                        onPress={goToView}
                    />
                )}
                numColumns={2}
                ListHeaderComponent={() => (
                    <View style={styles.themeContainer}>
                        <ImageBackground
                            source={Theme[user.themeIndex].themeImage}
                            resizeMode="cover"
                            style={styles.theme}
                        >
                            <View style={styles.profileOptions}>
                                <AntDesign name="arrowleft" size={28} color="#fff" onPress={goBack} />
                            </View>
                            <View style={styles.profileImageContainer}>
                                <Image
                                    source={ user.profileImageUrl ? {uri: BaseUrl + user.profileImageUrl} : require('../assets/user.png')} 
                                    style={styles.profileImage}
                                    resizeMode="cover"
                                />
                            </View>
                        </ImageBackground>
                        <View style={styles.userNameContainer}>
                            <Text style={styles.userName}>
                                {user.userName}
                            </Text>
                        </View>
                        <View style={styles.countPillContainer}>
                            <View style={styles.countPill}>
                                <View style={styles.photoCountContainer}>
                                    <Text style={styles.count}>
                                        {userPosts.length}{' '}
                                    </Text>
                                    <Text style={styles.countText}>
                                        photoes
                                    </Text>
                                </View>
                                <View style={styles.likeCountContainer}>
                                    <Text style={styles.count}>
                                        {userLikes}{' '}
                                    </Text>
                                    <Text style={styles.countText}>
                                        likes
                                    </Text>
                                </View>
                            </View>
                        <Divider 
                            style={{width: "90%"}}
                        />
                        </View>
                    </View>
                )}
                ListHeaderComponentStyle={styles.profileContainer}
            />
        </View>
    );
}


ProfileViewScreen.navigationOptions = navData => {
    return {
        headerShown: false,
    };
}


const styles = StyleSheet.create({
    root: {
        padding: 0,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    profileContainer: {
        height: 550,
    },
    profileOptions: {
        marginTop: 30,
        width: "100%",
        justifyContent: "flex-start",
        alignItems: "flex-end",
        flexDirection: "row",
        padding: 20,
    },
    themeContainer: {
        height: 300,
        width: "100%",
    },
    theme: {
        height: "100%",
        width: "100%",
    },
    themeOverlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    profileImageContainer: {
        height: 180,
        width: 180,
        borderRadius: 90,
        borderWidth: 0.5,
        overflow: "hidden",
        position: "absolute",
        bottom: -40,
        left: "27%",
        backgroundColor: Colors.background,
    },
    profileImage: {
        width: "100%",
        height: "100%",
    },
    userNameContainer: {
        marginTop: 70,
        justifyContent: "center",
        alignItems: "center",
    },
    userName: {
        fontSize: 30,
    },
    countPillContainer: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    countPill: {
        width: "80%",
        marginVertical: 30,
        borderRadius: 40,
        borderWidth: 0.5,
        borderColor: Colors.secondary,
        flexDirection: "row",
        paddingHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    photoCountContainer: {
        width: "50%",
        flexDirection: "row",
        borderRightWidth: 0.5,
        paddingHorizontal: 30,
        paddingVertical: 15,
        alignItems: "center",
    },
    likeCountContainer: {
        width: "50%",
        flexDirection: "row",
        padding: 10,
        paddingHorizontal: 30,
        paddingVertical: 15,
        alignItems: "center",
    },
    count: {
        color: Colors.primary,
        fontSize: 20,
    },
    countText: {
        fontSize: 18,
    },
});


export default ProfileViewScreen;