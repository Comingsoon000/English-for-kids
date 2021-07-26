import React from "react";
import { Categories } from "../../serverRequests/get";
import { AdminCategoriesCategory } from "./adminCategoriesCategory.tsx";
import { AdminCategoriesCreateCategory } from "./adminCategoriesCreateCategory.tsx";
import { AdminCategoriesHeader } from "./adminCategoriesHeader.tsx";
import { AdminCategoriesNewCategory } from "./adminCategoriesNewCategory.tsx";
import { AdminCategoriesUpdateCategory } from "./adminCategoriesUpdateCategory.tsx";

export interface IAdminCategoriesRenderElementProps {
  categories: Categories;
  setRefreshing: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AdminCategoriesRenderElement: React.FC<IAdminCategoriesRenderElementProps> = ({
  categories,
  setRefreshing,
}) => {
  return (
    <div className="admin">
      <AdminCategoriesHeader />
      <div className="admin__wrapper">
        {categories.map((item, index) => {
          return (
            <div key={index}>
              <AdminCategoriesCategory
                categories={categories}
                item={item}
                index={index}
                setRefreshing={setRefreshing}
              />
              <AdminCategoriesUpdateCategory
                categories={categories}
                item={item}
                index={index}
                setRefreshing={setRefreshing}
              />
            </div>
          );
        })}
        <AdminCategoriesNewCategory />
        <AdminCategoriesCreateCategory categories={categories} setRefreshing={setRefreshing} />
      </div>
    </div>
  );
};
