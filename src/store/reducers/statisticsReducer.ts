import { CardWithStats } from "../../statistics/initialStatistics";

export interface IStatisticsState {
  showStatistics?: boolean;
  statistics?: CardWithStats[];
  categoryId?: number;
  word?: string;
  translation?: string;
  image?: string;
  audioSrc?: string;
  difficultyCategory?: IDifficultyCategory;
}

export interface IStatisticsAction {
  type: string;
  showStatistics?: boolean;
  statistics?: CardWithStats[];
  categoryId?: number;
  word?: string;
  translation?: string;
  image?: string;
  audioSrc?: string;
  difficultyCategory?: IDifficultyCategory;
}

export interface IDifficultyCategory {
  id: number;
  _id: number;
  category: string;
  cards: {
    categoryId: number;
    word: string;
    translation: string;
    image: string;
    audioSrc: string;
  }[];
}

export interface IDifficultyCard {
  categoryId: number;
  word: string;
  translation: string;
  image: string;
  audioSrc: string;
}

type Property = "trainClicks" | "rightClicks" | "missClicks";
type SortType =
  | "translation"
  | "word"
  | "rightClicksPercent"
  | "category"
  | "trainClicks"
  | "rightClicks"
  | "missClicks";

export const emptyStatistics = [
  {
    id: -10000,
    categoryId: -10000,
    word: "",
    translation: "",
    image: "",
    audioSrc: "",
    category: "",
    trainClicks: 0,
    rightClicks: 0,
    missClicks: 0,
    rightClicksPercent: 0,
  },
];

if (!JSON.parse(localStorage.getItem("intialStatistics"))) {
  localStorage.setItem("intialStatistics", JSON.stringify(emptyStatistics));
}

const initialStatistics = JSON.parse(localStorage.getItem("intialStatistics"));

const initialState: IStatisticsState = {
  showStatistics: false,
  statistics: initialStatistics,
  categoryId: 0,
  word: "",
  translation: "",
  image: "",
  audioSrc: "",
  difficultyCategory: {
    id: -2,
    _id: -2,
    category: "difficultyCategory",
    cards: [{ categoryId: -2, word: "", translation: "", image: "", audioSrc: "" }],
  },
};

const setNewStatsInLS = (statistics: CardWithStats[]) => {
  localStorage.setItem("intialStatistics", JSON.stringify(statistics));
};

const calculatePercent = (missCliks: number, rightClicks: number) => {
  return rightClicks + missCliks ? (rightClicks * 100) / (rightClicks + missCliks) : 0;
};

const setProperty = (
  statistics: CardWithStats[],
  categoryId: number,
  word: string,
  translation: string,
  image: string,
  audioSrc: string,
  property: Property
) => {
  const result = statistics.map((card) => {
    const isCategoryNameCurrent = card.categoryId === categoryId;
    const isWordCurrent = card.word === word;
    const isTranslationCurrent = card.translation === translation;
    const isImageCurrent = card.image === image;
    const isAudioSrcCurrent = card.audioSrc === audioSrc;
    if (isCategoryNameCurrent && isWordCurrent && isTranslationCurrent && isImageCurrent && isAudioSrcCurrent) {
      card[property] += 1;
      const rightClicksPercent = calculatePercent(card.missClicks, card.rightClicks);
      card.rightClicksPercent = Math.round(rightClicksPercent * 100) / 100;
    }
    return card;
  });
  setNewStatsInLS(statistics);
  return result;
};

const sortByType = (statistics: CardWithStats[], sortType: SortType) => {
  const result = statistics.sort((prev, next) => {
    return prev[sortType] < next[sortType] ? -1 : 1;
  });
  setNewStatsInLS(statistics);
  return result;
};

const reverseSortByType = (statistics: CardWithStats[], sortType: SortType) => {
  const result = statistics.sort((prev, next) => {
    return prev[sortType] > next[sortType] ? -1 : 1;
  });
  setNewStatsInLS(statistics);
  return result;
};

