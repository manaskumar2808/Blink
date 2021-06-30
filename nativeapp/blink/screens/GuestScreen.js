import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    Animated,
    Dimensions,
} from 'react-native';
import { Button } from 'react-native-elements';

import Carousel, { Pagination } from 'react-native-snap-carousel';

import LegendTile from '../components/UI/LegendTile';
import Colors from '../constants/Colors';

const { width, height } = Dimensions.get('window');
const IMAGE_WIDTH = width*0.80;
const IMAGE_HEIGHT = IMAGE_WIDTH*1.27;


const GuestScreen = props => {
    const carousel = useRef();
    const [index, setIndex] = useState(0);

    const goToAuth = (signup=false) => {
        props.navigation.navigate('auth', {
            'isSignup': signup,
        });
    }


    const carouselData = [
        {
            id: "c1",
            path: require('../assets/images/city.jpg'),
        },
        {
            id: "c2",
            path: require('../assets/images/beach.jpg'),
        },
        {
            id: "c3",
            path: require('../assets/images/gorge.jpg'),
        },
        {
            id: "c4",
            path: require('../assets/images/heart.jpg'),
        },
        {
            id: "c5",
            path: require('../assets/images/sunflowers.jpg'),
        },
    ];

    return (
        <View style={styles.root}>
            <LegendTile />
            <View style={styles.carouselContainer}>
                <Carousel
                    ref={carousel}
                    sliderHeight={IMAGE_HEIGHT}
                    sliderWidth={width}
                    data={carouselData}
                    itemWidth={IMAGE_WIDTH}
                    itemHeight={IMAGE_HEIGHT}
                    autoplay={true}
                    layout="tinder"
                    enableSnap={true}
                    loop
                    lockScrollWhileSnapping={true}
                    renderItem={({item, index}) =>  {
                        return (
                        <View style={styles.carouselItem}>
                            <Image 
                                source={item.path}
                                style={styles.carouselImage}
                            />
                        </View>
                    )}}
                    indicatorStyle={styles.carouselIndicator}
                />
            </View>
            <View style={styles.carouselIndicatorContainer}>
                {/* <View style={ 0 === carousel.current.currentIndex ? {...styles.carouselIndicator, ...styles.filled} : styles.carouselIndicator }></View>    
                <View style={ 1 === carousel.current.currentIndex ? {...styles.carouselIndicator, ...styles.filled} : styles.carouselIndicator }></View>  
                <View style={ 2 === carousel.current.currentIndex ? {...styles.carouselIndicator, ...styles.filled} : styles.carouselIndicator }></View>  
                <View style={ 3 === carousel.current.currentIndex ? {...styles.carouselIndicator, ...styles.filled} : styles.carouselIndicator }></View>  
                <View style={ 4 === carousel.current.currentIndex ? {...styles.carouselIndicator, ...styles.filled} : styles.carouselIndicator }></View>   */}
               {/* <Pagination 
                  dotsLength={carouselData.length}
                  activeDotIndex={index}
                  carouselRef={carousel}
                  dotColor={Colors.primary}
                  dotStyle={styles.carouselIndicator}
                  dotContainerStyle={styles.carouselIndicatorContainer}
                  inactiveDotColor={Colors.secondary}
                  tappableDots={true}
               /> */}
            </View>
            <View style={{height: 20}}></View>
            <View style={styles.buttonSection}>
                <View style={styles.buttonContainer}>
                    <Button 
                        title="Login"
                        buttonStyle={styles.loginButton}
                        onPress={goToAuth}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button 
                        title="Signup"
                        buttonStyle={styles.signupButton}
                        onPress={() => goToAuth(true)}
                    />
                </View>
            </View>
        </View>
    );
}

GuestScreen.navigationOptions = navData => {
    return {
        headerShown: false,
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        paddingVertical: 0,
        backgroundColor: Colors.background,
    },
    carouselContainer: {
        height: IMAGE_HEIGHT,
    },
    carouselItem: {
        borderWidth: 0.5,
        borderRadius: 10,
        height: IMAGE_HEIGHT,
        width: IMAGE_WIDTH,
        overflow: "hidden",
    },
    carouselImage: {
        height: "100%",
        width: "100%",
        resizeMode: "cover",
    },
    carouselIndicatorContainer: {
        flexDirection: "row",
        marginVertical: 10,
        justifyContent: "center",
    },
    carouselIndicator: {
        height: 10,
        width: 10,
        borderRadius: 10,
        borderWidth: 0.2,
        overflow: "hidden",
        marginHorizontal: 5,
    },
    filled: {
        backgroundColor: Colors.primary,
        borderWidth: 0,
    },
    buttonSection: {
        width: 300,
        flexDirection: "row",
        marginVertical: 20,
        justifyContent: "space-between"
    },
    buttonContainer: {
        width: "49.5%",
    },
    loginButton: {
        borderRadius: 5,
        backgroundColor: Colors.primary,
    },
    signupButton: {
        borderRadius: 5,
        backgroundColor: Colors.blackish,
    },
});


export default GuestScreen;