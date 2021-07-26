import React from "react";
import { useDispatch } from "react-redux";

export const AdminCreateWordInput: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <input
      className="admin__words-create-word-input"
      type="text"
      defaultValue="New word"
      onChange={(e) => dispatch({ type: "createWordInput", word: e.target.value })}
    />
  );
};
