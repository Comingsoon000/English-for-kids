export interface IUpdatingCategoryNumberState {
  updatingCategoryNumber: number;
  categoryId: number;
  categoryName: string;
}

export interface IUpdatingCategoryNumberAction {
  type: "updatingCategoryNumber";
  updatingCategoryNumber: number;
  categoryId: number;
  categoryName: string;
}

const initialState: IUpdatingCategoryNumberState = {
  updatingCategoryNumber: 0,
  categoryId: 0,
  categoryName: "",
};

export const UpdatingCategoryNumberReducer = (
  state: IUpdatingCategoryNumberState = initialState,
  action: IUpdatingCategoryNumberAction
): IUpdatingCategoryNumberState => {
  switch (action.type) {
    case "updatingCategoryNumber":
      return {
        ...state,
        updatingCategoryNumber: action.updatingCategoryNumber,
        categoryId: action.categoryId,
        categoryName: action.categoryName,
      };
    default:
      return state;
  }
};
