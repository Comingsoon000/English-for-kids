import React, { Dispatch } from "react";
import { useTypedSelector } from "../../hooks/useTypeSelector";
import { Categories } from "../../serverRequests/get";
import { createNewCategory } from "../../serverRequests/post";
import { store } from "../../store/store";

interface IAdminCreateCategoryProps {
  categories: Categories;
  setRefreshing: React.Dispatch<React.SetStateAction<boolean>>;
}

const clickNewCategoryCancel = () => {
  store.dispatch({ type: "cancelCreateCategory" });
};

const clicNewCategoryCreate = async (
  categoryNumber: number,
  categoryName: string,
  setRefreshing: Dispatch<boolean>
) => {
  store.dispatch({ type: "cancelCreateCategory" });
  await createNewCategory(categoryNumber, categoryName);
  setRefreshing(true);
};

export const AdminCategoriesCreateCategory: React.FC<IAdminCreateCategoryProps> = ({ categories, setRefreshing }) => {
  const { createCategory } = useTypedSelector((state) => state.createCategory);
  const newCategoryCreateClass = createCategory ? "admin__new-category-create" : "admin__new-category-create_hidden";
  let newCategoryName: HTMLInputElement;

  return (
    <div className={newCategoryCreateClass}>
      <label className="admin__new-category-create-label">Category name</label>
      <input
        className="admin__new-category-create-input"
        type="text"
        defaultValue="New Category"
        ref={(input) => {
          newCategoryName = input;
        }}
      />
      <div className="admin__new-category-create-wrapper">
        <div className="admin__new-category-create-cancel-btn" onClick={() => clickNewCategoryCancel()}>
          Cancel
        </div>
        <div
          className="admin__new-category-create-create-btn"
          onClick={() => clicNewCategoryCreate(categories.length, newCategoryName.value, setRefreshing)}
        >
          Create
        </div>
      </div>
    </div>
  );
};
