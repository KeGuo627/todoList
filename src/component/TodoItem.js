import "./styles/todoitem.css";

const todoItem = ({ todo, onMod, onDelete }) => {
  return (
    <li className="todo-item">
      <span
        onDoubleClick={() => {
          onMod(todo.id);
        }}
        className={todo.isCompleted ? "task-done" : "task-incompleted"}
      >
        {todo.content}
      </span>
      <span>
        <button
          className="btn"
          onClick={() => {
            onDelete(todo.id);
          }}
        >
          delete
        </button>
      </span>
    </li>
  );
};
export default todoItem;
