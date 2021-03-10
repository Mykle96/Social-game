export const CREATE_HOST = "CREATE_HOST";
export const CREATE_PLAYER = "CREATE_PLAYER";

// Creates a random player id
const randNumGen = () => {
  // THIS NEEDS A WAY TO CONTROL THAT THE NUMBER DOES NOT EXIST IN FIRESTORE DATABASE
  const chars = "0123456789";
  let autoId = "";
  for (let i = 0; i < 8; i++) {
    autoId += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return autoId;
};

export const createHost = (name) => {
  const playerId = randNumGen();
  return {
    type: CREATE_HOST,
    id: playerId,
    name: name,
    role: "host",
  };
};

export const createPlayer = (name) => {
  const playerId = randNumGen();
  return {
    type: CREATE_HOST,
    id: playerId,
    name: name,
    role: "player",
  };
};
