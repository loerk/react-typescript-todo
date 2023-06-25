import { Todo } from '../models/TodoModel';

export type Actions =
  | { type: 'add'; payload: string }
  | { type: 'delete'; payload: number }
  | { type: 'done'; payload: { id: number } }
  | { type: 'edit'; payload: { id: number; updatedTitle: string } }
  | { type: 'update'; payload: Todo[] };

export const TodoReducer = (state: Todo[], action: Actions) => {
  switch (action.type) {
    case 'add':
      return [
        ...state,
        {
          id: Date.now(),
          title: action.payload,
          isDone: false,
          position: state.length,
        },
      ];
    case 'delete':
      return state.filter((todo) => todo.id !== action.payload);
    case 'done':
      return state.map((todo) =>
        todo.id === action.payload.id
          ? {
              ...todo,
              isDone: !todo.isDone,
            }
          : todo
      );
    case 'edit':
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, title: action.payload.updatedTitle }
          : todo
      );
    case 'update':
      return action.payload;

    default:
      return state;
  }
};
