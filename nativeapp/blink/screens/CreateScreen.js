import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import * as actions from '../store/index';

import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

import { Input } from 'react-native-elements';
import Colors from '../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import BaseUrl from '../constants/BaseUrl';

const CreateScreen = props => {
    const dispatch = useDispatch();

    const token = useSelector(state => state.ath.token);
    const userId = useSelector(state => state.ath.userId);

    const imageFile = props.navigation.getParam('imageFile');
    const [title, setTitle] = useState("");
    const [pushToken, setPushToken] = useState(null);

    useEffect(() => {
        if(!token) {
            props.navigation.navigate('auth');
        }
    }, [token]);

    useEffect(() => {
        props.navigation.setParams({
            create: create,
        });
    },[title]);


    useEffect(() => {
        Permissions.getAsync(Permissions.NOTIFICATIONS)
        .then((statusObj) => {
            if(statusObj.status !== 'granted') {
                return Permissions.askAsync(Permissions.NOTIFICATIONS);
            }
            return statusObj;
        })
        .then(({status}) => {
            if(status !== 'granted') {
                throw new Error("Permissions not granted!");
            }
        })
        .then(() => {
            return Notifications.getExpoPushTokenAsync();
        })
        .then(response => {
            console.log(response);
            const token = response.data;
            setPushToken(token);
        })
        .catch(error => {
            return null;
        });
    }, []);


    Notifications.setNotificationHandler({
        handleNotification: async () => {
            return {
                shouldShowAlert: true,
            }
        }
    });


    const triggerNotifications = (post) => {
        Notifications.scheduleNotificationAsync({
            content: {
                title: post.title,
                body: "New Post Created By you!",
                attachments: [
                    {
                        url: BaseUrl + post.imageUrl,
                        hideThumbnail: false,
                        thumbnailClipArea: {
                            x: 0,
                            y: 0,
                            width: 300,
                            height: 200,
                        }
                    },
                ],
                vibrate: 20,
                launchImageName: BaseUrl + post.imageUrl,
                priority: "high",
            },
            trigger: {
                seconds: 10,
            },
        });

        axios.post('https://exp.host/--/api/v2/push/send', {
            to: pushToken,
            title: post.title,
            body: `New Post added`,
        }, {
            headers: {
                'Accept': "application/json",
                'Accept-Encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
        })
    }


    const create = () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('image', imageFile);
        dispatch(actions.createPost(token, formData))
        .then(result => {
            console.log(result);
            triggerNotifications(result);
            props.navigation.popToTop();
        })
        .catch(error => {
            console.log(error);
        });
    }




    return (
        <View style={styles.root}>
            <ImageBackground 
                source={{uri: imageFile.uri}} 
                resizeMode="contain"
                resizeMethod="scale"
                style={styles.image}>
                    <View style={{flex: 1}}></View>
                    <View style={styles.titleInputContainer}>
                        <Input 
                            key="title"
                            value={title}
                            onChangeText={setTitle}
                            inputStyle={styles.input}
                            inputContainerStyle={styles.inputContainer}
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholder="Add Title"
                            placeholderTextColor="#f0f0f0"
                        />
                    </View>
            </ImageBackground>
        </View>
    );
}


CreateScreen.navigationOptions = navData => {
    return {
        headerTitle: "Create", 
        headerRight: (props) => (
            <Feather name="check" size={24} color={Colors.primary} onPress={navData.navigation.getParam('create')} />
        ),
        headerRightContainerStyle: {
            marginRight: 20,
        },
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        width: "100%",
        padding: 0,
        backgroundColor: Colors.blackish,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    titleInputContainer: {
        width: "100%",
        borderWidth: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,.5)",
        margin: 0,
        paddingTop: 10,
        paddingHorizontal: 20,
    },
    inputContainer: {
        height: 57,
        width: "100%",
        borderWidth: 0,
        borderBottomWidth: 0,
        alignItems: "center",
        margin: 0,
    },
    input: {
        color: "#fff",
    },
});


export default CreateScreen;