export interface ICategoryState {
  category: number | "categories" | "statistics";
}

export interface ICategoryAction {
  type: number | "categories" | "statistics";
}

const initialState: ICategoryState = {
  category: "categories",
};

export const CategoryReducer = (state: ICategoryState = initialState, action: ICategoryAction): ICategoryState => {
  if (typeof action.type === "number") {
    return { category: action.type };
  }
  if (action.type === "categories") {
    return { category: action.type };
  }
  if (action.type === "statistics") {
    return { category: action.type };
  }
  return state;
};
