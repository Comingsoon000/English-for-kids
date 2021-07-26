import { Dispatch } from "react";
import { Categories, getGameCategories } from "../../serverRequests/get";

export interface IFetchCategoriesState {
  categories: Categories;
  loading: boolean;
  error: null | string;
}

interface IFetchCategoriesAction {
  type: "fetchCategories" | "fetchCategoriesSucces" | "fetchCategoriesError";
  payload?: Categories | string;
}

export const initialState: IFetchCategoriesState = {
  categories: [{ category: "", cards: [{ word: "", translation: "", image: "", audioSrc: "" }] }],
  loading: true,
  error: null,
};

export const fetchCategories = () => {
  return async (dispatch: Dispatch<IFetchCategoriesAction>): Promise<void> => {
    try {
      dispatch({ type: "fetchCategories" });
      const categories = await getGameCategories();
      dispatch({ type: "fetchCategoriesSucces", payload: categories });
    } catch (e) {
      dispatch({ type: "fetchCategoriesError", payload: "Error" });
    }
  };
};

export const fetchCategoriesReducer = (
  state: IFetchCategoriesState = initialState,
  action: IFetchCategoriesAction
): IFetchCategoriesState => {
  switch (action.type) {
    case "fetchCategories":
      return { categories: initialState.categories, loading: true, error: null };
    case "fetchCategoriesSucces":
      return { categories: <Categories>action.payload, loading: false, error: null };
    case "fetchCategoriesError":
      return { categories: initialState.categories, loading: false, error: <string>action.payload };
    default:
      return state;
  }
};
