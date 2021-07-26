import React from "react";
import { useTypedSelector } from "../../hooks/useTypeSelector";
import { store } from "../../store/store";

const clicCreateWord = () => {
  store.dispatch({ type: "createWord" });
};

export const AdminWordsNewWord: React.FC = () => {
  const addBtnImgURL = "https://res.cloudinary.com/comingsoon/image/upload/v1626608471/zszuywdq17tmti2fd2at.png";
  const { createWord } = useTypedSelector((state) => state.createWord);
  const newWordClass = createWord ? "admin__new-word_hidden" : "admin__new-word";

  return (
    <div className={newWordClass}>
      <div className="admin__new-word-text">Add new Word</div>
      <div
        className="admin__new-word-add-btn"
        onClick={() => clicCreateWord()}
        style={{ backgroundImage: `url(${addBtnImgURL})` }}
      ></div>
    </div>
  );
};
