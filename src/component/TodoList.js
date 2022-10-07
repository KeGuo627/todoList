import TodoItem from "./TodoItem";

const TodoList = ({ todos, onMod, onDelete }) => {
  //index for delete. if there will be multiply map function, index will not unique, but not it is unique
  const todoList = todos.map((todo) => {
    return (
      <TodoItem key={todo.id} todo={todo} onMod={onMod} onDelete={onDelete} />
    );
  });
  return <ul>{todoList}</ul>;
};

export default TodoList;
