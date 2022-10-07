import { useState } from "react";

const TodoInput = ({ addTodo }) => {
  const [text, setText] = useState("");

  const onSumbit = (e) => {
    e.preventDefault();
    //edge case
    if (!text.trim()) {
      setText("");
      return;
    }
    const newTodo = { content: text, isCompleted: false };

    addTodo(newTodo);
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
      <button className="btn" onClick={onSumbit}>
        Add
      </button>
    </div>
  );
};

export default TodoInput;
