import React, { useEffect, useState } from 'react';
import axios from '../axios-config';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Keyboard,
    Dimensions,
    TouchableWithoutFeedback
} from 'react-native';
import { Divider } from 'react-native-elements';
import { useSelector } from 'react-redux';
import InputTile from '../components/UI/InputTile';

import PostTile from '../components/UI/PostTile';
import SearchTile from '../components/UI/SearchTile';
import Colors from '../constants/Colors';

import ScalableImage from 'react-native-scalable-image';

import postData from '../data/Post';
import BaseUrl from '../constants/BaseUrl';
import { SafeAreaView } from 'react-native-safe-area-context';

const SearchScreen = props => {
    const [search, setSearch] = useState("");
    const [searchData, setSearchData] = useState([]);

    const token = useSelector(state => state.ath.token);
    const posts = useSelector(state => state.pst.posts);

    useEffect(() => {
        if(!token) {
            props.navigation.navigate('auth');
        }
    }, [token])

    // useEffect(() => {
    //     if(search.trim().length > 0) {
    //         const filteredPosts = posts.filter(post => post.title.toLowerCase() === search.toLowerCase());
    //         if(filteredPosts.length >= 0) {
    //             setSearchData(filteredPosts);
    //         }
    //     }
    // },[search]);


    useEffect(() => {
        if(search.trim().length > 0) {
            axios.get('post/search/?title=' + search.toLowerCase())
            .then(response => {
                console.log(response.data);
                setSearchData(response.data.searchedPosts);
            })
            .catch(error => {
                console.log(error);
            });
        }
    },[search]);

    const goToView = (postId) => {
        props.navigation.navigate('view', {
            postId: postId,
        });
    }


    return (
        <View style={styles.root}>
                <View style={styles.header}>
                    <SearchTile value={search} setValue={setSearch} />
                    <Divider 
                        style={styles.divider}
                    />
                </View>
                {
                    searchData.length === 0 ? 
                    <View style={styles.placeholderContainer}>
                        <Text style={styles.placeolder}>
                            No Related Results
                        </Text>
                    </View> : null
                }
                <FlatList 
                    keyExtractor={item => item._id}
                    data={searchData}
                    numColumns={1}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item, index}) => (
                        // <PostTile 
                        //     id={item._id}
                        //     title={item.title}
                        //     imageUrl={item.imageUrl}
                        //     onPress={goToView}
                        // />
                        <View style={styles.imageContainer}>
                            <TouchableWithoutFeedback onPress={() => goToView(item._id)}>
                                <ScalableImage 
                                    source={{uri: BaseUrl + item.imageUrl}}
                                    width={Dimensions.get('window').width*(90/100)}
                                    style={styles.image}
                                />
                            </TouchableWithoutFeedback>
                        </View>
                    )}
                />
        </View>
    );
}

SearchScreen.navigationOptions = navData => {
    return {
        headerTitle: "Search",
    }
}

const styles = StyleSheet.create({
    root: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    }, 
    header: {
        width: 90,
        width: "100%",
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    divider: {
        width: "90%",
    },
    imageContainer: {
        marginBottom: 20,
    },
    image: {
        borderRadius: 10,
        borderWidth: 0.5,
    },
    placeholderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    placeolder: {
        color: "#9c9c9c",
        fontSize: 20,
    },
    searchList: {

    }
});


export default SearchScreen;