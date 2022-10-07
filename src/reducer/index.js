import { ADD_TODO, MOD_TODO, DEL_TODO, INIT_TODOS } from "../action/index";

export const reducer = (state = [], { type, payload }) => {
  switch (type) {
    case INIT_TODOS:
      return [...payload];
    case ADD_TODO:
      //return [...state, payload];
      return [...state, { ...payload }];

    case MOD_TODO:
      return state.map(({ content, isCompleted }, index) => {
        if (payload !== index) {
          return {
            content,
            isCompleted,
          };
        }
        return {
          content,
          isCompleted: !isCompleted,
        };
      });

    case DEL_TODO:
      return [...state.slice(0, payload), ...state.slice(payload + 1)];

    default:
      return state;
  }
};
