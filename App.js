import React from "react";
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import JoinGameScreen from "./screens/JoinGameScreen";
import CreateGameScreen from "./screens/CreateGameScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <View style={styles.container}>
      <Text>Yoyo!</Text>
    </View>
    <Stack.Navigator>
        <Stack.Screen name = "HomeScreen" component = {HomeScreen}/>
        <Stack.Screen name = "CreateGameScreen" component = {CreateGameScreen}/>
        <Stack.Screen name = "JoinGameScreen" component = {JoinGameScreen}/>
    </Stack.Navigator>
    </NavigationContainer>
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
