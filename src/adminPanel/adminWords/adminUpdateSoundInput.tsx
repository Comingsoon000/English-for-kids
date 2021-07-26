import React from "react";
import { useDispatch } from "react-redux";

export const AdminUpdateSoundInput: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <input
      className="admin__words-update-sound-input"
      type="file"
      onChange={(e) => dispatch({ type: "updateSoundInput", audioSrc: e.target.files })}
    />
  );
};
