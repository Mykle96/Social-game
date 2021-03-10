import React, { useEffect, useRef, useState } from "react";
import { AppState } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-native";

import PreGameNavigator from "./PreGameNavigator";
import GameNavigator from "./GameNavigator";

import CreateGameScreen from "../screens/CreateGameScreen";
import PreQuestionScreen from "../screens/PreQuestionScreen";
import QuestionScreen from "../screens/QuestionScreen";
import HomeScreen from "../screens/HomeScreen";
import JoinGameScreen from "../screens/JoinGameScreen";
import ShopScreen from "../screens/ShopScreen";
import PackageScreen from "../screens/PackageScreen";
import * as gameActions from "../store/actions/game";
import playerReducer from "../store/reducers/player";

const Stack = createStackNavigator();

const MainNavigator = (props) => {
  // Does the game exist? GameNavigator : PreGameNavigator
  const game = useSelector((state) => state.game.currentGame);
  const gameId = useSelector((state) => state.game.currentGameId);
  const player = useSelector((state) => state.player);
  const dispatch = useDispatch();
  const gameRef = useRef(game);
  const playerRef = useRef(player);

  const appState = useRef(AppState.currentState);

  // const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    gameRef.current = game;
    playerRef.current = player;
  }, [game, player]);

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  // Checks whether the app is active or not
  const _handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      console.log("App has come to the foreground!");
      if (
        !!gameRef.current &&
        playerRef.current.role.localeCompare("host") == 0
      ) {
        gameRef.current.hostActive = true;
        dispatch(gameActions.updateGame(gameRef.current));
        console.log("Set host active");
      }
    } else if (
      appState.current.match(/active|foreground/) &&
      nextAppState === "background"
    ) {
      console.log("The app is in the background");
      if (
        !!gameRef.current &&
        playerRef.current.role.localeCompare("host") == 0
      ) {
        gameRef.current.hostActive = false;
        dispatch(gameActions.updateGame(gameRef.current));
        console.log("Set host inactive");
      }
    }
    appState.current = nextAppState;
    // setAppStateVisible(appState.current);
    // console.log("AppState", appState.current);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          title: "Tap",
        }}
      >
        {!game && (
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            /*Is this a valid way of removing the header button for a specific page? */
            //options={{ headerRight: () => {} }}
          />
        )}
        {!game && (
          <Stack.Screen
            name="ShopScreen"
            component={ShopScreen}
            /*Is this a valid way of removing the header button for a specific page? */
            //options={{ title: "Shop", headerRight: () => {} }}
          />
        )}
        {!game && (
          <Stack.Screen
            name="JoinGameScreen"
            component={JoinGameScreen}
            //options={{ headerRight: () => {} }}
          />
        )}

        {!!game && game.state.localeCompare("waitingForPlayers") == 0 && (
          <Stack.Screen name="CreateGameScreen" component={CreateGameScreen} />
        )}

        {!!game && game.state.localeCompare("choosePackage") == 0 && (
          <Stack.Screen
            name="PackageScreen"
            component={PackageScreen}
            options={{ title: "Packages" }}
          />
        )}

        {!!game && game.state.localeCompare("preQuestion") == 0 && (
          <Stack.Screen
            name="PreQuestionScreen"
            component={PreQuestionScreen}
          />
        )}
        {!!game && game.state.localeCompare("question") == 0 && (
          <Stack.Screen name="QuestionScreen" component={QuestionScreen} />
        )}
        {/*
        {!game && (
          <Stack.Screen name="PreGameNavigator" component={PreGameNavigator} />
        )}
        {!!game && (
          <Stack.Screen name="GameNavigator" component={GameNavigator} />
        )}
      */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;

/*
SHOULD WE BE ABLE TO QUIT / LEAVE GAME MID-GAME?
  Header button to leave game:
    headerRight: () => (
      <Button
        title="End Game"
        onPress={() => {
          dispatch(gameActions.endGame());
        }}
      />
    ),
  The screens would maybe need this
    if (!game) {
      return (
        <View style={styles.screen}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      );
    } else {
      return (
        [...]
      )
*/
