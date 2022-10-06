import Header from "./component/Header";
import TodoInput from "./component/TodoInput";
import TodoList from "./component/TodoList";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Header title="Todo List" />
      <TodoInput />
      <TodoList />
    </div>
  );
}

export default App;
