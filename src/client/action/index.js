//import { todoApi } from "../api/index";
import { ajaxConfigHelper } from "../fetchApi";

export const ADD_TODO = "ADD";
export const MOD_TODO = "MOD";
export const DEL_TODO = "DEL";
export const INIT_TODOS = "INIT";

//FE: 3002
//BE: 3003
//CORS => adding proxy => 3002 -> 3003
export const initTodos = (dispatch) => async () => {
  try {
    const response = await fetch("/allTodos");
    const result = await response.json();
    console.log(result);
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
    const response = await fetch(
      "/addTodo",
      ajaxConfigHelper({
        content,
        isCompleted: false,
      })
    );
    const result = await response.json();
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
    const response = await fetch(
      "/modTodo",
      ajaxConfigHelper(
        {
          index,
        },
        "PUT"
      )
    );
    const result = await response.json();
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
    const response = await fetch(
      "/delTodo",
      ajaxConfigHelper(
        {
          index,
        },
        "DELETE"
      )
    );
    const result = await response.json();
    console.log(result);
    dispatch({
      type: DEL_TODO,
      payload: index,
    });
  } catch (error) {
    console.log(error);
  }
};
