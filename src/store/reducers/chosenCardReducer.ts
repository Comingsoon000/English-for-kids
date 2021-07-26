export interface IchosenCardState {
  chosenCardNumber?: number;
  matchedCards?: number[];
}

export interface IchosenCardAction {
  type: "chosenCard" | "matchedCards";
  chosenCardNumber?: number;
  matchedCards?: number[];
}

const initialState: IchosenCardState = {
  matchedCards: [],
  chosenCardNumber: 100,
};

export const ChosenCardReducer = (
  state: IchosenCardState = initialState,
  action: IchosenCardAction
): IchosenCardState => {
  switch (action.type) {
    case "chosenCard":
      return { ...state, chosenCardNumber: action.chosenCardNumber };
    case "matchedCards":
      return { ...state, matchedCards: action.matchedCards, chosenCardNumber: action.chosenCardNumber };
    default:
      return state;
  }
};
