import { todoApi } from "../api/index";

export const ADD_TODO = "ADD";
export const MOD_TODO = "MOD";
export const DEL_TODO = "DEL";
export const INIT_TODOS = "INIT";

export const initTodos = (dispatch) => async () => {
  try {
    const result = await todoApi.getAllTodos();
    dispatch({
      type: INIT_TODOS,
      payload: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addTodo = (dispatch) => async (content) => {
  try {
    const result = await todoApi.addTodo({
      content,
      isCompleted: false,
    });
    console.log(result);
    dispatch({
      type: ADD_TODO,
      payload: {
        content,
        isCompleted: false,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
export const modTodo = (dispatch) => async (index) => {
  try {
    const result = await todoApi.modTodo(index);
    console.log(result);
    dispatch({
      type: MOD_TODO,
      payload: index,
    });
  } catch (error) {
    console.log(error);
  }
};
export const delTodo = (dispatch) => async (index) => {
  try {
    const result = await todoApi.delTodo(index);
    console.log(result);
    dispatch({
      type: DEL_TODO,
      payload: index,
    });
  } catch (error) {
    console.log(error);
  }
};
