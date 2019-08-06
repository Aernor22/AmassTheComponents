/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Main from "./src/activities/Main";
import Camera from "./src/activities/Camera";

const AppNavigator = createStackNavigator({
  Home: Main,
  Camera: Camera
},
{
  initialRouteName: "Home"
});
const AppContainer = createAppContainer(AppNavigator);

const App = () => {
  return (
      <AppContainer/>
  );
};
export default App;
