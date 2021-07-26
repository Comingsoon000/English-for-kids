import React from "react";
import { useDispatch } from "react-redux";
import { Card } from "../../serverRequests/get";

interface IAdminUpdateTranslationInput {
  item: Card;
}

export const AdminUpdateTranslationInput: React.FC<IAdminUpdateTranslationInput> = ({ item }) => {
  const dispatch = useDispatch();
  return (
    <input
      className="admin__words-update-word-input"
      type="text"
      defaultValue={item.translation}
      onChange={(e) => {
        dispatch({ type: "updateTranslationInput", translation: e.target.value });
      }}
    />
  );
};
