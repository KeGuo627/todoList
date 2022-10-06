import "./styles/todoitem.css";

const todoItem = ({ content, isCompleted, index, setTodos }) => {
  const modTodo = (index) => {
    setTodos((prev) => {
      //prev state can't modify, so we use map to return new state
      return prev.map((todo, i) => {
        if (i !== index) {
          return todo;
        } else {
          return {
            ...todo,
            isCompleted: !todo.isCompleted,
          };
        }
      });
    });
  };

  const delTodo = (index) => {
    setTodos((prev) => {
      return [...prev.slice(0, index), ...prev.slice(index + 1)];
    });
  };

  return (
    <li className="todo-item">
      <span
        onDoubleClick={() => {
          modTodo(index);
        }}
        className={isCompleted ? "task-done" : "task-incompleted"}
      >
        {content}
      </span>
      <span>
        <button
          className="btn"
          onClick={() => {
            delTodo(index);
          }}
        >
          delete
        </button>
      </span>
    </li>
  );
};
export default todoItem;
