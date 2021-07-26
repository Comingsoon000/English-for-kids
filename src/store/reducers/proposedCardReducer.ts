export interface IproposedCardState {
  proposedCard: boolean;
  proposedCardNumber?: number;
}

export interface IproposedCardAction {
  type: "proposedCard" | "notProposedCard";
  proposedCardNumber?: number;
}

const initialState: IproposedCardState = {
  proposedCard: false,
};

export const ProposedCardReducer = (
  state: IproposedCardState = initialState,
  action: IproposedCardAction
): IproposedCardState => {
  switch (action.type) {
    case "proposedCard":
      return { proposedCard: true, proposedCardNumber: action.proposedCardNumber };
    case "notProposedCard":
      return { proposedCard: false, proposedCardNumber: action.proposedCardNumber };
    default:
      return state;
  }
};
