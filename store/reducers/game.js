import {
  CREATE_GAME,
  JOIN_GAME,
  REALTIME_UPDATES,
  END_GAME,
  UPDATE_GAME,
} from "../actions/game";
import { CHOOSE_QUESTION } from "../actions/package";

const initialState = {
  currentGame: null,
  currentGameId: "0",
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_GAME:
      return {
        ...state,
        currentGame: action.game,
        currentGameId: action.gameId,
      };
    case JOIN_GAME:
      return {
        ...state,
        currentGame: action.game,
        currentGameId: action.gameId,
      };
    case UPDATE_GAME:
      return {
        ...state,
        currentGame: action.game,
      };
    case REALTIME_UPDATES:
      return { ...state, currentGame: action.game };
    /*case CHOOSE_QUESTION:
      const updatedGame = state.currentGame;
      updatedGame.currentQuestion = action.currentQuestion;
      return { ...state, currentGame: updatedGame };*/
    case END_GAME:
      return initialState;
    default:
      return state;
  }
};

export default gameReducer;
