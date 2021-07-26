import React from "react";
import { useTypedSelector } from "../../hooks/useTypeSelector";
import { Card } from "../../serverRequests/get";
import { AdminWordsCreateWord } from "./adminWordsCreateWord.tsx";
import { AdminWordsHeader } from "./adminWordsHeader.tsx";
import { AdminWordsNewWord } from "./adminWordsNewWord.tsx";
import { AdminWordsUpdateWord } from "./adminWordsUpdateWord.tsx";
import { AdminWordsWord } from "./adminWordsWord.tsx";

interface IAdminWordsRenderElementProps {
  cards: Card[];
  setRefreshing: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AdminWordsRenderElement: React.FC<IAdminWordsRenderElementProps> = ({ cards, setRefreshing }) => {
  const { categoryName } = useTypedSelector((state) => state.updatingCategoryNumber);
  return (
    <div className="admin">
      <AdminWordsHeader />
      <div className="admin__category-name">{`Category: ${categoryName}`}</div>
      <div className="admin__wrapper">
        {cards.map((item: Card, index: number) => {
          return (
            <div key={index}>
              <AdminWordsWord item={item} index={index} setRefreshing={setRefreshing} />
              <AdminWordsUpdateWord item={item} index={index} setRefreshing={setRefreshing} />
            </div>
          );
        })}
        <AdminWordsNewWord />
        <AdminWordsCreateWord cards={cards} setRefreshing={setRefreshing} />
      </div>
    </div>
  );
};
