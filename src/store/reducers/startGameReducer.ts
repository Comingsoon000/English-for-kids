export interface IStartGameState {
  gameStarted: boolean;
}

export interface IStartGameAction {
  type: "gameStarted" | "gameNotStarted";
}

const initialState: IStartGameState = {
  gameStarted: false,
};

export const StartGameReducer = (state: IStartGameState = initialState, action: IStartGameAction): IStartGameState => {
  switch (action.type) {
    case "gameStarted":
      return { gameStarted: true };
    case "gameNotStarted":
      return { gameStarted: false };
    default:
      return state;
  }
};
