import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Platform,
} from 'react-native';
import { Button } from 'react-native-elements';
import { Feather, AntDesign } from '@expo/vector-icons';

import ScalableImage from 'react-native-scalable-image';

import * as ImagePicker from 'expo-image-picker';
import Colors from '../constants/Colors';

const GalleryView = props => {
    const [profileImageUrl, setProfileImageUrl] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [videoFile, setVideoFile] = useState(null);


    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
    }, []);



    const setImage = () => {
        if(props.isProfileImage) {
            props.setProfileImage(imageFile);
        } else if(props.goToView) {
            props.goToView(imageFile);
        } else if(props.goBack) {
            props.setImageFile({
                uri: imageFile.uri,
                name: getFileName(imageFile.uri),
                type: 'image/png',
            });
            props.goBack();
        }
    }

    const setVideo = () => {
        props.setVideo(videoFile);
        props.closeGallery();
    }

    const setMedia = () => {
        if(videoFile) {
            setVideo();
        } else if(imageFile) {
            setImage();
        }
    }

    const getFileName = (fileUri) => {
        const uriArray = fileUri.split('/');
        return uriArray.slice(-1)[0];
    }


    const pickMedia = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1, 
            allowsMultipleSelection: false, 
        });
        if(!result.cancelled) {
            if(result.type === "image"){
                setProfileImageUrl(result.uri);
                setImageFile({
                    uri: result.uri,
                    name: getFileName(result.uri),
                    type: 'image/png',
                });
            } else if(result.type === "video") {
                setVideoUrl(result.uri);
                setVideoFile(result);
            }
        }
    }


    return (
        <View style={styles.root}>
            <View style={styles.header}>
                <View style={styles.icon}>
                    <Feather name="camera" size={28} color="black" onPress={props.switchMode} />
                </View>
            </View>
            <View style={styles.imageContainer}>
                {
                    profileImageUrl && profileImageUrl.trim().length > 0 ? 
                    <ScalableImage 
                        source={{ uri: profileImageUrl }} 
                        style={styles.image} 
                        width={350}
                    /> : 
                        null
                }
            </View>
            <View style={styles.buttonSection}>
                <View style={styles.buttonContainer}>
                    <Button title="Choose Photo" type="solid" buttonStyle={styles.button} onPress={pickMedia} />
                </View>
                <View style={styles.nextButtonContainer}>
                    <Button 
                        type="outline"   
                        buttonStyle={styles.nextButton} 
                        onPress={setMedia} 
                        titleStyle={{color: "#fff"}} 
                        icon={() => (
                            <AntDesign name="arrowright" size={24} color="#fff" />
                        )}
                    />
                </View>
            </View>
        </View>
    );
}

GalleryView.propTypes = {
    isProfileImage: PropTypes.bool,
    closeGallery: PropTypes.func,
    setImage: PropTypes.func,
    setVideo: PropTypes.func,
    setProfileImage: PropTypes.func,
    goToView: PropTypes.func,
    goBack: PropTypes.func,
    switchMode: PropTypes.func,
    setImageFile: PropTypes.func,
}


const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    header: {
        width: "100%",
        padding: 30,
    },
    imageContainer: {
        height: 450,
        width: 350,
        borderWidth: 0,
        borderColor: Colors.blackish,
        borderRadius: 5,
        overflow: "hidden",
        marginVertical: 10,
        backgroundColor: Colors.blackish,
        justifyContent: "center",
    },
    image: {

    },
    video: {
        height: "100%",
        width: "100%",
    },
    buttonSection: {
        width: "88%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    buttonContainer: {
        marginVertical: 5,
        flex: 1,
    },
    nextButtonContainer: {
        marginHorizontal: 5,
    },
    button: {
        backgroundColor: Colors.primary,
    },
    nextButton: {
        backgroundColor: Colors.blackish,
        borderColor: "#fff",
    },
});

export default GalleryView;