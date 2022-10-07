import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";

const TodoList = () => {
  //select all from state
  const todos = useSelector((state) => state);
  //index for delete. if there will be multiply map function, index will not unique, but not it is unique
  const todoList = todos.map(({ content, isCompleted }, index) => {
    return (
      <TodoItem
        key={`${content} - ${index}`}
        content={content}
        isCompleted={isCompleted}
        index={index}
      />
    );
  });
  return <ul>{todoList}</ul>;
};

export default TodoList;
