import React, { useCallback, useEffect } from "react";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { db } from "../config";

import * as gameActions from "../store/actions/game";
import LoadingIndicator from "../components/LoadingIndicator";
import EndGameButton from "../components/EndGameButton";
import { chooseQuestion } from "../store/actions/package";
import Colors from "../constants/Colors";
import PreGameButton from "../components/PreGameButton";

// This is the create game screen AND waiting for players screen.
const CreateGameScreen = (props) => {
  const player = useSelector((state) => state.player);
  const game = useSelector((state) => state.game.currentGame);
  const gameId = useSelector((state) => state.game.currentGameId);
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

  const startGameHandler = () => {
    // Change the game state and send it to Firestore
    const randList = createRandomList();
    game.randomPlayerList = randList;
    dispatch(chooseQuestion(randList[randList.length - 1]));
    // game.currentPlayer = randList[randList.length - 1];
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
        <View style={styles.container}>
          <Text style={{ fontSize: 25, color: Colors.thirdly }}>Game PIN</Text>
          <Text style={{ fontSize: 50, color: Colors.thirdly }}>{gameId}</Text>
        </View>
        <View style={styles.container}>
          <FlatList
            data={game.players}
            keyExtractor={(p) => p.playerId}
            renderItem={(itemData) => (
              <Text style={{ fontSize: 15, color: Colors.thirdly }}>
                {itemData.item.name}
              </Text>
            )}
          />
        </View>
        <View style={{ marginBottom: 50 }}>
          {player.role.localeCompare("host") == 0 && (
            <PreGameButton title="Start Game" onPress={startGameHandler} />
          )}
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CreateGameScreen;
