import React, {
  ChangeEvent, FormEvent, useEffect, useState,
} from 'react';
import ProgressBar from '@ramonak/react-progress-bar';
import '../styles/ToDo.scss';
import Form from '../components/Form/Form';
import EditTodo from '../components/EditTodo/EditTodo';
import TodoView from '../components/TodoView/TodoView';
import options from '../assets/data/options';

type Task = {
  task: string,
  completed: boolean,
  editing: boolean,
  tag: string,
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
  const [taskList, setTaskList] = useState<Task[]>(taskListLocalStorage());
  const [completedTask, setCompletedTask] = useState(false);
  const [tagValue, setTagValue] = useState('');
  const [editedTag, setEditedTag] = useState('');
  const [tagFilter, setTagFilter] = useState('all');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(taskList));
  }, [taskList]);

  const addTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const duplicateCheck = taskList.find((task) => task.task === inputValue);
    if (!inputValue) {
      setErrorMessage('Empty input field');
      return;
    } if (!tagValue) {
      setErrorMessage('Choose one of the tags');
      return;
    } if (duplicateCheck) {
      setErrorMessage('Duplicated task');
      return;
    }

    const newTask = {
      task: inputValue,
      completed: false,
      editing: false,
      tag: tagValue,
    };
    setTaskList([...taskList, newTask]);
    setInputValue('');
    setTagValue('');
    setErrorMessage('');
  };

  const removeTask = (index: number) => {
    const filteredTaskList = taskList.filter((_, i) => i !== index);
    setTaskList(filteredTaskList);
  };

  const removeAllTasks = () => {
    setTaskList([]);
  };

  const toggleCompletedTask = (index: number) => {
    const cloneTodoList = [...taskList];
    cloneTodoList[index].completed = !cloneTodoList[index].completed;
    setTaskList(cloneTodoList);
  };

  const editTask = (index: number, editing: boolean) => {
    const clonedTaskList = [...taskList];
    clonedTaskList[index].editing = editing;
    setTaskList(clonedTaskList);
  };

  const updateEditedTask = (index: number) => {
    const newTask = [...taskList];
    taskList[index].tag = editedTag;
    setTaskList(newTask);
  };

  const progressCounter = ((taskList.filter((task) => task.completed).length / taskList.length) * 100).toFixed(0);

  const completedTaskLength = taskList.filter((todo) => todo.completed).length;

  return (
    <div className="todos-container">
      <h1 className="heading1">ToDo list</h1>
      <div className="todos">
        <Form
          onSubmit={addTask}
          onChangeHandler={(e: ChangeEvent<HTMLSelectElement>) => {
            setTagValue(e.target.value);
          }}
          selectValue={tagValue}
          value={inputValue}
          placeholder="Enter new task..."
          onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
        />
        <span
          className="todo__error"
        >
          {errorMessage}
        </span>
        <div className="btn-wrapper">
          <button
            className="btn btn-color small"
            type="button"
            onClick={removeAllTasks}
          >
            DELETE ALL
          </button>
          <button
            className="btn btn-color small"
            type="button"
            onClick={() => setCompletedTask(!completedTask)}
          >
            COMPLETED
          </button>
          <button
            className="btn btn-color small"
            onClick={() => setTagFilter('all')}
          >
            all
          </button>
          {options.map((tag) => (
            <button
              key={tag}
              className="btn btn-color small"
              onClick={() => setTagFilter(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
        {taskList.length ? (
          <div
            className="progressBar-wrapper"
          >
            <ProgressBar
              completed={progressCounter}
              height="15px"
              customLabel={`${progressCounter}%`}
            />
            <span>
              Completed
              {' '}
              { completedTaskLength }
              {' '}
              from
              {' '}
              { taskList.length }
              {' '}
              tasks
            </span>
          </div>
        ) : '' }
      </div>
      <div className="todo__list">
        {taskList
          .filter((task) => (tagFilter === 'all' ? task : task.tag === tagFilter))
          .filter((todo) => (todo.completed || !completedTask))
          .map(({
            task, completed, editing, tag,
          }, index) => (
            <div key={task} className="todo__task-wrapper">
              {editing ? (
                <EditTodo
                  task={task}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const clonedTodoList = [...taskList];
                    clonedTodoList[index].task = e.target.value;
                    setTaskList(clonedTodoList);
                  }}
                  selectValue={editedTag}
                  changeHandler={(e: ChangeEvent<HTMLSelectElement>) => {
                    setEditedTag(e.target.value);
                  }}
                  onClick={() => {
                    editTask(index, false);
                    updateEditedTask(index);
                  }}
                />
              ) : (
                <TodoView
                  completed={completed}
                  onChange={() => {
                    toggleCompletedTask(index);
                  }}
                  onClick={() => {
                    editTask(index, true);
                  }}
                  removeHandler={() => {
                    removeTask(index);
                  }}
                >
                  {task}
                  {' '}
                  {tag && (
                  <span
                    className="tag"
                  >
                    {' '}
                    #
                    {tag}
                  </span>
                  )}
                </TodoView>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ToDo;
