import React from "react";
import { useDispatch } from "react-redux";

export const AdminCreateTranslationInput: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <input
      className="admin__words-create-word-input"
      type="text"
      defaultValue="Новое слово"
      onChange={(e) => dispatch({ type: "createTranslationInput", translation: e.target.value })}
    />
  );
};
