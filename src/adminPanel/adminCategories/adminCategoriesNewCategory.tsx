import React from "react";
import { useTypedSelector } from "../../hooks/useTypeSelector";
import { store } from "../../store/store";

const clickAddNewCategory = () => {
  store.dispatch({ type: "createCategory" });
};

export const AdminCategoriesNewCategory: React.FC = () => {
  const addBtnImgURL = "https://res.cloudinary.com/comingsoon/image/upload/v1626608471/zszuywdq17tmti2fd2at.png";
  const { createCategory } = useTypedSelector((state) => state.createCategory);
  const newCategoryClass = createCategory ? "admin__new-category_hidden" : "admin__new-category";

  return (
    <div className={newCategoryClass}>
      <div className="admin__new-category-name">Create new Category</div>
      <div
        className="admin__new-category-add-btn"
        onClick={() => clickAddNewCategory()}
        style={{ backgroundImage: `url(${addBtnImgURL})` }}
      ></div>
    </div>
  );
};
