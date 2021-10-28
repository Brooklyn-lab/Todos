import { useState } from "react";
import "./App.scss";
import { Route, Switch } from "react-router";
import { ROUTES } from "./infastructure/constants";
import HomePage from "./components/HomePage";
import TodoWrapper from "./components/TodoWrapper/TodoWrapper";
import Login from "./components/Login";
import Registration from "./components/Registration";

function App() {
  const [theme, setTheme] = useState(false);

  return (
    <div className={`App ${!theme ? "light" : "dark"}`}>
      <Switch>
        <Route path={ROUTES.home} exact>
          <HomePage />
        </Route>
        <Route path={ROUTES.todos}>
          <TodoWrapper theme={theme} setTheme={setTheme} />
        </Route>
        <Route path={ROUTES.login}>
          <Login />
        </Route>
        <Route path={ROUTES.registration}>
          <Registration />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
