import "./TodoItem.scss";
import { API } from "../../utils/api";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";

const TodoItem = ({ todo, setTodos }) => {
  const [isEdit, setEdit] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [checked, setChecked] = useState(todo.checked);
  const [disabled, setDisabled] = useState(false);

  async function editHelper(id, keyToChange, value) {
    try {
      const response = await API.patch(`/posts/${id}`, { [keyToChange]: value });
      setTodos((prev) => prev.map((todo) => (todo.id === id ? response.data : todo)));
    } catch (e) {
      console.error(e);
    }
  }

  async function editChecked(id) {
    setChecked(!checked);
    editHelper(id, "checked", checked);
  }

  async function editTodo(id) {
    setEdit(!isEdit);
    setDisabled(!disabled);
    isEdit && editHelper(id, "title", title);
  }

  function editTitle(e) {
    setTitle(e.target.value);
  }

  async function deleteTodo(id) {
    try {
      await API.delete(`/posts/${id}`);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="todo">
      <label className="todo__body">
        <span className="todo__id">{todo.id}.</span>
        <input
          className="todo__checkbox"
          id={todo.id}
          type="checkbox"
          defaultChecked={!checked}
          value={checked}
          onChange={() => editChecked(todo.id)}
          disabled={disabled}
        />
        <label htmlFor={todo.id} className="todo__label-checkbox" />
        {isEdit ? (
          <input className="todo__input" type="text" value={title} onChange={editTitle} />
        ) : (
          <span className={checked ? "todo__title" : "todo__title-done"}>{title}</span>
        )}
      </label>
      <div className="todo__buttons">
        {isEdit ? (
          <Button color="inherit" variant="text" onClick={() => editTodo(todo.id)}>
            Save
          </Button>
        ) : (
          <EditIcon className="todo__button" onClick={() => editTodo(todo.id)}></EditIcon>
        )}
        <IconButton
          color="inherit"
          aria-label="delete"
          size="large"
          onClick={() => deleteTodo(todo.id)}
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </div>
    </div>
  );
};

export default TodoItem;
