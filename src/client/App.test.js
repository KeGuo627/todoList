import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import App from "./App";
import Header from "./component/Header";

describe("TodoHeader is rendered correctly", () => {
  it("header is in the document", () => {
    const todoheader = "This is a test";
    const todoheaderTestId = "todo-header-test-id";
    const { getByText, getByTestId } = render(<Header title={todoheader} />);
    expect(getByText(todoheader)).toBeInTheDocument();
    expect(getByTestId(todoheaderTestId)).toBeInTheDocument();
  });

  it("header is empty", () => {
    const todoheaderTestId = "todo-header-test-id";
    const { getByText, getByTestId } = render(<Header />);
    expect(getByText("test")).toBeInTheDocument();
    expect(getByTestId(todoheaderTestId)).toBeInTheDocument();
  });
});

//provide a mock up provider to wrap up
//use redux-mock-store when test(wrap up the App.js)
describe("Testing Todo App", () => {
  const initState = [];
  const oneTodoInTheStore = [{ content: "1223", isCompleted: false }];
  const threeTodoInTheStore = [
    { content: "1223", isCompleted: false },
    { content: "123", isCompleted: true },
    { content: "12423", isCompleted: false },
  ];
  const mockStore = configureStore();
  let store;
  it("App is rendered correctly with no todo list", () => {
    store = mockStore(initState);
    const { getByText, getByTestId, getByPlaceholderText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(getByText("Todo List")).toBeInTheDocument();
    expect(getByTestId("add-button")).toBeInTheDocument();
    expect(getByPlaceholderText("todo")).not.toBeNull();
  });
  it("App is rendered correctly with one todo", () => {
    store = mockStore(oneTodoInTheStore);
    const { getByTestId, container } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(getByTestId("1223-0")).not.toBeNull();
    expect(container.querySelectorAll("li").length).toBe(1);
  });

  it("App is rendered correctly with three todo", () => {
    store = mockStore(threeTodoInTheStore);
    const { getByTestId, container } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    threeTodoInTheStore.map(({ content }, index) => {
      expect(getByTestId(`${content}-${index}`)).not.toBeNull();
    });
    expect(container.querySelectorAll("li").length).not.toBe(0);
    expect(container.querySelectorAll("li").length).toBe(3);
  });
});
