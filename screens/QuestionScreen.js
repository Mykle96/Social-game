import React, { useEffect } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../config";

import * as gameActions from "../store/actions/game";
import * as packageActions from "../store/actions/package";
import LoadingIndicator from "../components/LoadingIndicator";
import EndGameButton from "../components/EndGameButton";
import Colors from "../constants/Colors";

const QuestionScreen = (props) => {
  const game = useSelector((state) => state.game.currentGame);
  const gameId = useSelector((state) => state.game.currentGameId);
  const player = useSelector((state) => state.player);

  const dispatch = useDispatch();

  // Creates a random list of player-ids
  const createRandomList = () => {
    const players = game.players;
    let randPlayers = [];
    randPlayers = Array(15)
      .fill()
      .map(() => {
        const num = Math.floor(Math.random() * players.length);
        return players[num].playerId;
      });
    return randPlayers;
  };

  const preQuestionHandler = () => {
    const randList = createRandomList();
    dispatch(packageActions.chooseQuestion(randList[randList.length - 1]));
    game.randomPlayerList = randList;
    game.state = "preQuestion";
    // dispatch(gameActions.navigateGame("preQuestion"));
    dispatch(gameActions.updateGame(game));
  };

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

  if (!game) {
    return <LoadingIndicator />;
  } else {
    return (
      <View style={styles.container}>
        {player.role.localeCompare("host") == 0 && <EndGameButton />}

        {/* THE QUESTION TO BE SHOWN, DEPENDENT OF WHICH PERSON IS CHOSEN */}
        <View style={styles.container}>
          {!!game.currentQuestion &&
            game.randomPlayerList[
              game.randomPlayerList.length - 1
            ].localeCompare(player.playerId) == 0 && (
              <Text style={styles.question}>
                {game.currentQuestion.question}
              </Text>
            )}
          {!!game.currentQuestion &&
            game.randomPlayerList[
              game.randomPlayerList.length - 1
            ].localeCompare(player.playerId) != 0 && (
              <Text style={styles.question}>
                {game.currentQuestion.questionProjection}
              </Text>
            )}
          {!game.currentQuestion && <Text>No more questions available</Text>}
        </View>

        {/*NEXT QUESTION BUTTON FOR HOST*/}
        {player.role.localeCompare("host") == 0 && (
          <View style={styles.nextButton}>
            <Button
              title="---->"
              onPress={() => {
                preQuestionHandler();
              }}
              color={Colors.thirdly}
            />
          </View>
        )}
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
  question: {
    color: Colors.thirdly,
    fontSize: 26,
  },
  nextButton: {
    justifyContent: "flex-start",
    alignItems: "flex-end",
    alignSelf: "flex-end",
    margin: 30,
  },
});

export default QuestionScreen;
