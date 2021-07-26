export interface IGameModeState {
  gameMode: "train" | "play";
}

export enum GameModeActionTypes {
  play = "play",
  train = "train",
}

interface IPlayAction {
  type: GameModeActionTypes.play;
}

interface ITrainAction {
  type: GameModeActionTypes.train;
}

export type IGameModeAction = IPlayAction | ITrainAction;

const initialState: IGameModeState = {
  gameMode: "train",
};

export const GameModeReducer = (state: IGameModeState = initialState, action: IGameModeAction): IGameModeState => {
  switch (action.type) {
    case GameModeActionTypes.play:
      return { gameMode: GameModeActionTypes.train };
    case GameModeActionTypes.train:
      return { gameMode: GameModeActionTypes.play };
    default:
      return state;
  }
};
