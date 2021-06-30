import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import ScalableImage from 'react-native-scalable-image';

import { Button } from 'react-native-elements';
import Colors from '../constants/Colors';

const ViewScreen = props => {
    const imageFile = props.navigation.getParam('imageFile');

    const token = useSelector(state => state.ath.token);

    useEffect(() => {
        if(!token) {
            props.navigation.navigate('auth');
        }
    }, [token]);

    const editImage = () => {

    }

    const deleteImage = () => {

    }

    const confirmImage = () => {
        if(imageFile) {
            goToCreate(imageFile);
        }
    }


    const goToCreate = (imageFile) => {
        props.navigation.navigate('create', {
            imageFile,
        });
    }

    return (
        <View style={styles.root}>
            <View style={styles.preview}>
                <View style={styles.imageContainer}>
                    <ScalableImage 
                        source={{uri: imageFile.uri}}
                        style={styles.image}
                        width={350}
                        resizeMode="cover"
                    />
                </View>
                <View style={styles.buttonSection}>
                    <View style={styles.buttonContainer}>
                        <Button
                            title="Edit" 
                            buttonStyle={styles.editButton}
                            onPress={editImage}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            title="Delete" 
                            buttonStyle={styles.deleteButton}
                            onPress={deleteImage}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.confirmButtonContainer}>
                <Button 
                    title="Confirm"
                    buttonStyle={styles.confirmButton}
                    titleStyle={{fontSize: 20}}
                    onPress={confirmImage}
                />
            </View>
        </View>
    );
}


ViewScreen.navigationOptions = navData => {
    return {
        headerTitle: "View",
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        width: "100%",
        padding: 0,
        justifyContent: "space-between",
        alignItems: "center",
    },
    preview: {
        width: "90%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
    },
    imageContainer: {
        height: 500,
        width: 350,
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor: Colors.blackish,
        justifyContent: "center",
    },
    image: {

    },
    buttonSection: {
        marginVertical: 20,
        width: "98%",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    buttonContainer: {
        width: "49.5%",
    },
    editButton: {
        backgroundColor: Colors.blackish,
        borderRadius: 5,
    },
    deleteButton: {
        backgroundColor: Colors.danger,
        borderRadius: 5,
    },
    confirmButtonContainer: {
        height: 60,
        width: "100%",
        padding: 0,
        borderRadius: 0,
    },
    confirmButton: {
        borderRadius: 0,
        padding: 20,
        height: "100%",
    }
});


export default ViewScreen;