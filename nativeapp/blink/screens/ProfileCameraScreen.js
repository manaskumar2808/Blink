import React, { useState ,useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import { withNavigationFocus } from 'react-navigation';

import CameraView from '../components/CameraView';
import GalleryView from '../components/GalleryView';

import * as actions from '../store/index';

const ProfileCameraScreen = props => {
    const dispatch = useDispatch();

    const [cameraMode, setCameraMode] = useState(true);
    // const [imageFile, setImageFile] = useState(null);

    const token = useSelector(state => state.ath.token);

    useEffect(() => {
        console.log(props.navigation);
    }, []);

    useEffect(() => {
        if(!token) {
            props.navigation.navigate('auth');
        }
    }, [token]);

    const goBack = () => {
        props.navigation.goBack();
    }

    const switchMode = () => {
        setCameraMode(prevState => !prevState);
    }

    const setImageFile = (imageFile) => {
        dispatch(actions.setProfileImage(imageFile));
    }


    const { isFocused } = props;

    return (
        <View style={styles.root}>
            {
                isFocused ?
                cameraMode ? 
                <CameraView 
                    goBack={goBack}
                    setImageFile={setImageFile}
                    switchMode={switchMode}
                />
                 :
                <GalleryView 
                    goBack={goBack}
                    setImageFile={setImageFile}
                    switchMode={switchMode}
                />
                : null
            }
        </View>
    );
}

ProfileCameraScreen.navigationOptions = navData => {
    return {
        headerTitle: "Profile Pic",
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    }
});


export default withNavigationFocus(ProfileCameraScreen);