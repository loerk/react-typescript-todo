import React, { useRef } from 'react';
import './styles.css';
import { useTodos } from '../contexts/TodoContext';

const InputField = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { title, setTitle, handleAdd } = useTodos();
  return (
    <form
      className='input'
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      <input
        ref={inputRef}
        type='text'
        placeholder='Enter a Task'
        className='input__box'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className='input__submit'>Go</button>
    </form>
  );
};

export default InputField;
