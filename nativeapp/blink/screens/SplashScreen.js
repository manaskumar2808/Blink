import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { useDispatch } from 'react-redux';

import AppConfig from '../constants/AppConfig';
import Colors from '../constants/Colors';
import * as actions from '../store/index';

const SplashScreen = props => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.autoLogin())
        .then(result => {
            const isAuthenticated = result;
            if(isAuthenticated) {
                props.navigation.navigate('app');
            } else {
                props.navigation.navigate('auth');
            }
        }).catch(error => {
            props.navigation.navigate('auth');
        });
    });

    return (
        <View style={styles.root}>
            <Text style={styles.appName}>
                {AppConfig.appName}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        width: "100%",
        backgroundColor: Colors.background,
        justifyContent: "center",
        alignItems: "center",
    },
    appName: {
        fontFamily: AppConfig.fontFamily,
        fontSize: 80,
        color: Colors.blackish,
    },
});


export default SplashScreen;