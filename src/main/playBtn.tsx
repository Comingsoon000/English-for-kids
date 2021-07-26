import React from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../hooks/useTypeSelector";
import { Categories } from "../serverRequests/get";
import { getCard, playAudio, startGame } from "./game";

export const PlayBtn: React.FC = () => {
  const { gameMode } = useTypedSelector((state) => state.gameMode);
  const { category } = useTypedSelector((state) => state.category);
  const { gameStarted } = useTypedSelector((state) => state.gameStarted);
  const { statistics, difficultyCategory } = useTypedSelector((state) => state.showStatistics);
  const repeatImgURL = "https://res.cloudinary.com/comingsoon/image/upload/v1626608971/u5rdbgwj2zxdcqmm4mxi.svg";
  const dispatch = useDispatch();
  const difficultyCards = difficultyCategory.cards.map((card) => {
    return { word: card.word, translation: card.translation, image: card.image, audioSrc: card.audioSrc };
  });
  const playDifficaltyCategory = { id: -2, _id: -2, category: "playDifficaltyCategory", cards: difficultyCards };
  let playBtnClass = "";

  const startGameclick = (categories: Categories) => {
    const attempts = 0;
    const currentCategories = category === "statistics" ? [playDifficaltyCategory] : categories;
    const categoryNumber = category === "statistics" ? 0 : (category as number);
    dispatch({ type: "gameStarted" });
    const [cardsOrder, proposedCardNumber, gameStep] = startGame(currentCategories, categoryNumber);
    dispatch({ type: "proposedCard", proposedCardNumber });
    dispatch({ type: "gameState", cardsOrder, gameStep, attempts, finish: "", chart: [] });
  };
  const { cardsOrder, gameStep } = useTypedSelector((state) => state.gameState);
  const repeatClick = (categories: Categories) => {
    const proposedCardNumber = cardsOrder[gameStep];
    const currentCategories = category === "statistics" ? [playDifficaltyCategory] : categories;
    const categoryNumber = category === "statistics" ? 0 : (category as number);
    const audioSrc = `${getCard(currentCategories, categoryNumber, proposedCardNumber).audioSrc}`;
    playAudio(audioSrc);
  };
  playBtnClass =
    category !== "categories" && gameMode === "play" && !gameStarted ? "main__play-btn" : "main__play-btn_hidden";
  playBtnClass =
    category === "statistics" && difficultyCategory.cards.length < 1 ? "main__play-btn_hidden" : playBtnClass;
  const emptyCatText =
    category === "statistics" && statistics.length < 1 ? "main__empty-text" : "main__empty-text_hidden";
  const repeatBtnClass = gameStarted && gameMode === "play" ? "main__repeat-btn" : "main__repeat-btn_hidden";

  const { categories } = useTypedSelector((state) => state.fetchCategories);

  return (
    <>
      <div className={emptyCatText}>This category now is empty !</div>
      <div className={playBtnClass} onClick={() => startGameclick(categories)}>
        start game
      </div>
      <div
        className={repeatBtnClass}
        onClick={() => repeatClick(categories)}
        style={{ backgroundImage: `url(${repeatImgURL})` }}
      ></div>
    </>
  );
};
