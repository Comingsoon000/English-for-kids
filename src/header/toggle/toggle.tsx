import "./toggle.css";
import React from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypeSelector";

export const Toggle: React.FC = () => {
  const { gameMode } = useTypedSelector((state) => state.gameMode);
  const dispatch = useDispatch();

  const changeGameMode = () => {
    dispatch({ type: gameMode });
    dispatch({ type: `matchedCards`, matchedCards: [] });
    dispatch({ type: "gameNotStarted" });
    dispatch({ type: "gameState", cardsOrder: [], gameStep: 0, attempts: 0, finish: "", chart: [] });
  };

  return (
    <div className="toggle">
      <input className="toggle__checkbox" type="checkbox" id="toggle" onClick={() => changeGameMode()} />
      <label className="toggle__label" htmlFor="toggle">
        <span className="toggle__text">train</span>
      </label>
    </div>
  );
};
