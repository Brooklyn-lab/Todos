import { useEffect, useState } from "react";
import { API } from "../../utils/api";
import "./TodoCreate.scss";
import TextField from "@mui/material/TextField";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const TodoCreate = ({ setTodos }) => {
  const [title, setTitle] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [showError, setShowError] = useState(false);

  function createTitle(e) {
    setTitle(e.target.value);
  }

  useEffect(() => {
    if (title >= 0) setShowError(false);
  }, [title]);

  async function createTodo(e) {
    if (e.key === "Enter" || e.type === "click") {
      if (title) {
        try {
          setDisabled(!disabled);
          const response = await API.post("/posts", { title, checked: true });
          setTodos((prev) => [...prev, response.data]);
          setTitle("");
          setDisabled(disabled);
        } catch (e) {
          console.error(e);
        }
      } else {
        setShowError(!showError);
      }
    }
  }

  return (
    <div className="todo-create">
      <TextField
        id="outlined-basic"
        label="Todo text..."
        variant="outlined"
        size="small"
        value={title}
        type="text"
        onChange={createTitle}
        onKeyPress={createTodo}
        disabled={disabled}
      />
      <span className={`todo-create__error ${showError ? "show" : ""}`}>
        Please enter at least one character
      </span>
      <AddCircleIcon
        color="inherit"
        fontSize="large"
        onClick={createTodo}
        disabled={disabled}
        className="todo-create__button"
      >
        Add
      </AddCircleIcon>
    </div>
  );
};

export default TodoCreate;
