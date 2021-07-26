import "./adminPanel.css";
import React from "react";
import { store } from "../store/store";
import { useTypedSelector } from "../hooks/useTypeSelector";
import { authorisation } from "../serverRequests/post";

const clickCancel = () => {
  store.dispatch({ type: "openedModal" });
};

const clickLogin = async (login: HTMLInputElement, pass: HTMLInputElement) => {
  if (login.value === "admin" && pass.value === "admin") {
    const currentToken = JSON.parse(localStorage.getItem("token"))
      ? JSON.parse(localStorage.getItem("token"))
      : { token: "0" };
    const authorisationResult = await authorisation(login.value, pass.value, currentToken.token);
    if ((authorisationResult as { _id: string; token: string }).token) {
      localStorage.setItem("token", JSON.stringify(authorisationResult));
    }
    store.dispatch({ type: "openedModal" });
    window.location.assign("/#/admin/categories");
  } else {
    store.dispatch({ type: "openedModal" });
    store.dispatch({ type: "categories" });
    store.dispatch({ type: `matchedCards`, matchedCards: [] });
    store.dispatch({ type: "gameState", cardsOrder: [], gameStep: 0, attempts: 0, finish: "", chart: [] });
    store.dispatch({ type: "gameNotStarted" });
  }
};

let login: HTMLInputElement;
let pass: HTMLInputElement;

export const LoginModal: React.FC = () => {
  const { openedModal } = useTypedSelector((state) => state.openedModal);
  const modalCoverClass = openedModal ? "admin-modal__cover" : "admin-modal__cover_hidden";
  const modalClass = openedModal ? "admin-modal" : "admin-modal_hidden";
  return (
    <>
      <div className={modalCoverClass}></div>
      <div className={modalClass}>
        <div className="admin-modal__title">Login</div>
        <div className="admin-modal__inputs-wrapper">
          <label className="admin-modal__login-label">admin</label>
          <input
            className="admin-modal__login"
            type="text"
            placeholder="Login"
            ref={(input) => {
              login = input;
            }}
          />
          <label className="admin-modal__password-label">admin</label>
          <input
            className="admin-modal__password"
            type="text"
            placeholder="Password"
            ref={(input) => {
              pass = input;
            }}
          />
        </div>
        <div className="admin-modal__buttons-wrapper">
          <div className="admin-modal__cancel-btn" onClick={() => clickCancel()}>
            Cancel
          </div>
          <div className="admin-modal__login-btn" onClick={() => clickLogin(login, pass)}>
            Login
          </div>
        </div>
      </div>
    </>
  );
};
