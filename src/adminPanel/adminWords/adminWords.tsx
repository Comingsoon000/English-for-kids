import "../adminPanel.css";
import React, { useEffect, useState } from "react";
import { useTypedSelector } from "../../hooks/useTypeSelector";
import { Access, Card, getCardByPage, getCards } from "../../serverRequests/get";
import { AdminWordsRenderElement } from "./adminWordsRenderElement.tsx";

interface IAdminWordsProps {
  categoryNumber: number;
}

const setWordsPageLimit = (clienWidth: number): number => {
  if (clienWidth > 1900) {
    return 12;
  }
  if (clienWidth > 1519) {
    return 10;
  }
  if (clienWidth > 1215) {
    return 8;
  }
  if (clienWidth > 911) {
    return 6;
  }
  if (clienWidth > 623) {
    return 4;
  }
  return 3;
};

const useEffectGetCards = (
  cards: Card[],
  fetching: boolean,
  refreshing: boolean,
  currentPage: number,
  limit: number,
  updatingCategoryNumber: number,
  setTotalCount: React.Dispatch<React.SetStateAction<number>>,
  setCards: React.Dispatch<React.SetStateAction<Card[]>>,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  setFetching: React.Dispatch<React.SetStateAction<boolean>>,
  setRefreshing: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const emptyCards: Card[] = [];
  return useEffect(() => {
    if (fetching) {
      getCardByPage(updatingCategoryNumber, currentPage, limit)
        .then(([res, count]) => {
          if ((res as Access).access === "denied") {
            window.location.assign("/#");
          } else {
            setTotalCount(count);
            const newCards = cards === emptyCards ? [...(res as Card[])] : [...cards, ...(res as Card[])];
            setCards(newCards);
            setCurrentPage((prevState) => prevState + 1);
          }
        })
        .finally(() => setFetching(false));
    }

    if (refreshing) {
      getCards(updatingCategoryNumber)
        .then(([res]) => {
          setCards(res as Card[]);
        })
        .finally(() => setRefreshing(false));
    }
  }, [fetching, refreshing]);
};

const useEffectScroll = (scrollHandler: () => void, fetching: boolean) => {
  return useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function removeScrollEventListener() {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, [fetching]);
};

export const AdminWords: React.FC<IAdminWordsProps> = () => {
  const { updatingCategoryNumber } = useTypedSelector((state) => state.updatingCategoryNumber);
  const limit = setWordsPageLimit(document.body.clientWidth);
  const emptyCards: Card[] = [];
  const [cards, setCards] = useState(emptyCards);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [totalCount, setTotalCount] = useState(100000000);

  useEffectGetCards(
    cards,
    fetching,
    refreshing,
    currentPage,
    limit,
    updatingCategoryNumber,
    setTotalCount,
    setCards,
    setCurrentPage,
    setFetching,
    setRefreshing
  );

  const scrollHandler = () => {
    if (
      document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) < 200 &&
      cards.length < totalCount
    ) {
      setFetching(true);
    }
  };

  useEffectScroll(scrollHandler, fetching);

  return fetching || refreshing ? (
    <h1 className="loading">Loading...</h1>
  ) : (
    <AdminWordsRenderElement cards={cards} setRefreshing={setRefreshing} />
  );
};
