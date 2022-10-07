import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Header from "./component/Header";
import TodoInput from "./component/TodoInput";
import TodoList from "./component/TodoList";
import { initTodos } from "./action/index";

import "./App.css";

//1. dispatch an action
//2. thunk intercept the action and executed async operation. It will send action to reducer when the async task is completed
//3. render will update the state by type and payload
function App() {
  const dispatch = useDispatch();
  //page loading
  useEffect(() => {
    initTodos(dispatch);
  }, [dispatch]);

  return (
    <div className="App">
      <Header title="Todo List" />
      <TodoInput />
      <TodoList />
    </div>
  );
}

export default App;
