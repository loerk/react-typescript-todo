import {
  Dispatch,
  FormEvent,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useReducer,
  useState,
} from 'react';

import { Actions, TodoReducer } from '../reducer/TodoReducer';
import { Todo } from '../models/TodoModel';

interface TodoContextType {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  dispatch: Dispatch<Actions>;
  todos: Todo[];
  uncompletedTodos: Todo[];
  completedTodos: Todo[];
  handleAdd: (e: FormEvent) => void;
  handleDelete: (id: number) => void;
  handleDone: (id: number) => void;
  handleEdit: (id: number, updatedTitle: string) => void;
  handleUpdateTodos: (updatedTodos: Todo[]) => void;
}
const TodoContext = createContext<TodoContextType>({} as TodoContextType);

export const TodoContextProvider = ({ children }: PropsWithChildren) => {
  const [title, setTitle] = useState<string>('');
  const [todos, dispatch] = useReducer(TodoReducer, []);
  const completedTodos = todos.filter((todo) => todo.isDone);
  const uncompletedTodos = todos.filter((todo) => !todo.isDone);
  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    if (title) {
      dispatch({ type: 'add', payload: title });
      setTitle('');
    }
  };
  const handleDelete = (id: number) => {
    dispatch({ type: 'delete', payload: id });
  };
  const handleEdit = (id: number, updatedTitle: string) => {
    dispatch({ type: 'edit', payload: { id, updatedTitle } });
  };
  const handleDone = (id: number) => {
    dispatch({ type: 'done', payload: { id } });
  };

  const handleUpdateTodos = (updatedTodos: Todo[]) => {
    dispatch({ type: 'update', payload: updatedTodos });
  };
  const contextValue = {
    title,
    setTitle,
    todos,
    dispatch,
    handleAdd,
    handleDelete,
    handleDone,
    handleEdit,
    handleUpdateTodos,
    completedTodos,
    uncompletedTodos,
  };
  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
};

export const useTodos = () => {
  return useContext(TodoContext);
};
