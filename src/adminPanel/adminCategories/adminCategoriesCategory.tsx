import React, { Dispatch } from "react";
import { Link } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypeSelector";
import { deleteCategoryFromServer } from "../../serverRequests/delete";
import { Categories, Category } from "../../serverRequests/get";
import { store } from "../../store/store";

interface IAdminCategoryProps {
  categories: Categories;
  item: Category;
  index: number;
  setRefreshing: React.Dispatch<React.SetStateAction<boolean>>;
}

const clickUpdate = (categoryNumber: number) => {
  store.dispatch({ type: "updateCategory", categoryNumber });
};

const clickAddWord = (categoryNumber: number, categoryId: number, categoryName: string) => {
  store.dispatch({
    type: "updatingCategoryNumber",
    updatingCategoryNumber: categoryNumber,
    categoryId,
    categoryName,
  });
};

const deleteCategory = async (categories: Categories, categoryNumber: number, setRefreshing: Dispatch<boolean>) => {
  await deleteCategoryFromServer(categories, categoryNumber);
  setRefreshing(true);
};

export const AdminCategoriesCategory: React.FC<IAdminCategoryProps> = ({ categories, item, index, setRefreshing }) => {
  const deleteBtnImgURL = "https://res.cloudinary.com/comingsoon/image/upload/v1626608415/ozsmcwp0qgignsdjtodl.png";
  const words = item.cards ? `WORDS: ${item.cards.length}` : "0";
  const { updateCategory, categoryNumber } = useTypedSelector((state) => state.updateCategory);
  const adminCategoryClass = updateCategory && categoryNumber === index ? "admin__category_hidden" : "admin__category";

  return (
    <div className={adminCategoryClass}>
      <div
        className="admin__category-del-btn"
        style={{ backgroundImage: `url(${deleteBtnImgURL})` }}
        onClick={() => deleteCategory(categories, index, setRefreshing)}
      ></div>
      <div className="admin__category-name">{item.category}</div>
      <div className="admin__category-words">{words}</div>
      <div className="admin__category-bot-wrapper">
        <div className="admin__category-update-btn" onClick={() => clickUpdate(index)}>
          Update
        </div>
        <Link
          to="/admin/categories/words"
          className="admin__category-add-word-btn"
          onClick={() => clickAddWord(index, item.id, item.category)}
        >
          Add word
        </Link>
      </div>
    </div>
  );
};
