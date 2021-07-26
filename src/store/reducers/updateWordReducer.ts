export interface IUpdateWordState {
  updateWord: boolean;
  wordNumber?: number;
}

export interface IUpdateWordAction {
  type: "updateWord" | "cancelupdateWord";
  wordNumber?: number;
}

const initialState: IUpdateWordState = {
  updateWord: false,
  wordNumber: 0,
};

export const UpdateWordReducer = (
  state: IUpdateWordState = initialState,
  action: IUpdateWordAction
): IUpdateWordState => {
  switch (action.type) {
    case "updateWord":
      return { ...state, updateWord: true, wordNumber: action.wordNumber };
    case "cancelupdateWord":
      return { ...state, updateWord: false, wordNumber: action.wordNumber };
    default:
      return state;
  }
};
