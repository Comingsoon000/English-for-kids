import React from "react";
import { useTypedSelector } from "../hooks/useTypeSelector";
import { Categories } from "../serverRequests/get";
import { cardClick } from "./cardClick";
import { Card, Category, getCardProperties } from "./game";
import { RotateBtn } from "./rotateBtn.tsx";

interface IMainItemFrontProps {
  categories: Categories;
  item: Category | Card;
  index: number;
  itemImageClass: string;
  itemBottemClass: string;
}

export const MainItemFront: React.FC<IMainItemFrontProps> = ({
  categories,
  item,
  index,
  itemImageClass,
  itemBottemClass,
}) => {
  const { category } = useTypedSelector((state) => state.category);
  const categoryNumber = category === "categories" ? index : category;
  const categoryImageNumber = 0;
  const cardNumber = category === "categories" ? categoryImageNumber : index;
  const [imgURL, , text, ,] = getCardProperties(categories, categoryNumber as number, cardNumber, category, item);

  return (
    <div className="main__item-front" onClick={() => cardClick(categories, index, cardNumber)}>
      <div className={itemImageClass} style={{ backgroundImage: `url(${imgURL})` }}></div>
      <div className={itemBottemClass}>
        <div className="main__item-text">{text}</div>
        <RotateBtn flippedCardNumber={index} />
      </div>
    </div>
  );
};
