import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
// import * as Brightness from "expo-brightness";

import MainNavigator from "./navigation/MainNavigator";
import playerReducer from "./store/reducers/player";
import gameReducer from "./store/reducers/game";
import packageReducer from "./store/reducers/package";

const rootReducer = combineReducers({
  player: playerReducer,
  game: gameReducer,
  package: packageReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  /*useEffect(() => {
    (async () => {
      const { status } = await Brightness.requestPermissionsAsync();
    })();
  }, []);*/

  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
