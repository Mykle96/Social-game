import React from "react";
import { StyleSheet, Platform, Text, View, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector, useDispatch } from "react-redux";

import CreateGameScreen from "../screens/CreateGameScreen";
import PreQuestionScreen from "../screens/PreQuestionScreen";
import QuestionScreen from "../screens/QuestionScreen";

import * as gameActions from "../store/actions/game";

const Stack = createStackNavigator();

const GameNavigator = (props) => {
  const game = useSelector((state) => state.game.currentGame);
  const dispatch = useDispatch();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        title: "Tap",
        headerRight: () => (
          <Button
            title="End Game"
            onPress={() => {
              dispatch(gameActions.endGame());
            }}
          />
        ),
      }}
    >
      {game.state.localeCompare("waitingForPlayers") == 0 && (
        <Stack.Screen name="CreateGameScreen" component={CreateGameScreen} />
      )}
      {game.state.localeCompare("preQuestion") == 0 && (
        <Stack.Screen name="PreQuestionScreen" component={PreQuestionScreen} />
      )}
      {game.state.localeCompare("question") == 0 && (
        <Stack.Screen name="QuestionScreen" component={QuestionScreen} />
      )}
    </Stack.Navigator>
  );
};

/*
        <Stack.Screen name="JoinGameScreen" component={JoinGameScreen} />
        <Stack.Screen name="CreateGameScreen" component={CreateGameScreen} />
        <Stack.Screen name="PreQuestionScreen" component={PreQuestionScreen} />
        <Stack.Screen name="QuestionScreen" component={QuestionScreen} />
*/

export default GameNavigator;
