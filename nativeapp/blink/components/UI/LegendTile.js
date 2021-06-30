import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import AppConfig from '../../constants/AppConfig';

const LegendTile = props => {
    return (
        <View style={styles.root}>
            <View style={styles.legendContainer}>
                <Text style={styles.legend}>
                    {AppConfig.appName}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        width: "100%",
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
});


export default LegendTile;