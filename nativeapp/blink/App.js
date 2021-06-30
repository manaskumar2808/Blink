import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import Thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'react-native-elements';
import Colors from './constants/Colors';
import Navigator from './navigator/Navigator';
import authReducer from './store/reducers/authReducer';
import userReducer from './store/reducers/userReducer';
import postReducer from './store/reducers/postReducer';

const fetchFonts = () => {
  return Font.loadAsync({
    'cairo': require('./assets/fonts/Cairo/Cairo-Bold.ttf'),
  });
}

const theme = {
  colors: Colors,
}

const rootReducer = combineReducers({
    ath: authReducer,
    usr: userReducer,
    pst: postReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(Thunk)));

const App = props => {
  const [fontLoaded, setFontLoaded] = useState(false);
  if(!fontLoaded){
    return (
      <AppLoading 
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={() => {}}
      />
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Navigator />
        <StatusBar style="light" />
      </Provider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default App;