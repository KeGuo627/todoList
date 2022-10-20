import { useDispatch } from "react-redux";
import { modTodo, delTodo } from "../action/index";
import "./styles/todoitem.css";

const TodoItem = ({ content, isCompleted, index }) => {
  const dispatch = useDispatch();

  return (
    <li className="todo-item" data-testid={`${content}-${index}`}>
      <span
        onDoubleClick={() => modTodo(dispatch)(index)}
        å
        className={isCompleted ? "task-done" : "task-incompleted"}
      >
        {content}
      </span>
      <span>
        <button className="btn" onClick={() => delTodo(dispatch)(index)}>
          delete
        </button>
      </span>
    </li>
  );
};
export default TodoItem;
