import React from "react";
import { useDispatch } from "react-redux";
import { Card } from "../../serverRequests/get";

interface IAdminUpdateWordInput {
  item: Card;
}

export const AdminUpdateWordInput: React.FC<IAdminUpdateWordInput> = ({ item }) => {
  const dispatch = useDispatch();
  return (
    <input
      className="admin__words-update-word-input"
      type="text"
      defaultValue={item.word}
      onChange={(e) => dispatch({ type: "updateWordInput", word: e.target.value })}
    />
  );
};
