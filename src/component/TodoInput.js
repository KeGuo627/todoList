import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../action/index";

const TodoInput = ({ setTodos, todos }) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    //edge case
    if (!text.trim()) {
      setText("");
      return;
    }
    addTodo(dispatch)(text);
    setText("");
  };
  return (
    <div>
      <input
        type="text"
        placeholder="todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="btn" onClick={handleAddTodo}>
        Add
      </button>
    </div>
  );
};

export default TodoInput;
