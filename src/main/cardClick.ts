import { Card, Categories } from "../serverRequests/get";
import { store } from "../store/store";
import { compareCards, playAudio } from "./game";

const trainClickHandler = (categoryId: number, word: string, translation: string, image: string, audioSrc: string) => {
  store.dispatch({ type: "setTraining", categoryId, word, translation, image, audioSrc });
  playAudio(audioSrc);
};

const rightClickHandler = (categoryId: number, proposedCard: Card, card: Card, chart: number[]) => {
  if (chart[chart.length - 1]) {
    const { word, translation, image, audioSrc } = card;
    store.dispatch({ type: "setRightClick", categoryId, word, translation, image, audioSrc });
  } else {
    const { word, translation, image, audioSrc } = proposedCard;
    store.dispatch({ type: "setMissClick", categoryId, word, translation, image, audioSrc });
  }
};

const stateReset = (newFinish: string) => {
  if (newFinish === "success" || newFinish === "failure") {
    setTimeout(() => {
      store.dispatch({ type: `matchedCards`, matchedCards: [] });
      store.dispatch({ type: "gameState", cardsOrder: [], gameStep: 0, attempts: 0, finish: "", chart: [] });
      store.dispatch({ type: "gameNotStarted" });
      store.dispatch({ type: "categories" });
    }, 3000);
  }
};

const playGameHandler = (categories: Categories, categoryId: number, categoryNumber: number, cardNumber: number) => {
  const { gameStarted } = store.getState().gameStarted;
  const { matchedCards } = store.getState().chosenCard;
  const { cardsOrder, gameStep, attempts, chart } = store.getState().gameState;
  if (gameStarted) {
    const proposedCategoryNumber = categoryNumber;
    const proposedCardNumber = cardsOrder[gameStep];
    const proposedCard = categories[proposedCategoryNumber].cards[proposedCardNumber];
    const card = categories[categoryNumber].cards[cardNumber];
    const [newGameStep, newAttempts, newMatchedCards, newFinish, newChart] = compareCards(
      categories,
      cardNumber,
      gameStep,
      attempts,
      categoryNumber,
      cardsOrder,
      matchedCards,
      chart
    );
    store.dispatch({ type: `matchedCards`, matchedCards: newMatchedCards, chosenCardNumber: cardNumber });
    store.dispatch({
      type: "gameState",
      cardsOrder,
      gameStep: newGameStep,
      attempts: newAttempts,
      finish: newFinish,
      chart: newChart,
    });
    rightClickHandler(categoryId, proposedCard, card, chart);
    stateReset(newFinish);
  }
};

export const cardClick = (categories: Categories, newCategory: number, cardNumber: number): void => {
  const { category } = store.getState().category;
  const { gameMode } = store.getState().gameMode;
  const { difficultyCategory } = store.getState().showStatistics;
  if (category === "statistics") {
    const { categoryId, word, translation, image, audioSrc } = difficultyCategory.cards[cardNumber];
    const difficultyCards = difficultyCategory.cards.map((card) => {
      return { word: card.word, translation: card.translation, image: card.image, audioSrc: card.audioSrc };
    });
    const playDifficaltyCategory = { id: -2, _id: -2, category: "playDifficaltyCategory", cards: difficultyCards };
    if (gameMode === "train") {
      trainClickHandler(categoryId, word, translation, image, audioSrc);
    } else {
      playGameHandler([playDifficaltyCategory], categoryId, 0, cardNumber);
    }
  } else if (category !== "categories") {
    const categoryNumber = category as number;
    const categoryId = categories[categoryNumber].id;
    const card = categories[categoryNumber].cards[cardNumber];
    const { word, translation, image, audioSrc } = card;
    if (gameMode === "train") {
      trainClickHandler(categoryId, word, translation, image, audioSrc);
    } else {
      playGameHandler(categories, categoryId, categoryNumber, cardNumber);
    }
  } else {
    store.dispatch({ type: newCategory });
  }
};
