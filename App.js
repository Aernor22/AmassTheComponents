/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Main from "./src/activities/Main";
import Camera from "./src/activities/Camera";
import Collection from "./src/activities/Collection";
import ModalConfirm from "./src/components/ModalConfirm";

const AppNavigator = createStackNavigator(
  {
    Home: Main,
    Camera: Camera,
    Collection:Collection,
    AddCard: ModalConfirm
  },
  {
    defaultNavigationOptions: {
      header: null
    },
    initialRouteName: "Home",
    headerMode: "screen"
  }
);
const AppContainer = createAppContainer(AppNavigator);

const App = () => {
  return <AppContainer />;
};
export default App;
