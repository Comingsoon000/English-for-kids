export interface IFlipState {
  flipped: boolean;
  flippedCardNumber?: number;
}

export interface IFlipAction {
  type: "flipped" | "notFlipped";
  flippedCardNumber?: number;
}

const initialState: IFlipState = {
  flipped: false,
};

export const FlipReducer = (state: IFlipState = initialState, action: IFlipAction): IFlipState => {
  switch (action.type) {
    case "flipped":
      return { flipped: true, flippedCardNumber: action.flippedCardNumber };
    case "notFlipped":
      return { flipped: false, flippedCardNumber: action.flippedCardNumber };
    default:
      return state;
  }
};
