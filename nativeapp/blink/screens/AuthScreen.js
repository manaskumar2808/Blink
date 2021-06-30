import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import { useDispatch } from 'react-redux';

import * as actions from '../store/index';
import * as authValidators from '../validators/AuthValidators';

import { Input, Button } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { UIActivityIndicator } from 'react-native-indicators';

import AppConfig from '../constants/AppConfig';

import InputTile from  '../components/UI/InputTile';
import LegendTile from '../components/UI/LegendTile';

import Colors from '../constants/Colors';

const AuthScreen = props => {
    // const loginMode = props.navigation.getParam('isLogin');
    const dispatch = useDispatch();
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const [submitDisabled, setSubmitDisabled] = useState(true);

    const [emailError, setEmailError] = useState("");
    const [userNameError, setUserNameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordConfirmError, setPasswordConfirmError] = useState("");

    const { navigation } = props;

    useEffect(() => {
        const signupMode = navigation.getParam('isSignup');
        if(signupMode === true) {
            setIsLogin(false);
        }
    },[navigation]);


    useEffect(() => {
        if(isLogin) {
            if(email.trim().length !== 0 && password.trim().length !== 0) {
                setSubmitDisabled(false);
            } else {
                setSubmitDisabled(true);
            }
        } else {
            if(
                email.trim().length !== 0 && 
                userName.trim().length !== 0 &&
                password.trim().length !== 0 &&
                passwordConfirm.trim().length !== 0
            ) {
                setSubmitDisabled(false);
            } else {
                setSubmitDisabled(true);
            }
        }
    }, [email, userName, password, passwordConfirm]);


    const checkValidity = () => {
        let valid = true;
        const emailError = authValidators.emailValidator(email);
        const passwordError = authValidators.passwordValidator(password);
        const userNameError = authValidators.userNameValidator(userName);
        const passwordConfirmError = authValidators.passwordConfirmValidator(passwordConfirm, password);
        if(isLogin) {
            if(emailError) {
                setEmailError(emailError);
                valid = false;
            }
            if(passwordError) {
                setPasswordError(passwordError);
                valid = false;
            }
        } else {
            if(userNameError) {
                setUserNameError(userNameError);
                valida = false;
            }
            if(emailError) {
                setEmailError(emailError);
                valid = false;
            }
            if(passwordError) {
                setPasswordError(passwordError);
                valid = false;
            }
            if(passwordConfirmError) {
                setPasswordConfirmError(passwordConfirmError);
                valid = false;
            } 
        }

        return valid;
    }


    const submitAuth = () => {
        setIsLoading(true);
        const isValid = checkValidity();
        if(isValid) {
            if(isLogin) {
                dispatch(actions.login(email, password))
                .then(result => {
                    setIsLoading(false);
                    props.navigation.navigate('app');
                })
                .catch(error => {
                    setIsLoading(false);
                });
            } else {
                dispatch(actions.signup(userName, email, password))
                .then(result => {
                    setIsLoading(false);
                    props.navigation.navigate('app');
                })
                .catch(error => {
                    setIsLoading(false);
                });
            }
        } else {
            setIsLoading(false);
        }
    }




    const toggleAuthMode = () => {
        setIsLogin(prevState => !prevState);
    }

    return (
        <View style={styles.root}>
            <SafeAreaView>
                <ScrollView>
                    <View style={styles.form}>
                        <LegendTile />
                        <InputTile 
                            placeholder="Email"
                            key="email"
                            keyboardType="email-address"
                            value={email}
                            setValue={setEmail}
                            error={emailError}
                        />
                    { isLogin ? null : <InputTile 
                            placeholder="Username"
                            key="userName"
                            value={userName}
                            setValue={setUserName}
                            error={userNameError}
                        />}
                        <InputTile 
                            placeholder="Password"
                            key="password"
                            value={password}
                            setValue={setPassword}
                            obscureText={true}
                            forgotPasswordTab={isLogin}
                            error={passwordError}
                        />
                        { isLogin ? null : <InputTile 
                            placeholder="Confirm Password"
                            key="passwordConfirm"
                            value={passwordConfirm}
                            setValue={setPasswordConfirm}
                            obscureText={true}
                            error={passwordConfirmError}
                        />}
                        <View style={styles.buttonContainer}>
                            {
                                !isLoading ? <Button 
                                    title={ isLogin ?  "Login" : "Signup" }
                                    type="solid"
                                    buttonStyle={styles.button}
                                    titleStyle={styles.buttonTitle}
                                    loading={isLoading}
                                    onPress={submitAuth}
                                    disabled={submitDisabled}
                                    disabledStyle={{backgroundColor: "rgba(5, 167, 255, 0.5)"}}
                                    disabledTitleStyle={{color: "#fff"}}
                                /> : 
                                <View style={styles.button}>
                                    <UIActivityIndicator 
                                        color="#fff"
                                        size={25}
                                    />
                                </View>
                            }
                        </View>
                        <View style={styles.authModeContainer}>
                            <View style={styles.authModeTextContainer}>
                                <Text style={styles.authModeText}>
                                    {
                                        isLogin ? 
                                        "Create an account ? " 
                                            : 
                                        "Already a member ? "
                                    }
                                </Text>
                            </View>
                            <View style={styles.authModeButtonContainer}>
                                <Button 
                                    title={
                                        isLogin ? "Signup" : "Login"
                                    }
                                    type="clear"
                                    titleStyle={styles.authModeButton}                                  
                                    onPress={toggleAuthMode}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        padding: 20,
        paddingVertical: 0,
        width: "100%",
        backgroundColor: Colors.background,
    },
    authHeader: {
        marginVertical: 40,
    },
    legendContainer: {
        width: "100%",
        alignItems: "center",
    },
    legend: {
        fontFamily: AppConfig.fontFamily,
        fontSize: 70,
        fontWeight: "800",
    },
    buttonContainer: {
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        borderRadius: 5,
        width: "100%",
        height: 50,
    },
    buttonTitle: {
        color: "#fff",
        fontSize: 20,
    },
    authModeContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 20,
    },
    authModeTextContainer: {

    },
    authModeText: {
        fontSize: 16,
    },
    authModeButtonContainer: {
        padding: 0
    },
    authModeButton: {
        padding: 0,
        color: Colors.primary
    },
});


export default AuthScreen;