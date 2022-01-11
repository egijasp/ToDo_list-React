import { FaPlus } from 'react-icons/fa';
import React, {
  ChangeEvent, FC, FormEvent, useEffect, useRef,
} from 'react';
import './Form.scss';
import options from '../../assets/data/options';

type FormProps = {
    onSubmit: (e: FormEvent<HTMLFormElement>) => void,
    value: string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    onChangeHandler: (e: ChangeEvent<HTMLSelectElement>) => void,
    selectValue: string,
}

const Form:FC<FormProps> = ({
  value, placeholder, onChange, onSubmit, onChangeHandler, selectValue,
}) => {
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    input.current?.focus();
  }, []);

  return (
    <form
      className="form"
      onSubmit={onSubmit}
    >
      <input
        className="form__input"
        type="text"
        ref={input}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      <select
        className="select"
        value={selectValue}
        onChange={onChangeHandler}
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
        className="btn btn-add center btn-color"
        type="submit"
      >
        <FaPlus />
      </button>
    </form>
  );
};

export default Form;
