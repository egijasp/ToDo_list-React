import {
  ChangeEvent, FormEvent, useEffect, useRef, useState,
} from 'react';
import '../styles/Todo.scss';
import { FaRegEdit, FaPlus, FaTimes } from 'react-icons/fa';
import Form from '../components/Form';

type Task = {
  id: number,
    task: string,
    completed: boolean,
}

const ToDo = () => {
  const [inputValue, setInputValue] = useState('');
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [completedTask, setCompletedTask] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editedTask, setEditedTask] = useState('');

  const addTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue) {
      return;
    }
    const newTaskList = { id: Math.random(), task: inputValue, completed: false };
    setTaskList([...taskList, newTaskList]);
    setInputValue('');
  };

  const removeTask = (index: number) => {
    const filteredList = taskList.filter((_, i) => i !== index);
    setTaskList(filteredList);
  };

  const checkedTask = (index: number) => {
    const cloneTodoList = [...taskList];
    cloneTodoList[index].completed = !cloneTodoList[index].completed;
    setTaskList(cloneTodoList);
  };

  const completedTasks = taskList.filter((task) => {
    if (completedTask) {
      return task.completed;
    }
    return true;
  });

  const editedTaskList = (index: number) => {
    const updatedTaskList = [...taskList].map((task, i) => {
      if (index === i) {
        return { ...task, task: editedTask };
      }
      return task;
    });
    setTaskList(updatedTaskList);
  };

  return (
    <div className="todo">
      <Form
        onSubmit={addTask}
        value={inputValue}
        placeholder="New task"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
      />
      <div className="todo__change">
        <button
          className="btn btn-todo btn-color"
          type="button"
          onClick={() => {
            setTaskList([]);
          }}
        >
          DELETE ALL
        </button>
        <button
          className="btn btn-todo btn-color"
          type="button"
          onClick={() => setCompletedTask(!completedTask)}
        >
          COMPLETED
        </button>
      </div>
      <div className="todo__list">
        {completedTasks.map(({ task, completed, id }, index) => (
          <div key={id} className="todo__task-wrapper">
            <input
              type="checkbox"
              checked={completed}
              onChange={() => {
                checkedTask(index);
              }}
            />
            {edit ? (
              <div className="todo__task edit">
                <input
                  className="input__edit"
                  type="text"
                  value={task}
                  onChange={(e) => {
                    setEditedTask(e.target.value);
                    editedTaskList(index);
                  }}
                />
                <select className="input__edit">
                  <option value="today">Today</option>
                  <option>This Week</option>
                  <option>This Month</option>
                </select>
                <button
                  onClick={() => {
                    setEdit(!edit);
                  }}
                  type="button"
                  className="btn btn-color edit"
                >
                  CANCEL
                </button>
                <button
                  className="btn btn-color edit"
                  onClick={() => {
                    editedTaskList(index);
                  }}
                >
                  SAVE
                </button>
              </div>
            ) : (
              <span className="todo__task">
                {task}
              </span>
            )}
            <button
              className="btn"
              onClick={() => {
                setEdit(!edit);
              }}
            >
              <FaRegEdit />
            </button>
            <button
              className="btn"
              onClick={() => {
                removeTask(index);
              }}
            >
              <FaTimes />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToDo;
