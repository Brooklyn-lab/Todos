import { Button } from "@mui/material";
import { ROUTES } from "../../infastructure/constants";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Theme from "../../components/Theme/Theme";
import TodoCreate from "../../components/TodoCreate/TodoCreate";
import TodosList from "../../components/TodosList/TodosList";
import { API } from "../../utils/api";

const TodoWrapper = ({ theme, setTheme }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    API.get("/posts")
      .then(({ data }) => setTodos(data))
      .catch((e) => {
        console.error(e);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container">
      <div className="App__wrapper">
        <h1 className={!theme ? "light" : "dark"}>TODO LIST</h1>
        <div className="App__buttons">
          <Button variant="contained" component={Link} to={ROUTES.home}>
            Home
          </Button>
          <Theme theme={theme} setTheme={setTheme} />
        </div>
      </div>
      <TodoCreate setTodos={setTodos} />
      {loading ? (
        <div style={{ color: "#000" }}>Loading...</div>
      ) : (
        <TodosList todos={todos} setTodos={setTodos} />
      )}
    </div>
  );
};

export default TodoWrapper;
