import { FormEvent, useEffect, useRef, useState } from 'react';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import { useTodos } from '../contexts/TodoContext';
import { Todo } from '../models/TodoModel';
import { Draggable } from 'react-beautiful-dnd';
interface SingleTodoProps extends Todo {
  index: number;
}
export const SingleTodo = ({ index, title, id, isDone }: SingleTodoProps) => {
  const { handleDelete, handleDone, handleEdit } = useTodos();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [updatedTodo, setUpdatedTodo] = useState<string>(title);
  const editRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    editRef.current?.focus();
  }, [isEditMode]);

  const handleEditClick = (e: FormEvent, id: number) => {
    e.preventDefault();
    handleEdit(id, updatedTodo);
    setIsEditMode(false);
  };
  return (
    <Draggable draggableId={id.toString()} key={id} index={index}>
      {(provided, snapshot) => (
        <form
          key={id}
          className={
            snapshot.isDragging ? 'todos__single drag' : 'todos__single'
          }
          onSubmit={(e) => {
            handleEditClick(e, id);
          }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {isEditMode ? (
            <input
              ref={editRef}
              value={updatedTodo}
              onChange={(e) => {
                setUpdatedTodo(e.target.value);
              }}
              className='todos__single--text'
            />
          ) : (
            <span className='todos__single--text'>{title}</span>
          )}
          <div>
            <span
              className='icon'
              onClick={() => {
                setIsEditMode(!isEditMode);
              }}
            >
              <AiFillEdit />
            </span>
            <span className='icon' onClick={() => handleDelete(id)}>
              <AiFillDelete />
            </span>
            {!isDone && (
              <span className='icon' onClick={() => handleDone(id)}>
                <MdDone />
              </span>
            )}
          </div>
        </form>
      )}
    </Draggable>
  );
};
