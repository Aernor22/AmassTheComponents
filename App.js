/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  StatusBar,
} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Main from "./src/activities/Main";
import Camera from "./src/activities/Camera";

const AppNavigator = createStackNavigator({
  Home: Main,
  Camera: Camera
  
});
const AppContainer = createAppContainer(AppNavigator);

const App = () => {
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <AppContainer/>
    </Fragment>
  );
};
export default App;
