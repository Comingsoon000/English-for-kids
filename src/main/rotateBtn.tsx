import React from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../hooks/useTypeSelector";

interface IRotateBtnProps {
  flippedCardNumber: number;
}

export const RotateBtn: React.FC<IRotateBtnProps> = ({ flippedCardNumber }) => {
  const { gameMode } = useTypedSelector((state) => state.gameMode);
  const { category } = useTypedSelector((state) => state.category);
  const dispatch = useDispatch();

  const btnClick = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    dispatch({ type: "flipped", flippedCardNumber });
  };

  const rotateBtnClass =
    category === "categories" || gameMode === "play" ? "main__item-rotate-btn_hidden" : "main__item-rotate-btn";

  return (
    <svg
      onClick={(event) => btnClick(event)}
      className={rotateBtnClass}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="32"
      height="32"
      viewBox="0 0 16 16"
      fill="#5d9c67"
    >
      <path
        d="M16 7v-4l-1.1 1.1c-1.3-2.5-3.9-4.1-6.9-4.1-4.4 0-8 3.6-8 8s3.6 8 8 8c2.4 0 
        4.6-1.1 6-2.8l-1.5-1.3c-1.1 1.3-2.7 2.1-4.5 2.1-3.3 0-6-2.7-6-6s2.7-6 6-6c2.4 
        0 4.5 1.5 5.5 3.5l-1.5 1.5h4z"
      ></path>
    </svg>
  );
};
