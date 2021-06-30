import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';

import { Input, Button } from 'react-native-elements';
import { UIActivityIndicator } from 'react-native-indicators';

import CircularProfileItem from '../components/CircularProfileItem';
import InputTile from '../components/UI/InputTile';
import Colors from '../constants/Colors';

import * as actions from '../store/index';
import * as authValidators from '../validators/AuthValidators';

import userData from '../data/User';
import BaseUrl from '../constants/BaseUrl';
import Theme from '../constants/Theme';

const ProfileUpdateScreen = props => {
    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.usr.currentUser);
    const token = useSelector(state => state.ath.token);
    const userId = useSelector(state => state.ath.userId);

    const profileImage = useSelector(state => state.usr.profileImage);

    const profileThemeIndex = useSelector(state => state.usr.themeIndex);

    const [userName, setUserName] = useState(currentUser.userName);
    const [email, setEmail] = useState(currentUser.email);
    const [firstName, setFirstName] = useState(currentUser.firstName);
    const [lastName, setLastName] = useState(currentUser.lastName);
    const [profileImageUrl, setProfileImageUrl] = useState(currentUser.profileImageUrl);
    const [phoneNo, setPhoneNo] = useState(currentUser.phoneNo);
    const [themeIndex, setThemeIndex] = useState(currentUser.themeIndex);
    
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        if(!token) {
            props.navigation.navigate('auth');
        }
    }, [token]);

    useEffect(() => {
        if(profileImage) {
            setProfileImageUrl(profileImage.uri);
        }
    }, [profileImage]);

    useEffect(() => {
        if(profileThemeIndex) {
            setThemeIndex(profileThemeIndex);
        }
    }, [profileThemeIndex]);


    const goToProfilePic = () => {
        props.navigation.navigate('profilePic'); 
    }

    const goToTheme = () => {
        props.navigation.navigate('theme', {
            themeIndex: themeIndex,
        }); 
    }

    const checkValidity = () => {
        let valid = true;
        const emailError = authValidators.emailValidator(email);
        const userNameError = authValidators.userNameValidator(userName);
        
        if(userNameError) {
            setUserNameError(userNameError);
            valida = false;
        }
        if(emailError) {
            setEmailError(emailError);
            valid = false;
        }
        return valid;
    }


    const updateUser = () => {
        const isValid = checkValidity();

        if(isValid) {
            setIsLoading(true);
            const formData = new FormData();
            formData.append('userName', userName);
            formData.append('email', email);
            formData.append('firstName', firstName);
            formData.append('lastName', lastName);
            formData.append('profileImage', profileImage);
            formData.append('phoneNo', phoneNo);
            formData.append('themeIndex', themeIndex);
            dispatch(actions.updateCurrentUser(token, userId, formData))
            .then(result => {
                setIsLoading(false);
                dispatch(actions.unSetProfileImage());
            })
            .catch(error => {
                setIsLoading(false);
                dispatch(actions.unSetProfileImage());
                console.log(error);
            });
        } else {
            console.log('not valid');
        }
    }

    return (
        <View style={styles.root}>
            <ScrollView>
                <View style={styles.form}>
                    <CircularProfileItem 
                        imageUrl={profileImage ? profileImageUrl : profileImageUrl ? BaseUrl + profileImageUrl : null}
                        radius={70}
                        haveBorder
                        onPress={goToProfilePic}
                    />
                    <InputTile 
                        placeholder="Username"
                        value={userName}
                        setValue={setUserName}
                        underlined
                    />
                    <InputTile 
                        placeholder="Email"
                        value={email}
                        setValue={setEmail}
                        underlined
                    />
                    <View style={styles.gridContainer}>
                        <View style={styles.gridInput}>
                            <InputTile 
                                placeholder="First Name"
                                value={firstName}
                                setValue={setFirstName}
                                underlined
                            />
                        </View>
                        <View style={styles.gridInput}>
                            <InputTile 
                                placeholder="Last Name"
                                value={lastName}
                                setValue={setLastName}
                                underlined
                            />
                        </View>
                    </View>
                    <InputTile 
                        placeholder="Phone Number"
                        value={phoneNo}
                        setValue={setPhoneNo}
                        underlined
                    />
                    <View style={styles.themeContainer}>
                        <Image
                            source={Theme[themeIndex].themeImage}
                            style={styles.themeImage}
                            resizeMode="cover"
                        />
                        <Text style={styles.themeTitle}>
                            Theme : <Text style={{color: Colors.primary}}>{Theme[themeIndex].title}</Text>
                        </Text>
                        <AntDesign name="arrowright" size={24} color="black" onPress={goToTheme} />
                    </View>
                    <View style={styles.buttonContainer}>
                        {
                            isLoading ? 
                            <View style={styles.button}>
                                <UIActivityIndicator 
                                    size={25}
                                    color="#fff"
                                />
                            </View>
                            : 
                            <Button 
                                title="Update"
                                buttonStyle={styles.button}
                                titleStyle={{fontSize: 20}}
                                onPress={updateUser}
                            />
                        }
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}


ProfileUpdateScreen.navigationOptions = navData => {
    return {
        headerTitle: "Profile",
    }
}


const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    form: {
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        paddingTop: 40,
    },
    gridContainer: {
        width: "100%",
        flexDirection: "row",
    },
    gridInput: {
        width: "50%",
    },
    buttonContainer: {
        width: "100%",
    },
    button: {
        height: 50,
        backgroundColor: Colors.primary,
        padding: 12,
        marginHorizontal: 10,
        borderRadius: 5,
    },
    themeContainer: {
        borderWidth: 0.5,
        borderRadius: 10,
        backgroundColor: "#ebe6e6",
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 20,
        width: "95%",
    },
    themeImage: {
        height: 50,
        width: 50,
        borderRadius: 5,
    },
    themeTitle: {
        
    }
});


export default ProfileUpdateScreen;