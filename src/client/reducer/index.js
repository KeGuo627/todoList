import { ADD_TODO, MOD_TODO, DEL_TODO, INIT_TODOS } from "../action/index";

export const reducer = (state = [], { type, payload }) => {
  switch (type) {
    case INIT_TODOS:
      return [...payload];
    case ADD_TODO:
      //return [...state, payload];
      return [...state, { ...payload }];

    case MOD_TODO:
      return state.map((todo) => {
        if (payload === todo.id) {
          return {
            ...todo,
            isCompleted: !todo.isCompleted,
          };
        }
        return todo;
      });

    case DEL_TODO:
      return state.filter(({ id }) => {
        return id !== payload;
      });

    default:
      return state;
  }
};
