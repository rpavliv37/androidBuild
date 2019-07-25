import React from 'react';
import logger from 'redux-logger'
import { createLogger } from 'redux-logger';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import { createEpicMiddleware } from 'redux-observable';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import rootEpic from './src/containers/epics';
import SignIn from './src/containers/SignIn';
import ForgotPass from './src/containers/ForgotPass';
import Main from './src/containers/Main';
import TaskDetails from './src/containers/TaskDetails';
import CreateNewTask from './src/containers/CreateNewTask';
import reducers from './src/containers/reducers';
import LogTime from './src/containers/LogTime';
import FlashMessage from "react-native-flash-message";
// import { AppLoading, Asset, Font } from 'expo';
// import { Entypo } from '@expo/vector-icons';

global.XMLHttpRequest = global.originalXMLHttpRequest
  ? global.originalXMLHttpRequest
  : global.XMLHttpRequest
global.FormData = global.originalFormData
  ? global.originalFormData
  : global.FormData

fetch // Ensure to get the lazy property

if (window.__FETCH_SUPPORT__) {
  // it's RNDebugger only to have
  window.__FETCH_SUPPORT__.blob = false
} else {
  /*
   * Set __FETCH_SUPPORT__ to false is just work for `fetch`.
   * If you're using another way you can just use the native Blob and remove the `else` statement
   */
  global.Blob = global.originalBlob ? global.originalBlob : global.Blob
  global.FileReader = global.originalFileReader
    ? global.originalFileReader
    : global.FileReader
}

const epicMiddleware = createEpicMiddleware(rootEpic);

const initialState = {};
const middlewares = [
  createLogger(),
  epicMiddleware
];
const store = createStore(reducers, initialState, compose(applyMiddleware(...middlewares)));

const MainNavigator = createStackNavigator({
  Home: {screen: SignIn,
  header: null},
  Main: {screen: Main},
  SignIn: { screen: SignIn},
  ForgotPass: {screen: ForgotPass},
  TaskDetails: {screen: TaskDetails},
  CreateNewTask: {screen: CreateNewTask},
  LogTime: {screen: LogTime}
});

// function cacheFonts(fonts) {
//   return fonts.map(font => Font.loadAsync(font));
// }


const AppNavigator = createAppContainer(MainNavigator);

class App extends React.Component{
  state = {
    isReady: false,
  };

  // async _loadAssetsAsync() {
  //   const fontAssets = cacheFonts([Entypo.font]);

  //   await Promise.all([...fontAssets]);
  // }
  render() {
    // if (!this.state.isReady) {
    //   return (
    //     <AppLoading
    //       startAsync={this._loadAssetsAsync}
    //       onFinish={() => this.setState({ isReady: true })}
    //       onError={console.warn}
    //     />
    //   );
    // }
    return (
      <Provider store={ store } >
        <AppNavigator />
        <FlashMessage position="top" />
      </Provider>
    )
  }
}

export default App;