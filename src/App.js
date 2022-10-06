import { useState } from "react";

import Header from "./component/Header";
import TodoInput from "./component/TodoInput";
import TodoList from "./component/TodoList";

import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  console.log(todos);

  return (
    <div className="App">
      <Header title="Todo List" />
      <TodoInput setTodos={setTodos} todos={todos} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
