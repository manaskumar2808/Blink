import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

const CameraView = props => {
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    
    const [imageUrl, setImageUrl] = useState("");
    const [image, setImage] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);

    let ref;
    const iconSize = 40;

    const [hasPermission, setHasPermission] = useState(null);

    useEffect(() => {
        (async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        })();
    }, []);

    const toggleType = () => {
        setType(prevState => prevState === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
    }

    const toggleFlash = () => {
        setFlash(prevState => prevState === Camera.Constants.FlashMode.on ? Camera.Constants.FlashMode.off : Camera.Constants.FlashMode.on);
    }

    const getFileName = (fileUri) => {
        const uriArray = fileUri.split('/');
        return uriArray.slice(-1)[0];
    }

    const takePic = async () => {
        const photo = await cameraRef.takePictureAsync({
            quality: 1,
        });
        setImageUrl(photo.uri);
        setImage(photo);
        if(props.goToView) {
            props.goToView({
                uri: photo.uri,
                name: getFileName(photo.uri),
                type: 'image/png',
            });
        } else if(props.goBack) {
            props.setImageFile({
                uri: photo.uri,
                name: getFileName(photo.uri),
                type: 'image/png',
            });
            props.goBack();
        }
    }


    return (
        <View style={styles.root}>
            <Camera 
                type={type}
                flashMode={flash}
                ref={ref => setCameraRef(ref)}
                style={styles.camera}
            >
                <View style={styles.header}>
                    <View style={styles.icon}>
                        <Ionicons name="grid" size={28} color="#fff" onPress={props.switchMode} />
                    </View>
                </View>
                <View style={styles.main}></View>
                <View style={styles.footer}>
                    <View style={styles.icon}>
                        <Ionicons name="flash" size={iconSize} color="#fff" onPress={toggleFlash} />
                    </View>
                    <TouchableWithoutFeedback onPress={takePic}>
                        <View style={styles.capture}>

                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.icon}>
                        <Ionicons name="camera-reverse" size={iconSize} color="#fff" onPress={toggleType} />
                    </View>
                </View>
            </Camera>
        </View>
    );
}


CameraView.propTypes = {
    goToView: PropTypes.func,
    goBack: PropTypes.func,
    switchMode: PropTypes.func,
    setImageFile: PropTypes.func,
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        width: "100%",
    },
    camera: {
        width: "100%",
        flex: 1,
    },
    header: {
        padding: 50,
        paddingTop: 60,
    },
    main: {
        flex: 1,
    },
    footer: {
        marginVertical: 80,
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "row",
    },
    capture: {
        height: 80,
        width: 80,
        borderRadius: 40,
        borderWidth: 5,
        borderColor: "#fff",
    },
    icon: {

    },
});

export default CameraView;