import './EditTodo.scss';
import React, {
  ChangeEvent, FC, useEffect, useRef,
} from 'react';
import options from '../../assets/data/options';

type EditTodoProps = {
  task: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  onClick: () => void,
  changeHandler: (e: ChangeEvent<HTMLSelectElement>) => void,
  selectValue: string,
}

const EditTodo:FC<EditTodoProps> = ({
  task, onChange, onClick, changeHandler, selectValue,
}) => {
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    editInputRef.current?.focus();
  }, []);
  return (
    <form
      className="form__edit"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <input
        className="input__edit"
        ref={editInputRef}
        type="text"
        value={task}
        onChange={onChange}
      />
      <select
        className="select"
        value={selectValue}
        onChange={changeHandler}
      >
        <option value="">Select tag:</option>
        {options.map((tag) => (
          <option
            key={tag}
            value={tag}
          >
            {tag}
          </option>
        ))}
      </select>
      <button
        type="button"
        className="btn btn-color edit"
        onClick={onClick}
      >
        SAVE
      </button>
    </form>
  );
};

export default EditTodo;
