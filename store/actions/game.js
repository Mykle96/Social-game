import { db } from "../../config";

export const CREATE_GAME = "CREATE_GAME";
export const JOIN_GAME = "JOIN_GAME";
export const REALTIME_UPDATES = "REALTIME_UPDATES";
export const UPDATE_GAME = "UPDATE_GAME";
export const END_GAME = "END_GAME";

// Creates a random game id
const randNumGen = () => {
  // THIS NEEDS A WAY TO CONTROL THAT THE NUMBER DOES NOT EXIST IN FIRESTORE DATABASE
  const chars = "0123456789";
  let autoId = "";
  for (let i = 0; i < 6; i++) {
    autoId += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return autoId;
};

export const createGame = () => {
  return async (dispatch, getState) => {
    const thisPlayer = getState().player;
    const autoId = randNumGen();
    var gameData = {
      id: autoId,
      state: "choosePackage", // waitingForPlayers-> "preQuestion" <--> "question" -> "endGame"
      players: [thisPlayer],
      currentQuestion: null,
      currentPlayer: null,
      randomPlayerList: [],
      hostActive: true,
      // timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };
    try {
      // Saves game data to Firestore database
      const ref = await db.collection("games").doc(autoId).set(gameData);
      console.log("Successfully created game!");
      // Saves game data to redux
      dispatch({
        type: CREATE_GAME,
        game: gameData,
        gameId: autoId,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const joinGame = (gameId) => {
  return async (dispatch, getState) => {
    const thisPlayer = getState().player;
    try {
      const docRef = db.collection("games").doc(gameId);
      const ref = await docRef.get();
      const gameData = ref.data();
      if (!ref.exists) {
        throw "No such game PIN!";
      }
      // Should not add duplicates of the same user (maybe not necessary)
      if (!!gameData.players.find((p) => p.playerId === thisPlayer.playerId)) {
        throw "Player allready in the game";
      }
      // Only able to join the game if the game state is "waitingForPlayers"
      if (gameData.state.localeCompare("waitingForPlayers") != 0) {
        throw "This game has started without you.";
      }
      // Max 20 players in each game
      if (gameData.players.length > 20) {
        throw "Too many players in this game.";
      }
      // JOIN THE GAME
      // Adds this player to the list of players
      gameData.players.push(thisPlayer);
      await docRef.update(gameData);
      console.log("Succesfully joined game!");
      // Saves game data to redux
      dispatch({
        type: JOIN_GAME,
        game: gameData,
        gameId: gameId,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const realtimeUpdates = (game) => {
  return async (dispatch, getState) => {
    dispatch({
      type: REALTIME_UPDATES,
      game: game,
    });
  };
};

export const updateGame = (game) => {
  return async (dispatch, getState) => {
    const gameId = game.id;
    try {
      const ref = await db.collection("games").doc(gameId).update(game);
      console.log("Game successfully updated");
      // Saves game data to redux
      dispatch({
        type: UPDATE_GAME,
        game: game,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const endGame = () => {
  return async (dispatch, getState) => {
    const gameId = getState().game.currentGame.id;
    try {
      // Deletes the game from firestore
      await db.collection("games").doc(gameId).delete();
      console.log("Game successfully deleted!");
      // Deletes the game from redux
      dispatch({
        type: END_GAME,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const fetchGame = () => {
  return async (dispatch, getState) => {
    const game = getState().game.currentGame;
    return game;
  };
};

/*
export const realtimeUpdates = () => {
  return async (dispatch, getState) => {
    const gameId = getState().game.currentGame.id;
    try {
      await db
        .collection("games")
        .doc(gameId)
        .onSnapshot((doc) => {
          dispatch({
            type: REALTIME_UPDATES,
            game: doc.data(),
          });
        });
      console.log(doc.data());
    } catch (err) {
      throw err;
    }
  };
};
*/
