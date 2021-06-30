import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableWithoutFeedback,
    Dimensions,
} from 'react-native';

import baseUrl from '../../constants/BaseUrl';
import Colors from '../../constants/Colors';

// import Image from 'react-native-scalable-image';

const IMAGE_WIDTH = Dimensions.get('window').width/2 - 20;
const IMAGE_HEIGHT = IMAGE_WIDTH*(3/2) - 30;

const PostTile = props => {
    return (
        <View style={styles.root}>
            <TouchableWithoutFeedback onPress={() => props.onPress(props.id)}>
                <Image 
                    source={{
                        uri: baseUrl + props.imageUrl,
                    }}
                    resizeMode="cover"
                    style={styles.image}
                />
            </TouchableWithoutFeedback>
        </View>
    );
}

PostTile.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    imageUrl: PropTypes.string,
    onPress: PropTypes.func,
}


const styles = StyleSheet.create({
    root: {
        height: IMAGE_HEIGHT,
        width: IMAGE_WIDTH,
        margin: 10,
        overflow: "hidden",
        borderRadius: 20,
        backgroundColor: "#f2f2f2",
    },
    image: {
        flex: 1,
        width: "100%",
    },
});

export default PostTile;