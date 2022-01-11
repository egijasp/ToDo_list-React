import React, { FC, useEffect, useRef } from 'react';
import { FaRegEdit, FaTimes } from 'react-icons/fa';
import './TodoView.scss';

type TaskProps = {
    onChange: () => void,
    completed: boolean,
    onClick: () => void,
    removeHandler: () => void,
}

const TodoView:FC<TaskProps> = ({
  onChange, completed, children, onClick, removeHandler,
}) => (
  <>
    <input
      type="checkbox"
      checked={completed}
      onChange={onChange}
    />
    <span
      className="todo__task"
      style={{ textDecoration: completed ? 'line-through' : 'none' }}
    >
      {children}
    </span>
    <button
      className="btn black"
      onClick={onClick}
    >
      <FaRegEdit />
    </button>
    <button
      className="btn black"
      onClick={removeHandler}
    >
      <FaTimes />
    </button>
  </>
);

export default TodoView;
