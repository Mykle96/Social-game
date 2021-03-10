import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, Text, View, Button, TextInput, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { joinGame } from "../store/actions/game";
import Colors from "../constants/Colors";
import PreGameButton from "../components/PreGameButton";
import CustomInput from "../components/CustomInput";

const JoinGameScreen = (props) => {
  const player = useSelector((state) => state.player);
  const [gameId, setgameId] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  // Handle gameId input field
  const numChangeHandler = (gameId) => {
    // The gameId can only consist of gameIds
    var letters = /^[0-9]+$/;
    if (gameId.match(letters) || gameId.length < 1) {
      setgameId(gameId);
    }
    return;
  };

  const joinGameHandler = useCallback(async () => {
    console.log("game PIN: ", gameId);
    if (gameId.length == 6) {
      try {
        await dispatch(joinGame(gameId));
        // props.navigation.navigate("CreateGameScreen");
      } catch (err) {
        setError(err);
        // throw err; // Unhandled promise rejection
      }
    } else {
      setError("Your game PIN should consist of 6 numbers!");
    }
  }, [dispatch, gameId]);

  // Gives the user an alert if the nickname is wrong.
  useEffect(() => {
    if (error) {
      Alert.alert("An Error Ocurred!", error, [{ text: "Okay" }]);
    }
    setError(null);
  }, [error]);

  return (
    <View style={styles.container}>
      <CustomInput
        onChangeText={(num) => numChangeHandler(num)}
        value={gameId}
        maxLength={10}
        placeholder="Game PIN"
        keyboardType="numeric"
      />
      <PreGameButton title="Join Game" onPress={joinGameHandler} />
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
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginVertical: 10,
    fontSize: 22,
  },
});

export default JoinGameScreen;
