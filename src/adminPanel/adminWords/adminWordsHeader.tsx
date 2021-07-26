import React from "react";
import { Link } from "react-router-dom";
import { clickLogout } from "../adminCategories/adminCategoriesHeader.tsx";

export const AdminWordsHeader: React.FC = () => {
  return (
    <div className="admin__header">
      <Link to="/admin/categories" className="admin__header-categories">
        Categories
      </Link>
      <div className="admin__header-words">Words</div>
      <Link to="/" className="admin__header-logout" onClick={() => clickLogout()}>
        Log out
      </Link>
    </div>
  );
};
