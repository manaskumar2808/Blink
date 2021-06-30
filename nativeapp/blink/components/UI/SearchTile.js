import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Input } from 'react-native-elements';
import Colors from '../../constants/Colors';


const SearchTile = props => {

    const setText = (text) => {
        props.setValue(text);
    }

    return (
        <View style={styles.root}>
            <Input 
                placeholder="Search"
                placeholderTextColor={Colors.secondary}
                value={props.value}
                onChangeText={setText}
                inputStyle={styles.input}
                leftIcon={() => (
                    <Feather name="search" size={25} color={Colors.secondary} />
                )} 
                inputContainerStyle={styles.inputContainer}
                leftIconContainerStyle={props.value.trim().length === 0 ? styles.icon : null}
            />
        </View>
    );
}

SearchTile.propTypes = {
    value: PropTypes.string,
    setValue: PropTypes.func,
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
        padding: 5,
        paddingHorizontal: 30,
        borderRadius: 40,
    },
    input: {
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
        fontSize: 22,
    },
    icon: {
        // marginLeft: "32%",
    },
});

export default SearchTile;