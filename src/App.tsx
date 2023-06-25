import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useTodos } from './contexts/TodoContext';

import { moveItemPosition } from './helper/helpers';
const App = () => {
  const { completedTodos, uncompletedTodos, handleDone, handleUpdateTodos } =
    useTodos();

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }
    const sameSource = source.droppableId === destination.droppableId;
    const noMovement = sameSource && destination.index === source.index;

    if (noMovement) {
      return;
    }

    if (source.droppableId === 'TodosList') {
      if (sameSource) {
        const updatedListOrder = moveItemPosition(
          uncompletedTodos,
          source.index,
          destination.index
        );

        handleUpdateTodos([...updatedListOrder, ...completedTodos]);
      } else {
        handleDone(uncompletedTodos[source.index].id);
      }
    }

    if (source.droppableId === 'TodosDoneList') {
      if (sameSource) {
        const updatedListOrder = moveItemPosition(
          completedTodos,
          source.index,
          destination.index
        );

        handleUpdateTodos([...uncompletedTodos, ...updatedListOrder]);
      } else {
        handleDone(completedTodos[source.index].id);
      }
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='App'>
        <span className='heading'>Taskify</span>
        <InputField />
        <TodoList />
      </div>
    </DragDropContext>
  );
};

export default App;
