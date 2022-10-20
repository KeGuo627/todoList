import "./styles/todoheader.css";

const Header = ({ title = "test" }) => {
  return (
    <h1 className="header" data-testid="todo-header-test-id">
      {title}
    </h1>
  );
};

export default Header;
