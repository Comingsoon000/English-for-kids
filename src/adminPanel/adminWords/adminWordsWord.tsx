import React, { Dispatch } from "react";
import { useTypedSelector } from "../../hooks/useTypeSelector";
import { playAudio } from "../../main/game";
import { deleteCardFromServer } from "../../serverRequests/delete";
import { Card } from "../../serverRequests/get";
import { store } from "../../store/store";

interface IAdminWordsWordProps {
  item: Card;
  index: number;
  setRefreshing: React.Dispatch<React.SetStateAction<boolean>>;
}

const clickDeleteCard = async (categoryId: number, wordNumber: number, setRefreshing: Dispatch<boolean>) => {
  await deleteCardFromServer(categoryId, wordNumber);
  setRefreshing(true);
};

const clickUpdate = (wordNumber: number) => {
  store.dispatch({ type: "updateWord", wordNumber });
};

export const AdminWordsWord: React.FC<IAdminWordsWordProps> = ({ item, index, setRefreshing }) => {
  const deleteBtnImgURL = "https://res.cloudinary.com/comingsoon/image/upload/v1626608415/ozsmcwp0qgignsdjtodl.png";
  const { updateWord, wordNumber } = useTypedSelector((state) => state.updateWord);
  const { categoryId } = useTypedSelector((state) => state.updatingCategoryNumber);
  const adminWordsClass = updateWord && wordNumber === index ? "admin__words_hidden" : "admin__words";

  return (
    <div className={adminWordsClass}>
      <div
        className="admin__words-del-btn"
        style={{ backgroundImage: `url(${deleteBtnImgURL})` }}
        onClick={() => clickDeleteCard(categoryId, index, setRefreshing)}
      ></div>
      <div className="admin__words-word">Word: {item.word}</div>
      <div className="admin__words-translation">Translation: {item.translation}</div>
      <div className="admin__words-sound">
        <div>Sound</div>
        <div className="admin__words-sound-play-btn" onClick={() => playAudio(item.audioSrc)}>
          Play audio
        </div>
      </div>
      <div className="admin__words-image-text">Image: </div>
      <div className="admin__words-image" style={{ backgroundImage: `url(${item.image})` }}></div>
      <div className="admin__words-change-brn" onClick={() => clickUpdate(index)}>
        Change
      </div>
    </div>
  );
};
