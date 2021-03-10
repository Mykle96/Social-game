import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { createHost, createPlayer } from "../store/actions/player";
import * as gameActions from "../store/actions/game";
import SplashPage from "../components/SplashPage";
import Colors from "../constants/Colors";
import PreGameButton from "../components/PreGameButton";
import CustomInput from "../components/CustomInput";
import CustomLogo from "../components/CustomLogo";

const HomeScreen = (props) => {
  // props.navigation.setOptions({title: "TapTap Drink"});

  const playerName = useSelector((state) => state.player.name);
  const [name, setName] = useState(playerName);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  // Handle name input field
  const nameChangeHandler = (text) => {
    // The name can only consist of letters, space and underscore
    var letters = /^[a-zA-Z_ ]+$/;
    if (text.match(letters) || text.length < 1) {
      setName(text);
    }
    return;
  };

  const SplashPageHandler = () => {
    return <SplashPage></SplashPage>;
  };

  // Navigate to the create game screen
  const createGameHandler = useCallback(async () => {
    if (name.length > 2) {
      // Create a player and save it to redux
      dispatch(createHost(name));
      // Create game and save it to Firestore database and redux
      try {
        await dispatch(gameActions.createGame());
      } catch (err) {
        setError("Unable to create game, please try again!");
        throw err;
      }
      //props.navigation.navigate("CreateGameScreen");
    } else {
      setError("Your name must contain at least 3 letters!");
    }
  }, [dispatch, name]);

  // Navigate to the join game screen
  const joinGameHandler = useCallback(() => {
    if (name.length > 2) {
      dispatch(createPlayer(name));
      props.navigation.navigate("JoinGameScreen");
    } else {
      setError("Your name must contain at least 3 letters!");
    }
  }, [dispatch, name]);

  // Gives the user an alert if the nickname is wrong.
  useEffect(() => {
    if (error) {
      Alert.alert("An Error Ocurred!", error, [{ text: "Okay" }]);
    }
    setError(null);
  }, [error]);

  const shopHandler = () => {
    props.navigation.navigate("ShopScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <CustomLogo style={styles.logocontainer} />
      </View>
      <View style={styles.inputContainer}>
        <CustomInput
          onChangeText={(text) => nameChangeHandler(text)}
          maxLength={20}
          value={name}
          placeholder="Nickname"
        />
      </View>
      <View>
        <PreGameButton
          color={Colors.button1}
          onPress={createGameHandler}
          title="Create Game"
        />
      </View>
      <View>
        <PreGameButton
          color={Colors.button2}
          onPress={joinGameHandler}
          title="Join Game"
        />
      </View>
      <View style={styles.subContainer}>
        <PreGameButton
          color={Colors.button1}
          onPress={shopHandler}
          title="Shop"
        />
      </View>
    </View>
  );
};

/*
MIGHT MERGE JOINGAMESCREEN WITH HOMESCREEN TO MAKE IT LOOK SMOOTH
Perhaps by: Adding const isJoining and then replacing the buttons and inputfield with JoinGameScreen
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  subContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    position: "absolute",
    width: 107,
    height: 24,
    left: 154,
    top: 272,
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },
  joingGame: {
    position: "absolute",
    width: 305,
    height: 91,
    left: 45,
    top: 383,
  },
  createGame: {},
});

export default HomeScreen;
