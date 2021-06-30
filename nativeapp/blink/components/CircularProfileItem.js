import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Image,
    StyleSheet,
    TouchableNativeFeedback,
    ImageBackground,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

const CircularProfileItem = (props) => {
    let configuredImageUrl;
    
    // const { imageUrl, ignoreBaseUrl } = props;
    
    // if(imageUrl) {
    //     if(ignoreBaseUrl) {
    //         configuredImageUrl = imageUrl;
    //     } else {
    //         configuredImageUrl = baseUrl + imageUrl;
    //     }
    // }

    return (
        <TouchableNativeFeedback onPress={props.onPress}>
            <View style={{
                ...styles.root,
                ...styles.bordered, 
                height: props.radius*2, 
                width: props.radius*2, 
                borderRadius: props.radius,
                elevation: props.elevation,
                borderWidth: props.haveBorder ? 0.5 : 0,
            }}>
                <ImageBackground 
                    source={ props.imageUrl ? {uri: props.imageUrl} : require('../assets/user.png')}
                    resizeMode="cover"
                    style={styles.image}
                    >
                    {
                        props.havePill ? 
                            <View style={styles.pill}>
                                <Ionicons name="add-circle-sharp" size={24} color="black" />
                            </View>
                        : null
                    }
                </ImageBackground>
            </View>
        </TouchableNativeFeedback>
    );
}

CircularProfileItem.propTypes = {
    imageUrl: PropTypes.string,
    radius: PropTypes.number,
    elevation: PropTypes.number,
    onPress: PropTypes.func,
    ignoreBaseUrl: PropTypes.bool,
    haveBorder: PropTypes.bool,
    havePill: PropTypes.bool,
}

const styles = StyleSheet.create({
    root: {
        overflow: "hidden",
    },
    bordered: {
        borderWidth: 0.5,
        borderColor: "#fff",
    },  
    pill: {
        position: "absolute",
        right: 10,
        bottom: 10,
        borderColor: "#000",
    },
    image: {
        height: "100%",
        width: "100%",
    },
});

export default CircularProfileItem;