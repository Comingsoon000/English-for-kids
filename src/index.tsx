import "./styles.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Switch, HashRouter, Route, Redirect } from "react-router-dom";
import { App } from "./app.tsx";
import { AdminCategories } from "./adminPanel/adminCategories/adminCategories.tsx";
import { store } from "./store/store";
import { AdminWords } from "./adminPanel/adminWords/adminWords.tsx";

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/admin/categories" component={AdminCategories} />
        <Route exact path="/admin/categories/words" component={AdminWords} />
        <Redirect to="/admin/categories" />
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
