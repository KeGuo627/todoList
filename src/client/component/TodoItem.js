import { useDispatch } from "react-redux";
import { modTodo, delTodo } from "../action/index";
import "./styles/todoitem.css";

const TodoItem = ({ content, isCompleted, id }) => {
  const dispatch = useDispatch();

  return (
    <li className="todo-item" data-testid={id}>
      <span
        onDoubleClick={() => modTodo(dispatch)(id)}
        className={isCompleted ? "task-done" : "task-incompleted"}
      >
        {content}
      </span>
      <span>
        <button className="btn" onClick={() => delTodo(dispatch)(id)}>
          delete
        </button>
      </span>
    </li>
  );
};
export default TodoItem;
