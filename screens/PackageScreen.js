import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, Text, View, Button, TextInput, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import PackageComponent from "../components/PackageComponent";
import { db } from "../config";

import * as gameActions from "../store/actions/game";
import * as packageActions from "../store/actions/package";
import Colors from "../constants/Colors";

const PackageScreen = (props) => {
  const game = useSelector((state) => state.game.currentGame);
  const gameId = useSelector((state) => state.game.currentGameId);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = db
      .collection("games")
      .doc(gameId)
      .onSnapshot({
        next: (doc) => {
          dispatch(gameActions.realtimeUpdates(doc.data()));
        },
        error: () => console.log("Error fetching realtime update"),
      });
    return unsubscribe;
  }, [gameId]);

  const onPressHandler = (packageName) => {
    dispatch(packageActions.fetchPackage(packageName));
    game.state = "waitingForPlayers";
    dispatch(gameActions.updateGame(game));
  };

  return (
    <View style={styles.container}>
      <PackageComponent onPressHandler={onPressHandler}></PackageComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PackageScreen;
