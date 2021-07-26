export interface IUpdateCategoryState {
  updateCategory: boolean;
  categoryNumber?: number;
}

export interface IUpdateCategoryAction {
  type: "updateCategory" | "cancelUpdateCategory";
  categoryNumber?: number;
}

const initialState: IUpdateCategoryState = {
  updateCategory: false,
  categoryNumber: 0,
};

export const UpdateCategoryReducer = (
  state: IUpdateCategoryState = initialState,
  action: IUpdateCategoryAction
): IUpdateCategoryState => {
  switch (action.type) {
    case "updateCategory":
      return { ...state, updateCategory: true, categoryNumber: action.categoryNumber };
    case "cancelUpdateCategory":
      return { ...state, updateCategory: false, categoryNumber: action.categoryNumber };
    default:
      return state;
  }
};
