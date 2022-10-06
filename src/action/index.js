export const ADD_TODO = "ADD";
export const MOD_TODO = "MOD";
export const DEL_TODO = "DEL";

export const addTodo = (dispatch) => (content) => {
  dispatch({
    type: ADD_TODO,
    payload: {
      content,
      isCompleted: false,
    },
  });
};
export const modTodo = (dispatch) => (index) => {
  dispatch({
    type: MOD_TODO,
    payload: index,
  });
};
export const delTodo = (dispatch) => (index) => {
  dispatch({
    type: DEL_TODO,
    payload: index,
  });
};
