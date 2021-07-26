import React from "react";
import { Link } from "react-router-dom";
import { deleteToken } from "../../serverRequests/delete";
import { comparisonsCounter } from "../../statistics/initialStatistics";
import { store } from "../../store/store";

export const clickLogout = async (): Promise<void> => {
  store.dispatch({ type: "showStatistics", showStatistics: false });
  store.dispatch({ type: "categories" });
  await deleteToken();
  comparisonsCounter.isCompareNeed = true;
  localStorage.setItem("token", JSON.stringify({ token: "0" }));
};

export const AdminCategoriesHeader: React.FC = () => {
  return (
    <div className="admin__header">
      <div className="admin__header-categories">Categories</div>
      <Link to="/admin/categories/words" className="admin__header-words">
        Words
      </Link>
      <Link to="/" className="admin__header-logout" onClick={() => clickLogout()}>
        Log out
      </Link>
    </div>
  );
};
