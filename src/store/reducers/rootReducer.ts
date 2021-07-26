import { combineReducers } from "redux";
import { CategoryReducer } from "./categoryReducer";
import { ChosenCardReducer } from "./chosenCardReducer";
import { FlipReducer } from "./flipReducer";
import { GameModeReducer } from "./gameModeReducer";
import { GameReducer } from "./gameReducer";
import { ModalReducer } from "./modalReducer";
import { NavMenuReducer } from "./navMenuReducer";
import { NewCategoryReducer } from "./newCategoryReducer";
import { NewWordReducer } from "./newWordReducer";
import { ProposedCardReducer } from "./proposedCardReducer";
import { StartGameReducer } from "./startGameReducer";
import { StatisticsReducer } from "./statisticsReducer";
import { UpdateCategoryReducer } from "./updateCategoryReducer";
import { UpdatingCategoryNumberReducer } from "./updatingCategoryNumber";
import { UpdateWordReducer } from "./updateWordReducer";
import { fetchCategoriesReducer } from "./fetchCategoriesReducer";
import { UpdatedFileReducer } from "./updatedFileReducer";
import { CreatedFileReducer } from "./createdFileReducer";

export const rootReducer = combineReducers({
  gameMode: GameModeReducer,
  category: CategoryReducer,
  flipped: FlipReducer,
  openedNavMenu: NavMenuReducer,
  gameStarted: StartGameReducer,
  chosenCard: ChosenCardReducer,
  proposedCard: ProposedCardReducer,
  gameState: GameReducer,
  showStatistics: StatisticsReducer,
  openedModal: ModalReducer,
  updateCategory: UpdateCategoryReducer,
  createCategory: NewCategoryReducer,
  createWord: NewWordReducer,
  updatingCategoryNumber: UpdatingCategoryNumberReducer,
  updateWord: UpdateWordReducer,
  fetchCategories: fetchCategoriesReducer,
  updatedFile: UpdatedFileReducer,
  createdFile: CreatedFileReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
