import { useState } from "react";

const TodoInput = ({ setTodos, todos }) => {
  const [text, setText] = useState("");

  const addTodo = () => {
    //edge case
    if (!text.trim()) {
      setText("");
      return;
    }

    const newTodo = {
      content: text,
      isCompleted: false,
    };
    setTodos([...todos, newTodo]);
    /*setTodos((prev) => {
        return [...prev, newTodo];
    })*/
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
      <button className="btn" onClick={addTodo}>
        Add
      </button>
    </div>
  );
};

export default TodoInput;
