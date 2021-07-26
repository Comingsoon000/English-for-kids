import React from "react";
import { useDispatch } from "react-redux";

let clickCounter = 0;

export const StatisticsTitle: React.FC = () => {
  const dispatch = useDispatch();
  const clickHandler = (type: string) => {
    clickCounter += 1;
    const orderSwitcher = clickCounter % 2;
    const currentType = orderSwitcher ? `${type}Reverse` : type;
    dispatch({ type: currentType });
  };

  return (
    <tr className="statistics__table-title">
      <th onClick={() => clickHandler("sortByCategory")} className="statistics__table-title-th">
        category
      </th>
      <th onClick={() => clickHandler("sortByWord")} className="statistics__table-title-th">
        word
      </th>
      <th onClick={() => clickHandler("sortByTranslation")} className="statistics__table-title-th">
        translation
      </th>
      <th onClick={() => clickHandler("sortByTrainClicks")} className="statistics__table-title-th">
        train
      </th>
      <th onClick={() => clickHandler("sortByRightClicks")} className="statistics__table-title-th">
        right
      </th>
      <th onClick={() => clickHandler("sortByMissClicks")} className="statistics__table-title-th">
        miss
      </th>
      <th onClick={() => clickHandler("sortByPercent")} className="statistics__table-title-th">
        percent
      </th>
    </tr>
  );
};
