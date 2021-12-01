import { useEffect, useRef, useState } from 'react';

type Task = {
    task: string,
    completed: boolean,
}

const ToDo = () => {
  const [inputValue, setInputValue] = useState('');
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [completedTask, setCompletedTask] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    input.current?.focus();
  }, []);

  const submitHandler = () => {
    if (taskList) {
      setTaskList([...taskList, { task: inputValue, completed: false }]);
    }
    setInputValue('');
  };

  const removeHandler = (index: number) => {
    const filteredList = taskList.filter((_, i) => i !== index);
    setTaskList(filteredList);
  };

  const checkHandler = (index: number) => {
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

  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault();
        submitHandler();
      }}
      >
        <label htmlFor="task">
          Add new task
          <input
            name="task"
            type="text"
            ref={input}
            value={inputValue}
            placeholder="New task"
            onChange={(e) => setInputValue(e.target.value)}
          />
        </label>
        <button type="submit">ADD</button>
      </form>
      <button
        type="button"
        onClick={() => setCompletedTask(!completedTask)}
      >
        Completed tasks
      </button>
      <div className="todo__cards">
        {completedTasks.map(({ task, completed }, index) => (
          <div>
            <input
              type="checkbox"
              checked={completed}
              onChange={() => {
                checkHandler(index);
              }}
            />
            {task}
            <button onClick={() => {
              removeHandler(index);
            }}
            >
              &times;
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ToDo;
