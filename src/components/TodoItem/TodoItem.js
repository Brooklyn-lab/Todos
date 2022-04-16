import React, { useReducer } from "react";
import "./TodoItem.scss";
import { API } from "../../utils/api";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";

function init(state) {
  return { ...state };
}

function reducer(state, action) {
  switch (action.type) {
    case "isEdit":
      return {
        ...state,
        isEdit: !state.isEdit,
      };
    case "title":
      return {
        ...state,
        title: action.payload,
      };
    case "checked":
      return {
        ...state,
        checked: !state.checked,
      };
    case "disabled":
      return {
        ...state,
        disabled: !state.disabled,
      };
    default:
      return state;
  }
}

const TodoItem = ({ todo, setTodos }) => {
  const [data, dispatch] = useReducer(
    reducer,
    {
      isEdit: false,
      title: todo.title,
      checked: todo.checked,
      disabled: false,
    },
    init
  );

  async function editHelper(id, keyToChange, value) {
    try {
      const response = await API.patch(`/posts/${id}`, { [keyToChange]: value });
      setTodos((prev) => prev.map((todo) => (todo.id === id ? response.data : todo)));
    } catch (e) {
      console.error(e);
    }
  }

  async function editChecked(id) {
    dispatch({ type: "checked" });
    editHelper(id, "checked", data.checked);
  }

  async function editTodo(id) {
    dispatch({ type: "isEdit" });
    dispatch({ type: "disabled" });
    data.isEdit && editHelper(id, "title", data.title);
  }

  function editTitle(e) {
    dispatch({ type: "title", payload: e.target.value });
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
          defaultChecked={!data.checked}
          value={data.checked}
          onChange={() => editChecked(todo.id)}
          disabled={data.disabled}
        />
        <label htmlFor={todo.id} className="todo__label-checkbox" />
        {data.isEdit ? (
          <input className="todo__input" type="text" value={data.title} onChange={editTitle} />
        ) : (
          <span className={data.checked ? "todo__title" : "todo__title-done"}>{data.title}</span>
        )}
      </label>
      <div className="todo__buttons">
        {data.isEdit ? (
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

export default React.memo(TodoItem);
