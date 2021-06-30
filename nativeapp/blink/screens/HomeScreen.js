import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ScrollView,
    SafeAreaView
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import * as actions from '../store/index';

import { Feather } from '@expo/vector-icons';
import { UIActivityIndicator } from 'react-native-indicators';

import TabPills from '../components/TabPills';
import PostTile from '../components/UI/PostTile';

import AppConfig from '../constants/AppConfig';

import postData from '../data/Post';
import Colors from '../constants/Colors';

import Masonry from 'react-native-masonry-layout';

const HomeScreen = props => {
    const dispatch = useDispatch();

    const token = useSelector(state => state.ath.token);
    const userId = useSelector(state => state.ath.userId);
    const posts = useSelector(state => state.pst.posts);
    const totalPosts = useSelector(state => state.pst.totalPosts);

    const [postList, setPostList] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const [onEndReachedCalledDuringMomentum , setOnEndReachedCalledDuringMomentum ] = useState(true);

    const [page, setPage] = useState(1);

    const perPage = 8;
    // let page = 1;

    const ref = useRef("masonry");

    const [masonryRef, setMasonryRef] = useState(null);


    useEffect(() => {
        if(!token) {
            props.navigation.navigate('auth');
        }
    }, [token]);


    useEffect(() => {
        props.navigation.setParams({
            'goToSearch': goToSearch,
        });

        dispatch(actions.fetchCurrentUser(token, userId))
        .then(result => {
            return dispatch(actions.fetchPosts(token, page));
        })
        .then(result => {
            if(posts) {
                setIsLoading(false);
            }
        })
        .catch(error => {
            console.log(error);
            setIsLoading(false);
        });
    },[dispatch]);


    useEffect(() => {
        if(posts) {
            setPostList[posts];
        } 
    },[posts]);


    useEffect(() => {
        console.log('page : ', page);
        if(page != 1) {
            loadMorePosts(page);
        }
    }, [page]);

    
    const nextPageFetch = () => {
        if(!onEndReachedCalledDuringMomentum) {
            console.log('nextPageFetch Called page = ', page);
            setPage(prevState => prevState + 1);
            setOnEndReachedCalledDuringMomentum(true);
        }
    } 

    const fetchPosts = (pageNo) => {
        console.log('fetching page no. : ', pageNo);
        setRefreshing(true);
        dispatch(actions.fetchPosts(token, pageNo))
        .then(posts => {
            setRefreshing(false);
        })
        .catch(error => {
            setRefreshing(false);
        });
    } 

    const loadMorePosts = (pageNo) => {
        console.log('fetching page no. : ', pageNo);
        dispatch(actions.fetchPosts(token, pageNo))
        .then(posts => {

        })
        .catch(error => {

        });
    } 




    const goToSearch = () => {
        props.navigation.navigate('search');
    }

    const goToView = (postId) => {
        props.navigation.navigate('view', {
            postId: postId,
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
            <View style={styles.postContainer}>
                <FlatList
                    keyExtractor={item => item._id} 
                    data={posts}
                    refreshing={refreshing}
                    onRefresh={() => fetchPosts(1)}
                    numColumns={2}
                    renderItem={({item, index}) => {
                        return (
                        <PostTile
                            id={item._id.toString()} 
                            title={item.title}
                            imageUrl={item.imageUrl}
                            onPress={goToView}
                        />
                    )}}
                    showsVerticalScrollIndicator={false}
                    onEndReached={nextPageFetch}
                    onEndReachedThreshold={0.1}
                    onMomentumScrollEnd={() => setOnEndReachedCalledDuringMomentum(false)}
                    ListHeaderComponent={() => (
                        <View>
                            <TabPills />
                            <View style={styles.legendContainer}>
                                <Text style={styles.legend}>
                                    Top Snaps on Blink
                                </Text>
                            </View>
                        </View>
                    )}
                />
            </View>
        </View>
    );
}


HomeScreen.navigationOptions = navData => {
    return {
        headerTitle: "Blink",
        headerTitleStyle: {
            color: "#fff",
            fontFamily: AppConfig.fontFamily,
            fontSize: 30,
            fontWeight: "500",
        },
        headerRight: (props) => (
            <Feather name="search" size={24} color="#fff" onPress={navData.navigation.getParam('goToSearch')} />
        ),
        headerRightContainerStyle: {
            marginRight: 20,
        },
    }
}


const styles = StyleSheet.create({
    root: {
        backgroundColor: Colors.background,
        flex: 1,
    },
    postContainer: {
        width: "100%",
    },
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    legendContainer: {
        padding: 20,
    },
    legend: {
        fontSize: 30,
    },
});


export default HomeScreen;