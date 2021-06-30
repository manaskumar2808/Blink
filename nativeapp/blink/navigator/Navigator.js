import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';

import { MaterialIcons, Ionicons, Entypo, FontAwesome5, AntDesign } from '@expo/vector-icons';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator, CardStyleInterpolators } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import Colors from '../constants/Colors';
import AppConfig from '../constants/AppConfig';

import GuestScreen from '../screens/GuestScreen';
import AuthScreen from '../screens/AuthScreen';
import HomeScreen from '../screens/HomeScreen';
import CreateScreen from '../screens/CreateScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProfileViewScreen from '../screens/ProfileViewScreen';
import SearchScreen from '../screens/SearchScreen';
import ProfileUpdateScreen from '../screens/ProfileUpdateScreen';
import ViewScreen from '../screens/ViewScreen';
import PostCameraScreen from '../screens/PostCameraScreen';
import DetailScreen from '../screens/DetailScreen';
import ProfileCameraScreen from '../screens/ProfileCameraScreen';
import SplashScreen from '../screens/SplashScreen';
import ThemeScreen from '../screens/ThemeScreen';

const AuthStackNavigator = createStackNavigator({
    guest: GuestScreen,
    auth: AuthScreen
}, {
    defaultNavigationOptions: {
        headerShown: true,
        headerStyle: {
            elevation: 0,
        },
        headerTitle: () => null,
        headerLeft: (props) => (
            props.canGoBack ? 
            <AntDesign name="arrowleft" size={28} color={Colors.secondary} onPress={props.onPress} />
             : null
        ),
        headerLeftContainerStyle: {
            marginLeft: 20,
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }
});



const HomeStackNavigator = createStackNavigator({
    home: HomeScreen,
    search: SearchScreen,
    view: DetailScreen,
    profileView: ProfileViewScreen,
}, {
    defaultNavigationOptions: {
        headerTitleAlign: "center",
        headerTitle: AppConfig.appName,
        headerTitleStyle: {
            color: "#fff",
            fontSize: 28,
            fontWeight: "100",
        },
        headerStyle: {
            elevation: 0,
            backgroundColor: Colors.blackish,
        },
        headerLeft: (props) => (
            props.canGoBack ? 
            <AntDesign name="arrowleft" size={28} color="#fff" onPress={props.onPress} />
             : null
        ),
        headerLeftContainerStyle: {
            marginLeft: 20,
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    },
});


const PostStackNavigator = createStackNavigator({
    post: PostCameraScreen,
    view: ViewScreen,
    create: CreateScreen,
}, {
    defaultNavigationOptions: {
        headerTitleAlign: "center",
        // headerTitle: AppConfig.appName,
        headerTitleStyle: {
            color: "#fff",
            fontSize: 28,
            fontWeight: "100",
        },
        headerStyle: {
            elevation: 0,
            backgroundColor: Colors.blackish,
        },
        headerLeft: (props) => (
            props.canGoBack ? 
            <AntDesign name="arrowleft" size={28} color="#fff" onPress={props.onPress} />
             : null
        ),
        headerLeftContainerStyle: {
            marginLeft: 20,
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    },
});


const ProfileStackNavigator = createStackNavigator({
    profile: ProfileScreen,
    editProfile: ProfileUpdateScreen,
    view: DetailScreen,
    theme: ThemeScreen,
    profilePic: ProfileCameraScreen,
}, {
    defaultNavigationOptions: {
        headerTitleAlign: "center",
        headerTitle: AppConfig.appName,
        headerTitleStyle: {
            color: "#fff",
            fontSize: 28,
            fontWeight: "100",
        },
        headerStyle: {
            elevation: 0,
            backgroundColor: Colors.blackish,
        },
        headerLeft: (props) => (
            props.canGoBack ? 
            <AntDesign name="arrowleft" size={28} color="#fff" onPress={props.onPress} />
             : null
        ),
        headerLeftContainerStyle: {
            marginLeft: 20,
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    },
});


const tabBarConfig = {
    HomeTab: {
        screen: HomeStackNavigator,
        navigationOptions: ({navigation}) =>  {
            let tabBarVisible = true;
            if(navigation.state.index > 0) {
                tabBarVisible = false;
            }
            return {
                tabBarVisible: tabBarVisible,
                tabBarIcon: tabInfo => {
                    return (
                        <View style={tabStyles.root}>
                            <Entypo name="home" size={30} color={tabInfo.focused ? Colors.primary : "#fff"} />
                        </View>
                    );
                },
            }
        }
    },
    PostTab: {
        screen: PostStackNavigator,
        navigationOptions: ({navigation}) =>  {
            let tabBarVisible = true;
            if(navigation.state.index > 0) {
                tabBarVisible = false;
            }
            return {
                tabBarVisible: tabBarVisible,
                tabBarIcon: tabInfo => {
                    return (
                        <View style={tabStyles.root}>
                            <Ionicons name="md-add-circle-outline" size={40} color={tabInfo.focused ? Colors.primary : "#fff"} />
                        </View>
                    )
                },
            }
        }
    },
    ProfileTab: {
        screen: ProfileStackNavigator,
        navigationOptions: ({navigation}) => {
            let tabBarVisible = true;
            if(navigation.state.index > 0) {
                tabBarVisible = false;
            }
            return {
                tabBarVisible: tabBarVisible,
                tabBarIcon: tabInfo => {
                    return (
                        <View style={tabStyles.root}>
                            <FontAwesome5 name="user-alt" size={27} color={tabInfo.focused ? Colors.primary : "#fff"} />
                        </View>
                    )
                },
            }
        }
    },
};


const tabStyles = StyleSheet.create({
    root: {
        width: 50,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    }
});


const TabNavigator = Platform.OS === "ios" ? 
    createBottomTabNavigator(
        tabBarConfig, {
           tabBarOptions: {
               activeTintColor: Colors.primary,
               inactiveTintColor: Colors.background,
               showLabel: false,
               tabStyle: {
                   backgroundColor: Colors.blackish,
                   borderBottomColor: "#fff",
                   borderBottomWidth: 0.5,
               },
           }
        },
    ) 
        : 
    createMaterialBottomTabNavigator(
        tabBarConfig, {
            defaultNavigationOptions: {
                tabBarColor: Colors.blackish,
            },
            activeColorLight: Colors.primary,
            inactiveColorLight: "#fff",
            barStyleLight: {
                backgroundColor: Colors.swissGrey,
                // borderBottomColor: Colors.secondary,
                // borderBottomWidth: .2,
            },
            labeled: false,     
        },
    );


const AppNavigator = createSwitchNavigator({
    splash: SplashScreen,
    auth: AuthStackNavigator,
    app: TabNavigator,
});

export default createAppContainer(AppNavigator);