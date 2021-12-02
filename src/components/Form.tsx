import { FaPlus } from 'react-icons/fa';
import React, {
  ChangeEvent, FC, FormEvent, useEffect, useRef,
} from 'react';
import './Form.scss';

type FormProps = {
    onSubmit: (e: FormEvent<HTMLFormElement>) => void,
    value: string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
}

const Form:FC<FormProps> = ({
  value, placeholder, onChange, onSubmit,
}) => {
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    input.current?.focus();
  }, []);

  return (
    <form
      className="todo__form"
      onSubmit={onSubmit}
    >
      <input
        className="todo__input"
        type="text"
        ref={input}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      <button
        className="btn btn-add btn-color"
        type="submit"
      >
        <FaPlus />
      </button>
    </form>
  );
};

export default Form;
