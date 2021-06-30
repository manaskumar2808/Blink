import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { useSelector } from 'react-redux';

import CameraView from '../components/CameraView';
import GalleryView from '../components/GalleryView';

const PostCameraScreen = props => {
    const [cameraMode, setCameraMode] = useState(true);
    const token = useSelector(state => state.ath.token);

    useEffect(() => {
        if(!token) {
            props.navigation.navigate('auth');
        }
    }, [token]);

    const goToView = (imageFile) => {
        props.navigation.navigate('view', {
           imageFile: imageFile, 
        });
    }

    const switchMode = () => {
        setCameraMode(prevState => !prevState);
    }

    const { isFocused } = props;

    return (
        <View style={styles.root}>
            {
                isFocused ?
                cameraMode ? 
                <CameraView 
                    goToView={goToView}
                    switchMode={switchMode}
                />
                 :
                <GalleryView 
                    goToView={goToView}
                    switchMode={switchMode}
                />
                : null
            }
        </View>
    );
}

PostCameraScreen.navigationOptions = navData => {
    return {
        headerShown: false,
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    }
});


export default withNavigationFocus(PostCameraScreen);