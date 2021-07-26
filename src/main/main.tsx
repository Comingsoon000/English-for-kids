import "./main.css";
import React from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../hooks/useTypeSelector";
import { PlayBtn } from "./playBtn.tsx";
import { WInStar } from "./winStar.tsx";
import { Star } from "./star.tsx";
import { MainList } from "./mainList.tsx";

export const AppMain: React.FC = () => {
  const { openedNavMenu } = useTypedSelector((state) => state.openedNavMenu);
  const { showStatistics } = useTypedSelector((state) => state.showStatistics);
  const { gameStep, attempts, finish, chart } = useTypedSelector((state) => state.gameState);
  const dispatch = useDispatch();

  const mistakes = attempts - gameStep;
  const successClass = finish === "success" ? "success" : "success_hidden";
  const failureClass = finish === "failure" ? "failure" : "failure_hidden";
  const botWrapper = finish === "success" || finish === "failure" ? "bot-wrapper" : "bot-wrapper_hidden";
  const mainClass = finish === "success" || finish === "failure" || showStatistics ? "main_hidden" : "main";
  const successBgImageUrl = "https://res.cloudinary.com/comingsoon/image/upload/v1626608539/zedbjkqzb0cageiezvkt.jpg";
  const failureBgImageUrl = "https://res.cloudinary.com/comingsoon/image/upload/v1626608316/asptrjbyhkyyjoyehrkg.jpg";
  const closeNavMenu = () => {
    if (openedNavMenu) dispatch({ type: "openedNavMenu" });
  };
  return (
    <>
      <main className={mainClass} onClick={() => closeNavMenu()}>
        <div className="main__stars-wrapper">
          {chart
            .map((chartStep, index) => {
              return chartStep ? <WInStar key={index} /> : <Star key={index} />;
            })
            .reverse()}
        </div>
        <PlayBtn />
        <MainList />
      </main>
      <div className={botWrapper}>
        <div className={successClass} style={{ backgroundImage: `url(${successBgImageUrl})` }}></div>
        <div className={failureClass} style={{ backgroundImage: `url(${failureBgImageUrl})` }}>
          <div className="failure-text">Mistakes: {mistakes}</div>
        </div>
      </div>
    </>
  );
};
