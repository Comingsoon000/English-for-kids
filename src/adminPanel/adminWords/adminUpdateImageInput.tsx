import React from "react";
import { useDispatch } from "react-redux";

export const AdminUpdateImageInput: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <input
      className="admin__words-update-image-input"
      type="file"
      onChange={(e) => dispatch({ type: "updateImageInput", image: e.target.files })}
    />
  );
};
