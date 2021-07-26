export interface IGameState {
  cardsOrder: number[];
  gameStep: number;
  attempts: number;
  finish: string;
  chart: number[];
}

export interface IGameAction {
  type: "gameState";
  cardsOrder: number[];
  gameStep: number;
  attempts: number;
  finish: string;
  chart: number[];
}

const initialState: IGameState = {
  cardsOrder: [],
  gameStep: 0,
  attempts: 0,
  finish: "",
  chart: [],
};

export const GameReducer = (state: IGameState = initialState, action: IGameAction): IGameState => {
  switch (action.type) {
    case "gameState":
      return {
        cardsOrder: action.cardsOrder,
        gameStep: action.gameStep,
        attempts: action.attempts,
        finish: action.finish,
        chart: action.chart,
      };
    default:
      return state;
  }
};
