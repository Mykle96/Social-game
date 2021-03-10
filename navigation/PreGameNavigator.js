import React, { useEffect } from "react";
import { StyleSheet, Platform, Text, View, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";

import HomeScreen from "../screens/HomeScreen";
import JoinGameScreen from "../screens/JoinGameScreen";

//import database from "@react-native-firebase/database";
const Stack = createStackNavigator();
const PreGameNavigator = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        title: "TapTap Drink",
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="JoinGameScreen" component={JoinGameScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PreGameNavigator;
