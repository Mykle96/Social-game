import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Button, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import * as gameActions from "../store/actions/game";
import Colors from "../constants/Colors";

const EndGameButton = (props) => {
  const player = useSelector((state) => state.player);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Button
        title="X"
        color={Colors.thirdly}
        onPress={() => {
          Alert.alert(
            "End the Game?",
            "By clicking yes, you end the game for all other players as well!",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              { text: "Yes", onPress: () => dispatch(gameActions.endGame()) },
            ]
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "flex-end",
    alignSelf: "flex-end",
    margin: 30,
  },
});

export default EndGameButton;
