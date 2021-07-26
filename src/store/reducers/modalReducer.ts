export interface IModalState {
  openedModal: boolean;
}

export interface IModalAction {
  type: "openedModal" | "closedModal";
}

const initialState: IModalState = {
  openedModal: false,
};

export const ModalReducer = (state: IModalState = initialState, action: IModalAction): IModalState => {
  switch (action.type) {
    case "openedModal":
      return { ...state, openedModal: false };
    case "closedModal":
      return { ...state, openedModal: true };
    default:
      return state;
  }
};
