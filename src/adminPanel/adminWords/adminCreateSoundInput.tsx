import React from "react";
import { useDispatch } from "react-redux";

export const AdminCreateSoundInput: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <input
      className="admin__words-create-sound-input"
      type="file"
      onChange={(e) => dispatch({ type: "createSoundInput", sound: e.target.value })}
    />
  );
};
