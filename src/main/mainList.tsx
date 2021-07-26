import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../hooks/useTypeSelector";
import { fetchCategories } from "../store/reducers/fetchCategoriesReducer";
import { MainListRenderElement } from "./mainListRenderElement.tsx";

export const MainList: React.FC = () => {
  const dispatch = useDispatch();
  const { error, loading } = useTypedSelector((state) => state.fetchCategories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);
  if (loading) {
    return <h1 className="loading">Loading...</h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }
  return <MainListRenderElement />;
};
