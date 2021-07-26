import { Categories } from "../serverRequests/get";

export interface Category {
  id?: number;
  _id?: number;
  category?: string;
  cards?: {
    id?: number;
    _id?: number;
    word?: string;
    translation?: string;
    image?: string;
    audioSrc?: string;
  }[];
}

export interface Card {
  id?: number;
  _id?: number;
  word?: string;
  translation?: string;
  image?: string;
  audioSrc?: string;
}

export const getCard = (categories: Categories, categoryNumber: number, cardNumber: number): Card => {
  if (categories[categoryNumber].cards.length === 0) {
    return { word: "", translation: "", image: "", audioSrc: "" };
  }
  return categories[categoryNumber].cards[cardNumber];
};

export const getCardProperties = (
  categories: Categories,
  categoryNumber: number,
  cardNumber: number,
  category: number | "categories" | "statistics",
  item: Category | Card
): string[] => {
  const imgURL =
    category === "statistics" ? `${(item as Card).image}` : `${getCard(categories, categoryNumber, cardNumber).image}`;
  const audioSrc =
    category === "statistics"
      ? `${(item as Card).audioSrc}`
      : `${getCard(categories, categoryNumber, cardNumber).audioSrc}`;
  let text: string;
  if (category === "categories") {
    text = (item as Category).category;
  } else if (category === "statistics") {
    text = (item as Card).word;
  } else {
    text = getCard(categories, categoryNumber, cardNumber).word;
  }
  const translation =
    category === "statistics"
      ? (item as Card).translation
      : getCard(categories, categoryNumber, cardNumber).translation;
  return [imgURL, audioSrc, text as string, translation];
};

export const playAudio = async (src: string): Promise<void> => {
  const audio = new Audio(src);
  audio.src = src;
  try {
    await audio.play();
  } catch (e) {
    console.log("Wrong link to audio file");
  }
};

export const getRandomIntsArr = (categories: Categories, category: number): number[] => {
  const categoryLenght = categories[category].cards.length;
  const randomIntsArr: number[] = [];
  let i = 0;
  while (i < categoryLenght) {
    const ramdomInt = Math.floor(Math.random() * categoryLenght);
    if (!randomIntsArr.includes(ramdomInt)) {
      randomIntsArr.push(ramdomInt);
      i = randomIntsArr.length;
    }
  }
  return randomIntsArr;
};

export const startGame = (categories: Categories, category: number): [number[], number, number] => {
  const cardsOrder = getRandomIntsArr(categories, category);
  const categoryNumber = category;
  const beginGameStep = 0;
  const proposedCardNumber = cardsOrder[beginGameStep];
  const audioSrc = `${getCard(categories, categoryNumber, proposedCardNumber).audioSrc}`;
  playAudio(audioSrc);
  return [cardsOrder, proposedCardNumber, beginGameStep];
};

export const nextStepGame = (
  categories: Categories,
  category: number,
  gameStep: number,
  cardsOrder: number[]
): void => {
  const categoryNumber = category;
  const proposedCardNumber = cardsOrder[gameStep];
  const audioSrc = `${getCard(categories, categoryNumber, proposedCardNumber).audioSrc}`;
  playAudio(audioSrc);
};

export const compareCards = (
  categories: Categories,
  chosenCard: number,
  gameStep: number,
  attempts: number,
  category: number,
  cardsOrder: number[],
  matchedCards: number[],
  chart: number[]
): [number, number, number[], string, number[]] => {
  const proposedCardNumber = cardsOrder[gameStep];
  if (proposedCardNumber !== chosenCard) {
    playAudio("https://res.cloudinary.com/comingsoon/video/upload/v1626610206/u18mn3ueaa2pvqtfmw8a.mp3");
    chart.push(0);
    return [gameStep, attempts + 1, matchedCards, "", chart];
  }
  if (gameStep === categories[category].cards.length - 1) {
    if (gameStep === attempts) {
      playAudio("https://res.cloudinary.com/comingsoon/video/upload/v1626610128/mwhnxhdzkchz4de9ejop.mp3");
      return [0, 0, [], "success", []];
    }
    playAudio("https://res.cloudinary.com/comingsoon/video/upload/v1626609923/caifnto5apkoc3g0eojg.mp3");
    return [gameStep, attempts, [], "failure", []];
  }
  playAudio("https://res.cloudinary.com/comingsoon/video/upload/v1626610019/ll7a8wfc1xnni4vs4ecs.mp3");
  matchedCards.push(proposedCardNumber);
  chart.push(1);
  setTimeout(() => nextStepGame(categories, category, gameStep + 1, cardsOrder), 500);
  return [gameStep + 1, attempts + 1, matchedCards, "", chart];
};
