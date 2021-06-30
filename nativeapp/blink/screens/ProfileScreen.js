import React, { useEffect, useState } from 'react';
import axios from '../axios-config';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ImageBackground,
    FlatList,
    TouchableWithoutFeedback,
    TouchableNativeFeedback,
} from 'react-native';
import { Button } from 'react-native-elements';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import { UIActivityIndicator } from 'react-native-indicators';

import Colors from '../constants/Colors';

import * as actions from '../store/index';

import PostTile from '../components/UI/PostTile';

import postData from '../data/Post';
import userData from '../data/User';
import bookmarkData from '../data/Bookmark';
import { useDispatch, useSelector } from 'react-redux';
import BaseUrl from '../constants/BaseUrl';
import getHeader from '../constants/ApiHeader';
import Theme from '../constants/Theme';

const ProfileScreen = props => {
    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.usr.currentUser);
    const token = useSelector(state => state.ath.token);
    const userId = useSelector(state => state.ath.userId);

    const userPosts = useSelector(state => state.pst.userPosts);
    const [userSaves, setUserSaves] = useState([]);
    const [userLikes, setUserLikes] = useState(0);

    const [isLoading, setIsLoading] = useState(true);

    const [tabIndex, setTabIndex] = useState(0);

    useEffect(() => {
        if(!token) {
            props.navigation.navigate('auth');
        }
    }, [token]);


    useEffect(() => {
        dispatch(actions.fetchCurrentUser(token, userId))
        .then(result => {
            return dispatch(actions.fetchUserPosts(token, userId));
        })
        .then(result => {
            const response = axios.get('save/saves', getHeader(token));
            return response;
        })
        .then(response => {
            setUserSaves(response.data.saves);
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


    const photoTabStyle = [styles.tab];
    const bookmarkTabStyle = [styles.tab];

    const photoTabContainerStyle = [styles.tabContainer];
    const bookmarkTabContainerStyle = [styles.tabContainer];

    if(tabIndex) {
        bookmarkTabStyle.push(styles.activeTab);
        bookmarkTabContainerStyle.push(styles.activeTabContainer);
    } else {
        photoTabStyle.push(styles.activeTab);
        photoTabContainerStyle.push(styles.activeTabContainer);
    }

    const goToEditProfile = () => {
        console.log('editProfile click');
        props.navigation.navigate('editProfile');
    }

    const goToView = (postId) => {
        props.navigation.navigate('view', {
            postId: postId,
        });
    }

    const logout = () => {
        dispatch(actions.logout())
        .then(result => {
            props.navigation.navigate('auth');
        })
        .catch(error => {
            console.log(error);
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
            <FlatList 
                keyExtractor={item => item._id.toString()}
                data={ tabIndex == 0 ? userPosts : userSaves}
                renderItem={({item, index}) => tabIndex == 0 ? (
                    <PostTile
                        id={item._id.toString()} 
                        title={item.title}
                        imageUrl={item.imageUrl}
                        onPress={goToView}
                    />
                ) : (
                    <PostTile
                        id={item.post._id} 
                        title={item.post.title}
                        imageUrl={item.post.imageUrl}
                        onPress={goToView}
                    />
                )}
                numColumns={2}
                ListHeaderComponent={() => (
                    <View style={styles.themeContainer}>
                        <ImageBackground
                            source={Theme[currentUser.themeIndex || 0].themeImage}
                            resizeMode="cover"
                            style={styles.theme}
                        >
                            <View style={styles.profileOptions}>
                                <AntDesign name="logout" size={24} color={Colors.danger} onPress={logout} />
                                <TouchableNativeFeedback onPress={goToEditProfile}>
                                    <FontAwesome5 name="user-edit" size={24} color="#fff" />
                                </TouchableNativeFeedback>
                            </View>
                            <View style={styles.profileImageContainer}>
                                <TouchableNativeFeedback onPress={goToEditProfile}>
                                    <Image
                                        source={ currentUser.profileImageUrl ? {uri: BaseUrl + currentUser.profileImageUrl} : require('../assets/user.png')} 
                                        style={styles.profileImage}
                                        resizeMode="cover"
                                    />
                                </TouchableNativeFeedback>
                            </View>
                        </ImageBackground>
                        <View style={styles.userNameContainer}>
                            <Text style={styles.userName}>
                                {currentUser.userName}
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
                        </View>
                        <View style={styles.tabBarContainer}>
                            <View style={styles.tabBar}>
                                <View style={photoTabContainerStyle}>
                                    <TouchableWithoutFeedback onPress={() => setTabIndex(0)}>
                                        <Text style={photoTabStyle}>
                                            Photoes
                                        </Text>
                                    </TouchableWithoutFeedback>
                                </View>
                                <View style={bookmarkTabContainerStyle}>
                                    <TouchableWithoutFeedback onPress={() => setTabIndex(1)}>
                                        <Text style={bookmarkTabStyle}>
                                            Bookmarks
                                        </Text>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </View>
                    </View>
                )}
                ListHeaderComponentStyle={styles.profileContainer}
            />
        </View>
    );
}


ProfileScreen.navigationOptions = navData => {
    return {
        headerShown: false,
    };
}


const styles = StyleSheet.create({
    root: {
        padding: 0,
        backgroundColor: Colors.background,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    profileContainer: {
        height: 580,
    },
    profileOptions: {
        marginTop: 30,
        width: "100%",
        justifyContent: "space-between",
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
        backgroundColor: "#969696",
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
    tabBarContainer: {
        width: "100%",
        marginBottom: 30,
        paddingHorizontal: 20,
    },
    tabBar: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        borderTopColor: Colors.secondary,
        borderTopWidth: 0.5,
    },
    tabContainer: {
        padding: 15,
    },
    tab: {
        fontSize: 17,
        color: Colors.secondary,
    },
    activeTabContainer: {
        borderTopColor: Colors.primary,
        borderTopWidth: 1,
    },
    activeTab: {
        color: Colors.primary,
    },
});


export default ProfileScreen;