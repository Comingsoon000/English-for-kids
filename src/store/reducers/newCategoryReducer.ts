export interface INewCategoryState {
  createCategory: boolean;
}

export interface INewCategoryAction {
  type: "createCategory" | "cancelCreateCategory";
}

const initialState: INewCategoryState = {
  createCategory: false,
};

export const NewCategoryReducer = (
  state: INewCategoryState = initialState,
  action: INewCategoryAction
): INewCategoryState => {
  switch (action.type) {
    case "createCategory":
      return { ...state, createCategory: true };
    case "cancelCreateCategory":
      return { ...state, createCategory: false };
    default:
      return state;
  }
};
