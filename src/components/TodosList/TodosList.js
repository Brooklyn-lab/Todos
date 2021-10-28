import TodoItem from "../TodoItem/TodoItem";

const TodosList = ({ todos, setTodos }) => {
  return (
    <>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} setTodos={setTodos} />
      ))}
    </>
  );
};

export default TodosList;
