import { CREATE_HOST, CREATE_PLAYER } from "../actions/player";

const initialState = {
  playerId: 0,
  name: "",
  score: 0,
  role: "", // player or host
  isTouching: false,
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_HOST:
      return {
        ...state,
        name: action.name,
        playerId: action.id,
        role: action.role,
      };
    case CREATE_PLAYER:
      return {
        ...state,
        name: action.name,
        playerId: action.id,
        role: action.role,
      };
    default:
      return state;
  }
};

export default playerReducer;
