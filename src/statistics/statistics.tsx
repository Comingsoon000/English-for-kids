import "./statistics.css";
import React from "react";
import { useDispatch } from "react-redux";
import { StatisticsTitle } from "./title.tsx";
import { useTypedSelector } from "../hooks/useTypeSelector";
import { getInitialStatistics } from "./initialStatistics";
import { store } from "../store/store";

const clickDifficultyTrain = () => {
  store.dispatch({ type: "statistics" });
  store.dispatch({ type: "createDifficultyCategory" });
  store.dispatch({ type: "showStatistics", showStatistics: false });
};

export const Statistics: React.FC = () => {
  const { showStatistics } = useTypedSelector((state) => state.showStatistics);
  const { categories, loading } = useTypedSelector((state) => state.fetchCategories);
  const statisticsClass = showStatistics ? "statistics" : "statistics_hidden";
  const dispatch = useDispatch();
  if (loading) {
    return <h1 className="loading">Loading...</h1>;
  }
  const statistics = getInitialStatistics(categories);
  return (
    <div className={statisticsClass}>
      <div className="statistics__top">
        <div onClick={() => clickDifficultyTrain()} className="statistics__train-btn">
          Train difficult
        </div>
        <div onClick={() => dispatch({ type: "reset" })} className="statistics__reset-btn">
          Reset
        </div>
      </div>
      <table className="statistics__table">
        <tbody>
          <StatisticsTitle />
          {statistics.map((row, index) => {
            return (
              <tr className="statistics__table-row" key={index}>
                <th className="statistics__table-th">{row.category}</th>
                <th className="statistics__table-th">{row.word}</th>
                <th className="statistics__table-th">{row.translation}</th>
                <th className="statistics__table-th">{row.trainClicks}</th>
                <th className="statistics__table-th">{row.rightClicks}</th>
                <th className="statistics__table-th">{row.missClicks}</th>
                <th className="statistics__table-th">{row.rightClicksPercent}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
