import { useState, useEffect } from "react";

import Header from "./component/Header";
import TodoInput from "./component/TodoInput";
import TodoList from "./component/TodoList";

import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  //page loading
  useEffect(() => {
    const getTodos = async () => {
      const TodosFromServer = await fetchTodos();
      setTodos(TodosFromServer);
    };
    getTodos();
  }, []);

  //Fetch todos
  const fetchTodos = async () => {
    const response = await fetch("http://localhost:8000/todos");
    const data = await response.json();
    return data;
  };

  //Fetch todo
  const fetchTodo = async (id) => {
    const response = await fetch(`http://localhost:8000/todos/${id}`);
    const data = await response.json();
    return data;
  };

  //addTodo
  const addTodo = async (todo) => {
    const response = await fetch("http://localhost:8000/todos", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(todo),
    });
    const data = await response.json();
    setTodos([...todos, data]);
  };

  //delTodo
  const deleteTodo = async (id) => {
    await fetch(`http://localhost:8000/todos/${id}`, { method: "DELETE" });
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  //modTodo
  const modTodo = async (id) => {
    const todoMod = await fetchTodo(id);
    const updatedTodo = { ...todoMod, isCompleted: !todoMod.isCompleted };

    const res = await fetch(`http://localhost:8000/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    });
    //data: updated task
    const data = await res.json();

    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: data.isCompleted } : todo
      )
    );
  };

  return (
    <div className="App">
      <Header title="Todo List" />
      <TodoInput addTodo={addTodo} />
      <TodoList todos={todos} onMod={modTodo} onDelete={deleteTodo} />
    </div>
  );
}

export default App;
