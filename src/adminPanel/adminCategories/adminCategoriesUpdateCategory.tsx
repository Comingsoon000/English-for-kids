import React, { Dispatch } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypeSelector";
import { Categories, Category } from "../../serverRequests/get";
import { updateCategoryFromServer } from "../../serverRequests/put";
import { store } from "../../store/store";

interface IAdminUpdateCategoryProps {
  categories: Categories;
  item: Category;
  index: number;
  setRefreshing: React.Dispatch<React.SetStateAction<boolean>>;
}

const clickCancelUpdate = (categoryNumber: number) => {
  store.dispatch({ type: "cancelUpdateCategory", categoryNumber });
};

const clicAcceptUpdate = async (categories: Categories, categoryNumber: number, setRefreshing: Dispatch<boolean>) => {
  store.dispatch({ type: "cancelUpdateCategory", categoryNumber });
  await updateCategoryFromServer(categories, categoryNumber);
  setRefreshing(true);
};

export const AdminCategoriesUpdateCategory: React.FC<IAdminUpdateCategoryProps> = ({
  categories,
  item,
  index,
  setRefreshing,
}) => {
  const dispatch = useDispatch();
  const { updateCategory, categoryNumber } = useTypedSelector((state) => state.updateCategory);
  const adminCategoryUpdateClass =
    updateCategory && categoryNumber === index ? "admin__category-update" : "admin__category-update_hidden";
  return (
    <div className={adminCategoryUpdateClass}>
      <label className="admin__category-update-label">Category name</label>
      <input
        className="admin__category-update-input"
        type="text"
        defaultValue={item.category}
        onChange={(e) => dispatch({ type: "categoryNameInput", categoryName: e.target.value })}
      />
      <div className="admin__category-update-wrapper">
        <div
          className="admin__category-update-cancel-btn"
          onClick={() => {
            clickCancelUpdate(index);
          }}
        >
          Cancel
        </div>
        <div
          className="admin__category-update-create-btn"
          onClick={() => clicAcceptUpdate(categories, index, setRefreshing)}
        >
          Update
        </div>
      </div>
    </div>
  );
};
