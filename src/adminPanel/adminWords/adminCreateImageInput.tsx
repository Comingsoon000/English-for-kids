import React from "react";
import { useDispatch } from "react-redux";

export const AdminCreateImageInput: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <input
      className="admin__words-create-image-input"
      type="file"
      onChange={(e) => dispatch({ type: "createImageInput", image: e.target.value })}
    />
  );
};
