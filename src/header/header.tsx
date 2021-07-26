import "./header.css";
import React from "react";
import { Toggle } from "./toggle/toggle.tsx";
import { useTypedSelector } from "../hooks/useTypeSelector";
import { store } from "../store/store";
import { Categories } from "../serverRequests/get";

const switchNavMenu = (event: { stopPropagation: () => void }) => {
  event.stopPropagation();
  const { openedNavMenu } = store.getState().openedNavMenu;
  const action = openedNavMenu ? "openedNavMenu" : "closedNavMenu";
  store.dispatch({ type: action });
};

const closeNavMenu = (event: React.MouseEvent<HTMLElement>) => {
  const headerContainer = document.querySelector(".header__container");
  const headerBtn = document.querySelector(".header__btn");
  const { openedNavMenu } = store.getState().openedNavMenu;
  if (!(event.target === headerContainer || event.target === headerBtn) && openedNavMenu)
    store.dispatch({ type: "openedNavMenu" });
};

let isFirstClick = true;

const clickLink = (categories: Categories, linkNumber: number) => {
  if (isFirstClick) {
    const statistics = JSON.parse(localStorage.getItem("intialStatistics"));
    store.dispatch({ type: "setStatistics", statistics });
    isFirstClick = false;
  }
  store.dispatch({ type: "gameNotStarted" });
  store.dispatch({ type: `matchedCards`, matchedCards: [] });
  store.dispatch({ type: "gameState", cardsOrder: [], gameStep: 0, attempts: 0, finish: "", chart: [] });
  if (linkNumber === 0) {
    store.dispatch({ type: "categories" });
    store.dispatch({ type: "showStatistics", showStatistics: false });
  } else if (linkNumber <= categories.length) {
    store.dispatch({ type: linkNumber - 1 });
    store.dispatch({ type: "showStatistics", showStatistics: false });
  } else {
    store.dispatch({ type: "statistics" });
    store.dispatch({ type: "showStatistics", showStatistics: true });
  }
};

const clickModal = () => {
  store.dispatch({ type: "closedModal" });
};

export const AppHeader: React.FC = () => {
  const { openedNavMenu } = useTypedSelector((state) => state.openedNavMenu);
  const { category } = useTypedSelector((state) => state.category);
  const { showStatistics } = useTypedSelector((state) => state.showStatistics);
  const headerBtnClass = openedNavMenu ? "header__btn header__btn_open" : "header__btn";
  const { categories } = useTypedSelector((state) => state.fetchCategories);
  const categoriesNames = categories.map((item) => item.category);
  const links = ["Main page", ...categoriesNames, "Statistics"];

  return (
    <header className="header" onClick={(event) => closeNavMenu(event)}>
      <nav className="header__nav">
        <div className={headerBtnClass} onClick={(event) => switchNavMenu(event)}>
          <div className="header__icon"></div>
        </div>
        <h1 className="header__title"></h1>
        <Toggle />
        <div className="header__container">
          <ul className="header__list">
            {links.map((link, index) => {
              let headerItemClass = category === index - 1 && !showStatistics ? "header__item_active" : "header__item";
              if (showStatistics && link === "Statistics") {
                headerItemClass = "header__item_active";
              } else if (link === "Main page" && !showStatistics && category === "categories") {
                headerItemClass = "header__item_active";
              }
              return (
                <li onClick={() => clickLink(categories, index)} className={headerItemClass} key={index}>
                  <a className="header__link">{link}</a>
                </li>
              );
            })}
          </ul>
          <div className="header__login" onClick={() => clickModal()}>
            Login
          </div>
        </div>
      </nav>
    </header>
  );
};
