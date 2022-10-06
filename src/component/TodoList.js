import TodoItem from "./TodoItem";

const TodoList = ({ todos, setTodos }) => {
  //index for delete. if there will be multiply map function, index will not unique, but not it is unique
  const todoList = todos.map(({ content, isCompleted }, index) => {
    return (
      <TodoItem
        key={`${content} - ${index}`}
        content={content}
        isCompleted={isCompleted}
        index={index}
        setTodos={setTodos}
      />
    );
  });
  return <ul>{todoList}</ul>;
};

export default TodoList;
