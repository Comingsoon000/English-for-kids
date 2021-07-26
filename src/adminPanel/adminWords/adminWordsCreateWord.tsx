import React, { Dispatch } from "react";
import { useTypedSelector } from "../../hooks/useTypeSelector";
import { Card } from "../../serverRequests/get";
import { createNewCard } from "../../serverRequests/post";
import { store } from "../../store/store";
import { AdminCreateImageInput } from "./adminCreateImageInput.tsx";
import { AdminCreateSoundInput } from "./adminCreateSoundInput.tsx";
import { AdminCreateTranslationInput } from "./adminCreateTranslationInput.tsx";
import { AdminCreateWordInput } from "./adminCreateWordInput.tsx";

interface IAdminWordsCreateWordProps {
  cards: Card[];
  setRefreshing: React.Dispatch<React.SetStateAction<boolean>>;
}

const clickCancelCreateWord = () => {
  store.dispatch({ type: "cancelcreateWord" });
};

const clickSubmitCreateWord = async (wordNumber: number, categoryNumber: number, setRefreshing: Dispatch<boolean>) => {
  store.dispatch({ type: "cancelcreateWord" });
  await createNewCard(wordNumber, categoryNumber);
  setRefreshing(true);
};

export const AdminWordsCreateWord: React.FC<IAdminWordsCreateWordProps> = ({ cards, setRefreshing }) => {
  const { updatingCategoryNumber } = useTypedSelector((state) => state.updatingCategoryNumber);
  const { createWord } = useTypedSelector((state) => state.createWord);
  const newWordCreateClass = createWord ? "admin__new-word-create" : "admin__new-word-create_hidden";

  return (
    <div className={newWordCreateClass}>
      <label className="admin__words-create-word-label">Word</label>
      <AdminCreateWordInput />
      <label className="admin__words-create-word-label">Translation</label>
      <AdminCreateTranslationInput />
      <div className="admin__words-create-wrapper">
        <div className="admin__words-create-sound-text">Sound: </div>
        <AdminCreateSoundInput />
      </div>
      <div className="admin__words-create-wrapper">
        <div className="admin__words-create-image-text">Image: </div>
        <AdminCreateImageInput />
      </div>
      <div className="admin__words-create-bot-wrapper">
        <div className="admin__words-create-cancel-btn" onClick={() => clickCancelCreateWord()}>
          Cancel
        </div>
        <div
          className="admin__words-create-create-btn"
          onClick={() => clickSubmitCreateWord(cards.length, updatingCategoryNumber, setRefreshing)}
        >
          Create
        </div>
      </div>
    </div>
  );
};
