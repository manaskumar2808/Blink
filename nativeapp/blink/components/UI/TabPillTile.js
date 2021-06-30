import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import Colors from '../../constants/Colors';

const TabPillTile = props => {
    return (
        <View style={styles.root}>
            <Text style={styles.title}>
                #{props.title}
            </Text>
        </View>
    );
}

TabPillTile.propTypes = {
    title: PropTypes.string,
}

const styles = StyleSheet.create({
    root: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginHorizontal: 5,
        height: 30,
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: Colors.secondary,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        color: Colors.secondary,
        fontSize: 17,
    }
});

export default TabPillTile;