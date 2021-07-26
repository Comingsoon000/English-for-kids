import "./styles.css";
import React from "react";
import { Provider } from "react-redux";
import { AppHeader } from "./header/header.tsx";
import { AppMain } from "./main/main.tsx";
import { store } from "./store/store";
import { Statistics } from "./statistics/statistics.tsx";
import { LoginModal } from "./adminPanel/loginModal.tsx";

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppHeader />
      <AppMain />
      <Statistics />
      <LoginModal />
    </Provider>
  );
};
