import { Todo } from '../models/TodoModel';

export const moveItemPosition = (
  arr: Todo[],
  fromIndex: number,
  toIndex: number
) => {
  const copyOfArr = [...arr];
  const element = copyOfArr.splice(fromIndex, 1);
  copyOfArr.splice(toIndex, 0, ...element);

  return copyOfArr;
};
