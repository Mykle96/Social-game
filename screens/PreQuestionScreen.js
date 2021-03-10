import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../config";
// import * as Brightness from "expo-brightness";

import * as gameActions from "../store/actions/game";
import * as packageActions from "../store/actions/package";
import LoadingIndicator from "../components/LoadingIndicator";
import EndGameButton from "../components/EndGameButton";
import Timer from "../components/Timer";
import Colors from "../constants/Colors";

const PreQuestionScreen = (props) => {
  const game = useSelector((state) => state.game.currentGame);
  const gameId = useSelector((state) => state.game.currentGameId);
  const player = useSelector((state) => state.player);
  const currentQuestion = useSelector((state) => state.package.currentQuestion);
  const [timerDone, setTimerDone] = useState(false);
  const dispatch = useDispatch();

  /*useEffect(() => {
    Brightness.setBrightnessAsync(0.01);
  }, []);*/

  // Listen for realtime changes and save them to redux.
  useEffect(() => {
    const unsubscribe = db
      .collection("games")
      .doc(gameId)
      .onSnapshot(
        {
          includeMetadataChanges: true,
        },
        (doc) => {
          var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
          if (source === "Server") {
            dispatch(gameActions.realtimeUpdates(doc.data()));
          }
        },
        (error) => {
          console.log("Error fetching realtime update");
          throw error;
        }
      );
    return unsubscribe;
  }, [gameId]);

  const onTimerDone = () => {
    console.log("Random blinking sequence done!");
    setTimerDone(true);
    if (player.role.localeCompare("host") == 0) {
      // After the timer is done, move to next question
      game.currentQuestion = currentQuestion;
      game.state = "question";
      // dispatch(gameActions.navigateGame("question"));
      dispatch(gameActions.updateGame(game));
    }
  };

  if (!game) {
    return <LoadingIndicator />;
  } else {
    return (
      <View style={styles.container}>
        {player.role.localeCompare("host") == 0 && <EndGameButton />}
        <View style={styles.container}>
          <Timer
            onTimerDone={onTimerDone}
            seconds={5}
            game={game}
            player={player}
          />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
  },
});

export default PreQuestionScreen;
/*
import React, { useRef } from "react";
import { Animated, View, StyleSheet, PanResponder, Text } from "react-native";

const PreQuestionScreen = () => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Drag this box!</Text>
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        }}
        {...panResponder.panHandlers}
      >
        <View style={styles.box} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "bold",
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: "blue",
    borderRadius: 5,
  },
});

export default PreQuestionScreen;
*/
