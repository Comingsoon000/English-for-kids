import React from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../hooks/useTypeSelector";
import { Categories } from "../serverRequests/get";
import { IDifficultyCategory } from "../store/reducers/statisticsReducer";
import { getCardProperties } from "./game";
import { MainItemFront } from "./mainItemFront.tsx";

const setClasses = (gameMode: "train" | "play", category: number | "categories" | "statistics") => {
  let itemImageClass: string;
  let itemBottemClass: string;
  let itemBackClass: string;

  if (category === "categories") {
    itemImageClass = "main__item-image";
    itemBottemClass = "main__item-bot";
    itemBackClass = "main__item-back_hidden";
  } else {
    itemImageClass = `main__item-image_${gameMode}`;
    itemBottemClass = `main__item-bot_${gameMode}`;
    itemBackClass = "main__item-back";
  }

  return [itemImageClass, itemBottemClass, itemBackClass];
};

const setItemClass = (
  category: number | "categories" | "statistics",
  flipped: boolean,
  flippedCardNumber: number,
  cardNumber: number,
  gameMode: string,
  matchedCards: number[]
) => {
  if (category === "categories") {
    return `main__item main__card_${gameMode}`;
  }
  if (flipped && flippedCardNumber === cardNumber) {
    return `main__item main__card_${gameMode} flip`;
  }
  if (matchedCards.includes(cardNumber)) {
    return `main__item main__card_${gameMode} disabled`;
  }
  return `main__item main__card_${gameMode}`;
};

const setItems = (
  category: number | "categories" | "statistics",
  categories: Categories,
  difficultyCategory: IDifficultyCategory
) => {
  if (category === "categories") {
    return categories;
  }
  if (category === "statistics") {
    return difficultyCategory.cards;
  }
  return categories[category].cards;
};

export const MainListRenderElement: React.FC = () => {
  const { gameMode } = useTypedSelector((state) => state.gameMode);
  const { category } = useTypedSelector((state) => state.category);
  const { difficultyCategory } = useTypedSelector((state) => state.showStatistics);
  const { categories } = useTypedSelector((state) => state.fetchCategories);
  const { flipped, flippedCardNumber } = useTypedSelector((state) => state.flipped);
  const { matchedCards } = useTypedSelector((state) => state.chosenCard);
  const items = setItems(category, categories, difficultyCategory);
  const [itemImageClass, itemBottemClass, itemBackClass] = setClasses(gameMode, category);
  const dispatch = useDispatch();
  return (
    <ul className="main__list">
      {items.map((item, index) => {
        const categoryNumber = category === ("categories" || "statistics") ? index : category;
        const currentCategoryNum = categoryNumber as number;
        const cardNumber = category === "categories" ? 0 : index;
        const [imgURL, , , translation] = getCardProperties(categories, currentCategoryNum, cardNumber, category, item);
        const itemClass = setItemClass(category, flipped, flippedCardNumber, index, gameMode, matchedCards);
        return (
          <li className={itemClass} key={index}>
            <MainItemFront
              categories={categories}
              item={item}
              index={index}
              itemImageClass={itemImageClass}
              itemBottemClass={itemBottemClass}
            />
            <div className={itemBackClass} onMouseLeave={() => (flipped ? dispatch({ type: "notFlipped" }) : "")}>
              <div className={itemImageClass} style={{ backgroundImage: `url(${imgURL})` }}></div>
              <div className={itemBottemClass}>
                <div className="main__item-text">{translation}</div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
