import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';

const InputTile = props => {
    const [showText, setShowText] = useState(false);

    const { obscureText } = props;

    useEffect(() => {
        if(obscureText) {
            setShowText(obscureText);
        }
    }, [obscureText]);


    const toggleShowText = () => {
        setShowText(prevState => !prevState);
    }

    const inputContainerStyles = [styles.inputContainer];

    if(props.underlined) {
        inputContainerStyles.push(styles.underlined);
    }


    return (
        <View style={styles.root}>
            <Input 
                label={props.label}
                placeholder={props.placeholder}
                secureTextEntry={showText}
                value={props.value}
                onChangeText={props.setValue}
                autoCapitalize="none"
                autoCompleteType="off"
                inputContainerStyle={inputContainerStyles}
                errorMessage={props.error}
                keyboardType={props.keyboardType}
                labelStyle={styles.label}
                errorProps={{selectionColor: Colors.danger}}
                errorStyle={styles.error}
                selectionColor={Colors.primary} 
                placeholderTextColor={Colors.secondary}
                rightIcon={
                    obscureText ? 
                    <MaterialIcons name={!showText ? "visibility" : "visibility-off"} size={24} color={Colors.secondary} onPress={toggleShowText} /> 
                        : 
                    null
                }
                rightIconContainerStyle={styles.icon}
            />
            {
                 props.forgotPasswordTab ? 
                 <View style={styles.forgotPasswordContainer}>
                    <Button 
                        title="Forgot password?"
                        type="clear"
                        titleStyle={styles.forgotPasswordButton}
                    />
                </View> : null
            }
        </View>
    );
}

InputTile.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    obscureText: PropTypes.bool,
    underlined: PropTypes.bool,
    keyboardType: PropTypes.string,
    value: PropTypes.string,
    setValue: PropTypes.func,
    error: PropTypes.string,
    forgotPasswordTab: PropTypes.bool,
}

const styles = StyleSheet.create({
    root: {
        width: "100%",
        marginTop: 5,
        padding: 0,
    },
    inputContainer: {
        borderBottomWidth: 0.5,
        borderWidth: 0.5,
        borderColor: Colors.secondary,
        padding: 7,
        paddingLeft: 10,
        borderRadius: 5,
    },
    underlined: {
        borderWidth: 0,
        borderRadius: 0,
        paddingLeft: 0,
        paddingVertical: 4,
    },
    input: null,
    label: {

    },
    icon: {
        marginRight: 10,
    },
    placeholder: {

    },
    error: {
        color: Colors.danger,
    },
    forgotPasswordContainer: {
        width: "100%",
        alignItems: "flex-end",
        justifyContent: "flex-start",
        marginBottom: 10,
    },  
    forgotPasswordButton: {
        padding: 0,
        color: Colors.primary,
        fontWeight: "700",
    },
});


export default InputTile;