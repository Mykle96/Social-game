import { db } from "../../config";
import { updateGame } from "./game";

export const FETCH_PACKAGE = "FETCH_PACKAGE";
export const CHOOSE_QUESTION = "CHOOSE_QUESTION";

export const fetchPackage = (packageName) => {
  return async (dispatch, getState) => {
    try {
      const docRef = db.collection("packages").doc(packageName);
      const ref = await docRef.get();
      const packageData = ref.data();
      if (!ref.exists) {
        throw "No such package exists in the database!";
      }
      dispatch({
        type: FETCH_PACKAGE,
        questions: packageData.questions,
      });
    } catch (err) {
      throw err;
    }
  };
};

// Host chooses randomly a question ou of all available questions
export const chooseQuestion = (playerId) => {
  return async (dispatch, getState) => {
    const questions = [...getState().package.questions];
    const game = getState().game.currentGame;
    const currentPlayer = game.players.find(
      (player) => player.playerId == playerId
    );
    let currentQuestion = null;
    if (questions.length > 0) {
      // Selects a random question from the list to be shown.
      const questionNum = Math.floor(Math.random() * questions.length);
      currentQuestion = questions.splice(questionNum, 1)[0];

      // Replaces the "##" with the name of the chosen player
      currentQuestion.questionProjection = currentQuestion.questionProjection.replace(
        "##",
        currentPlayer.name
      );
    }
    dispatch({
      type: CHOOSE_QUESTION,
      questions: questions,
      currentQuestion: currentQuestion,
    });
  };
};
