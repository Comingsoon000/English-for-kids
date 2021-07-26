import React, { Dispatch } from "react";
import { useTypedSelector } from "../../hooks/useTypeSelector";
import { Card } from "../../serverRequests/get";
import { updateCardFromServer } from "../../serverRequests/put";
import { store } from "../../store/store";
import { AdminUpdateImageInput } from "./adminUpdateImageInput.tsx";
import { AdminUpdateSoundInput } from "./adminUpdateSoundInput.tsx";
import { AdminUpdateTranslationInput } from "./adminUpdateTranslationInput.tsx";
import { AdminUpdateWordInput } from "./adminUpdateWordInput.tsx";

interface IAdminWordsUpdateWord {
  item: Card;
  index: number;
  setRefreshing: React.Dispatch<React.SetStateAction<boolean>>;
}

const clickCancelUpdate = (wordNumber: number) => {
  store.dispatch({ type: "cancelupdateWord", wordNumber });
};

const clickSubmitUpdate = async (categoryId: number, wordNumber: number, setRefreshing: Dispatch<boolean>) => {
  await updateCardFromServer(categoryId, wordNumber);
  store.dispatch({ type: "cancelupdateWord", wordNumber });
  setRefreshing(true);
};

export const AdminWordsUpdateWord: React.FC<IAdminWordsUpdateWord> = ({ item, index, setRefreshing }) => {
  const { categoryId } = useTypedSelector((state) => state.updatingCategoryNumber);
  const { updateWord, wordNumber } = useTypedSelector((state) => state.updateWord);
  const adminWordsUpdateClass =
    updateWord && wordNumber === index ? "admin__words-update" : "admin__words-update_hidden";
  return (
    <div className={adminWordsUpdateClass}>
      <label className="admin__words-update-word-label">Word</label>
      <AdminUpdateWordInput item={item} />
      <label className="admin__words-update-word-label">Translation</label>
      <AdminUpdateTranslationInput item={item} />
      <div className="admin__words-update-wrapper">
        <div className="admin__words-update-sound-text">Sound: </div>
        <AdminUpdateSoundInput />
      </div>
      <div className="admin__words-update-wrapper">
        <div className="admin__words-update-image-text">Image: </div>
        <AdminUpdateImageInput />
      </div>
      <div className="admin__words-update-bot-wrapper">
        <div className="admin__words-update-cancel-btn" onClick={() => clickCancelUpdate(index)}>
          Cancel
        </div>
        <div
          className="admin__words-update-update-btn"
          onClick={() => clickSubmitUpdate(categoryId, index, setRefreshing)}
        >
          Update
        </div>
      </div>
    </div>
  );
};
