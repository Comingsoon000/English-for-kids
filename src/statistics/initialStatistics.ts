import { Card, Categories } from "../serverRequests/get";

export interface CardWithStats {
  id: number;
  categoryId: number;
  word: string;
  translation: string;
  image: string;
  audioSrc: string;
  category: string;
  trainClicks: number;
  rightClicks: number;
  missClicks: number;
  rightClicksPercent: number;
}

const createCardsWithStats = (categories: Categories) => {
  const cardsWithStats: CardWithStats[] = [];
  categories.forEach((category) => {
    const categoryName = category.category;
    category.cards.forEach((item) => {
      const cardWithStats: CardWithStats = {
        id: item.id,
        categoryId: category.id,
        category: categoryName,
        word: item.word,
        translation: item.translation,
        image: (item as Card).image,
        audioSrc: (item as Card).audioSrc,
        trainClicks: 0,
        rightClicks: 0,
        missClicks: 0,
        rightClicksPercent: 0,
      };
      cardsWithStats.push(cardWithStats);
    });
  });
  return cardsWithStats;
};

const isCardsMatch = (card1: CardWithStats, card2: CardWithStats) => {
  const isCategoryIdMatch = card1.categoryId === card2.categoryId;
  const isWordMatch = card1.word === card2.word;
  const isTranslationMatch = card1.translation === card2.translation;
  const isImageMatch = card1.image === card2.image;
  const isAudioMatch = card1.audioSrc === card2.audioSrc;
  return isCategoryIdMatch && isWordMatch && isTranslationMatch && isImageMatch && isAudioMatch;
};

const compareCards = (categories: Categories): CardWithStats[] => {
  const cardsFromLocalStorage: CardWithStats[] = JSON.parse(localStorage.getItem("intialStatistics"));
  const cardsFromServerWithStats = createCardsWithStats(categories);
  if (cardsFromLocalStorage.find((item) => item.id === -10000)) {
    return cardsFromServerWithStats;
  }
  const result: CardWithStats[] = [];
  cardsFromServerWithStats.forEach((cardFromServer) => {
    let isPushed = false;
    cardsFromLocalStorage.forEach((cardFromLs) => {
      if (isCardsMatch(cardFromServer, cardFromLs)) {
        result.push(cardFromLs);
        isPushed = true;
      }
    });
    if (!isPushed) {
      result.push(cardFromServer);
    }
  });
  const currentResult = [...new Set(result)];
  return currentResult;
};

export const comparisonsCounter = { isCompareNeed: true };

export const getInitialStatistics = (categories: Categories): CardWithStats[] => {
  let intialStatistics: CardWithStats[] = JSON.parse(localStorage.getItem("intialStatistics"));
  if (comparisonsCounter.isCompareNeed) {
    intialStatistics = compareCards(categories);
    localStorage.setItem("intialStatistics", JSON.stringify(intialStatistics));
  }
  comparisonsCounter.isCompareNeed = false;
  return intialStatistics;
};
