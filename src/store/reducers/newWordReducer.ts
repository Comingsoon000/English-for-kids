export interface INewWordState {
  createWord: boolean;
}

export interface INewWordAction {
  type: "createWord" | "cancelcreateWord";
}

const initialState: INewWordState = {
  createWord: false,
};

export const NewWordReducer = (state: INewWordState = initialState, action: INewWordAction): INewWordState => {
  switch (action.type) {
    case "createWord":
      return { ...state, createWord: true };
    case "cancelcreateWord":
      return { ...state, createWord: false };
    default:
      return state;
  }
};
