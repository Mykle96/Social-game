import React from "react";
import { StyleSheet, Text, View, InputAccessoryView, Button} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function JoinGameScreen() {
  return (
    <View style={styles.container}>
      <Text>Join game screen!</Text>
      <View>
        <Button>Join Game</Button>
      </View>
      <InputAccessoryView></InputAccessoryView>
    </View>
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
