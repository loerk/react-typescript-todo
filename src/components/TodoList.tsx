import React from 'react';

import { SingleTodo } from './SingleTodo';
import './styles.css';
import { useTodos } from '../contexts/TodoContext';
import { StrictModeDroppable } from './DroppableStrictMode';

const TodoList = () => {
  const { uncompletedTodos, completedTodos } = useTodos();
  return (
    <div className='container'>
      <StrictModeDroppable droppableId='TodosList'>
        {(provided) => (
          <div
            className='todos'
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className='todos__heading'>Active Tasks</span>
            {uncompletedTodos.map((todo, index) => (
              <SingleTodo
                index={index}
                title={todo.title}
                isDone={todo.isDone}
                id={todo.id}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
      <StrictModeDroppable droppableId='TodosDoneList'>
        {(provided) => (
          <div
            className='todos completed'
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className='todos__heading'>Completed Tasks</span>
            {completedTodos.map((todo, index) => (
              <SingleTodo
                index={index}
                title={todo.title}
                isDone={todo.isDone}
                id={todo.id}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </div>
  );
};

export default TodoList;
