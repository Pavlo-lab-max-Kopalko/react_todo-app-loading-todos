/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { ErrorMessage, Todo } from './types/Todo';
import { TodoItem } from './components/TododItem';
import cn from 'classnames';

// console.log(USER_ID);

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [unableErrorMessage, setUnableErrorMessage] = useState<ErrorMessage>(
    ErrorMessage.DEFAULT,
  );
  const [loading, setLoading] = useState<boolean>(true);

  console.log(unableErrorMessage);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        // eslint-disable-next-line no-console
        console.log('Помилки під час отримання завдань:');
        setUnableErrorMessage(ErrorMessage.LOAD);
        setTimeout(() => {
          setUnableErrorMessage(ErrorMessage.DEFAULT);
        }, 3000);
      })
      .finally(() => setLoading(false));
  }, []);

  console.log(todos);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const onHandler = () => {
    setUnableErrorMessage(ErrorMessage.DEFAULT);
  };

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  // };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <TodoItem todos={todos} />

        {/* Hide the footer if there are no todos */}

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              3 items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className="filter__link selected"
                data-cy="FilterLinkAll"
              >
                All
              </a>

              <a
                href="#/active"
                className="filter__link"
                data-cy="FilterLinkActive"
              >
                Active
              </a>

              <a
                href="#/completed"
                className="filter__link"
                data-cy="FilterLinkCompleted"
              >
                Completed
              </a>
            </nav>

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !unableErrorMessage },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => onHandler()}
        />
        {/* show only one message at a time */}
        {unableErrorMessage}
      </div>
    </div>
  );
};