const reset = (statistics: CardWithStats[]) => {
  const result = statistics.map((card) => {
    card.trainClicks = 0;
    card.rightClicks = 0;
    card.missClicks = 0;
    card.rightClicksPercent = 0;
    return card;
  });
  setNewStatsInLS(statistics);
  return result;
};

const createDifficultyCategory = (statistics: CardWithStats[]): IDifficultyCategory => {
  const maxLength = 8;
  const category = statistics
    .filter((card) => card.missClicks > 0)
    .sort((prev, next) => next.missClicks - prev.missClicks)
    .slice(0, maxLength)
    .map((card) => {
      const newCard = {
        categoryId: card.categoryId,
        word: card.word,
        translation: card.translation,
        image: card.image,
        audioSrc: card.audioSrc,
      };
      return newCard;
    });
  return { id: -1, _id: -1, category: "statistics", cards: category };
};

const setTrainClickInState = (state: IStatisticsState, action: IStatisticsAction): IStatisticsState => {
  return {
    ...state,
    statistics: setProperty(
      state.statistics,
      action.categoryId,
      action.word,
      action.translation,
      action.image,
      action.audioSrc,
      "trainClicks"
    ),
  };
};

const setRightClickInState = (state: IStatisticsState, action: IStatisticsAction): IStatisticsState => {
  return {
    ...state,
    statistics: setProperty(
      state.statistics,
      action.categoryId,
      action.word,
      action.translation,
      action.image,
      action.audioSrc,
      "rightClicks"
    ),
  };
};

const setMissClickInState = (state: IStatisticsState, action: IStatisticsAction): IStatisticsState => {
  return {
    ...state,
    statistics: setProperty(
      state.statistics,
      action.categoryId,
      action.word,
      action.translation,
      action.image,
      action.audioSrc,
      "missClicks"
    ),
  };
};

export const StatisticsReducer = (
  state: IStatisticsState = initialState,
  action: IStatisticsAction
): IStatisticsState => {
  switch (action.type) {
    case "setStatistics":
      return { ...state, statistics: action.statistics };
    case "showStatistics":
      return { ...state, showStatistics: action.showStatistics };
    case "setTraining":
      return setTrainClickInState(state, action);
    case "setRightClick":
      return setRightClickInState(state, action);
    case "setMissClick":
      return setMissClickInState(state, action);
    case "sortByCategory":
      return { ...state, statistics: sortByType(state.statistics, "category") };
    case "sortByWord":
      return { ...state, statistics: sortByType(state.statistics, "word") };
    case "sortByTranslation":
      return { ...state, statistics: sortByType(state.statistics, "translation") };
    case "sortByTrainClicks":
      return { ...state, statistics: sortByType(state.statistics, "trainClicks") };
    case "sortByRightClicks":
      return { ...state, statistics: sortByType(state.statistics, "rightClicks") };
    case "sortByMissClicks":
      return { ...state, statistics: sortByType(state.statistics, "missClicks") };
    case "sortByPercent":
      return { ...state, statistics: sortByType(state.statistics, "rightClicksPercent") };
    case "sortByCategoryReverse":
      return { ...state, statistics: reverseSortByType(state.statistics, "category") };
    case "sortByWordReverse":
      return { ...state, statistics: reverseSortByType(state.statistics, "word") };
    case "sortByTranslationReverse":
      return { ...state, statistics: reverseSortByType(state.statistics, "translation") };
    case "sortByTrainClicksReverse":
      return { ...state, statistics: reverseSortByType(state.statistics, "trainClicks") };
    case "sortByRightClicksReverse":
      return { ...state, statistics: reverseSortByType(state.statistics, "rightClicks") };
    case "sortByMissClicksReverse":
      return { ...state, statistics: reverseSortByType(state.statistics, "missClicks") };
    case "sortByPercentReverse":
      return { ...state, statistics: reverseSortByType(state.statistics, "rightClicksPercent") };
    case "reset":
      return { ...state, statistics: reset(state.statistics) };
    case "createDifficultyCategory":
      return { ...state, difficultyCategory: createDifficultyCategory(state.statistics) };
    default:
      return state;
  }
};
