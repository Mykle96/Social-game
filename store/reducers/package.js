import { FETCH_PACKAGE, CHOOSE_QUESTION } from "../actions/package";
import { END_GAME } from "../actions/game";

const initialState = {
  questions: null,
  currentQuestion: "",
};

const packageReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PACKAGE:
      return {
        ...state,
        questions: action.questions,
      };
    case CHOOSE_QUESTION:
      return {
        ...state,
        questions: action.questions,
        currentQuestion: action.currentQuestion,
      };
    case END_GAME:
      return initialState;
    default:
      return state;
  }
};

export default packageReducer;
