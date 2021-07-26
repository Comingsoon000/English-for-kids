import "../adminPanel.css";
import React, { useEffect, useState } from "react";
import { Access, Categories, getCategories, getCategoriesByPage } from "../../serverRequests/get";
import { AdminCategoriesRenderElement } from "./adminCategoriesRenderElement.tsx";

const setCategoriesPageLimit = (clienWidth: number): number => {
  if (clienWidth > 1900) {
    return 30;
  }
  if (clienWidth > 1519) {
    return 25;
  }
  if (clienWidth > 1215) {
    return 20;
  }
  if (clienWidth > 911) {
    return 15;
  }
  if (clienWidth > 623) {
    return 10;
  }
  return 5;
};

const useEffectGetCategories = (
  fetching: boolean,
  refreshing: boolean,
  currentPage: number,
  limit: number,
  categories: Categories,
  setTotalCount: React.Dispatch<React.SetStateAction<number>>,
  setCategories: React.Dispatch<React.SetStateAction<Categories>>,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  setFetching: React.Dispatch<React.SetStateAction<boolean>>,
  setRefreshing: React.Dispatch<React.SetStateAction<boolean>>
) => {
  return useEffect(() => {
    if (fetching) {
      getCategoriesByPage(currentPage, limit)
        .then(([res, count]) => {
          if ((res as Access).access === "denied") {
            window.location.assign("/#");
          } else {
            setTotalCount(count);
            const newCategory = [...categories, ...(res as Categories)];
            setCategories(newCategory);
            setCurrentPage((prevState) => prevState + 1);
          }
        })
        .finally(() => setFetching(false));
    }

    if (refreshing) {
      getCategories().then(([res]) => {
        setCategories(res as Categories);
        setRefreshing(false);
      });
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

export const AdminCategories: React.FC = () => {
  const limit = setCategoriesPageLimit(document.body.clientWidth);
  const emtyCategories: Categories = [];
  const [categories, setCategories] = useState(emtyCategories);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [totalCount, setTotalCount] = useState(100000000);

  useEffectGetCategories(
    fetching,
    refreshing,
    currentPage,
    limit,
    categories,
    setTotalCount,
    setCategories,
    setCurrentPage,
    setFetching,
    setRefreshing
  );

  const scrollHandler = () => {
    if (
      document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) < 150 &&
      categories.length < totalCount
    ) {
      setFetching(true);
    }
  };

  useEffectScroll(scrollHandler, fetching);

  return fetching || refreshing ? (
    <h1 className="loading">Loading...</h1>
  ) : (
    <AdminCategoriesRenderElement categories={categories} setRefreshing={setRefreshing} />
  );
};
