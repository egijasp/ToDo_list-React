import {
  ChangeEvent, FormEvent, useEffect, useState,
} from 'react';
import '../styles/Todo.scss';
import { FaRegEdit, FaPlus, FaTimes } from 'react-icons/fa';
import Form from '../components/Form';

type Task = {
  id: number,
  task: string,
  completed: boolean,
  editing: boolean
}

const taskListLocalStorage = () => {
  const savedTodos = localStorage.getItem('lists');
  if (savedTodos) {
    return JSON.parse(savedTodos) || [];
  }
  return [];
};

const ToDo = () => {
  const [inputValue, setInputValue] = useState('');
  const [completedTask, setCompletedTask] = useState(false);
  const [taskList, setTaskList] = useState<Task[]>(taskListLocalStorage());

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(taskList));
  }, [taskList]);

  const addTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue) {
      return;
    }
    const newTask = {
      id: taskList.length + 1,
      task: inputValue,
      completed: false,
      editing: false,
    };
    setTaskList([...taskList, newTask]);
    setInputValue('');
  };

  const removeTask = (index: number) => {
    const filteredList = taskList.filter((_, i) => i !== index);
    setTaskList(filteredList);
  };

  const removeAllTasks = () => {
    setTaskList([]);
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

  const editTask = (index: number, editing: boolean) => {
    const clonedTaskList = [...taskList];
    clonedTaskList[index].editing = editing;
    setTaskList(clonedTaskList);
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
          onClick={removeAllTasks}
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
        {completedTasks.map(({
          task, completed, editing, id,
        }, index) => (
          <div key={id} className="todo__task-wrapper">
            <input
              type="checkbox"
              checked={completed}
              onChange={() => {
                checkedTask(index);
              }}
            />
            {editing ? (
              <div className="todo__task edit">
                <input
                  className="input__edit"
                  type="text"
                  value={task}
                  onChange={(e) => {
                    const clonedTodoList = [...taskList];
                    clonedTodoList[index].task = e.target.value;
                    setTaskList(clonedTodoList);
                  }}
                />
                <select className="input__edit">
                  <option value="today">Today</option>
                  <option>This Week</option>
                  <option>This Month</option>
                </select>
                <button
                  onClick={() => {
                  }}
                  type="button"
                  className="btn btn-color edit"
                >
                  CANCEL
                </button>
                <button
                  className="btn btn-color edit"
                  onClick={() => {
                    editTask(index, false);
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
                editTask(index, true);
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
