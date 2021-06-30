import React, { useEffect, useState } from 'react';
import {
    View, 
    Text,
    Image,
    StyleSheet,
    FlatList,
    TouchableWithoutFeedback,
    Dimensions,
} from 'react-native';

import { Button } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import Colors from '../constants/Colors';

import themes from '../constants/Theme';

import * as actions from '../store/index';


const ITEM_WIDTH = Dimensions.get('window').width/3 - 3;
const ITEM_HEIGHT = ITEM_WIDTH;

const ThemeScreen = props => {
    const dispatch = useDispatch();
    const [themeIndex, setThemeIndex] = useState(0);

    useEffect(() => {
        const index = props.navigation.getParam('themeIndex');
        setThemeIndex(index);
    }, []);

    const setProfileThemeIndex = () => {
        dispatch(actions.setThemeIndex(themeIndex));
    }

    const done = () => {
        setProfileThemeIndex();
        props.navigation.goBack();
    }

    return (
        <View style={styles.root}>
            <View style={styles.pickedImageContainer}>
                <Image 
                    source={themes[themeIndex].themeImage}
                    resizeMode="cover"
                    style={styles.pickedImage}
                    progressiveRenderingEnabled
                />
            </View>
            <FlatList 
                data={themes}
                numColumns={3}
                renderItem={({item, index}) => (
                    <TouchableWithoutFeedback onPress={() => setThemeIndex(index)}>
                        <Image 
                            source={item.themeImage}
                            width={ITEM_WIDTH}
                            height={ITEM_HEIGHT}
                            resizeMode="cover"
                            style={index == themeIndex ? styles.selectedThemeImage : styles.themeImage}
                        />
                    </TouchableWithoutFeedback>
                )}
            />
            <View style={styles.buttonContainer}>
                <Button 
                    title="Done"
                    buttonStyle={styles.button}
                    type="clear"
                    titleStyle={{color: Colors.primary, fontSize: 20,}}
                    onPress={done}
                />
            </View> 
        </View>
    );
}


ThemeScreen.navigationOptions = navData => {
    return {
        headerTitle: "Themes",
    }
}


const styles = StyleSheet.create({
    root: {
        flex: 1,
        width: "100%",
        backgroundColor: Colors.blackish,
    },
    pickedImageContainer: {
        width: Dimensions.get('window').width,
        height: 300,
    },
    pickedImage: {
        width: "100%",
        height: "100%",
        backgroundColor: Colors.blackish,
    },
    themeImage: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        margin: 1.5, 
        backgroundColor: "#292929", 
    },
    selectedThemeImage: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        margin: 1.5,  
        borderWidth: 1,
        borderColor: "#fff",
    },
    themeGridContainer: {
        padding: 1,
    },
    buttonContainer: {

    },
    button: {
        backgroundColor: "#000",
        borderRadius: 0,
        paddingVertical: 10,
    },
});

export default ThemeScreen;