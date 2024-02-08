'use client';

import { useState, useEffect } from 'react';
import { useFormState, FormStatus } from 'react-dom';
import Modal from '../modules/Modal';
import type { TodoItem } from '@/lib/types';
import { useDispatch } from 'react-redux';
import { closeModal, openModal } from '@/store/actions';
import { Todo } from './Todo';
import TodoForm from './TodoForm';
import { mutateTodo } from '@/lib/utils/todoActions';

export default function TodoComponent() {
  // @ts-ignore
  const [state, formAction] = useFormState(handleFormAction, { message: null });
  const [actionType, setActionType] = useState<string>('');
  const [currentTodo, setCurrentTodo] = useState<TodoItem | null>(null);
  const [todoData, setTodoData] = useState<TodoItem[]>();
  const [isLoading, setLoading] = useState(true);
  const [triggerFetch, setTriggerFetch] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch('/api/todos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        console.error('Failed to fetch todos');
        setLoading(false);
        return;
      }
      const todosData = await response.json();
      setTodoData(todosData.todos);
      setLoading(false);
    };

    fetchTodos();
  }, [triggerFetch]);

  function handleAddClick() {
    setActionType('POST');
    setCurrentTodo(null);
    dispatch(openModal());
  }

  function handleEditClick(todo: TodoItem) {
    setActionType('PUT');
    setCurrentTodo(todo);
    dispatch(openModal());
  }

  async function handleDeleteClick(todo: TodoItem) {
    setActionType('DELETE');
    setCurrentTodo(todo);
    dispatch(openModal());
  }

  async function handleFormAction(prevState: FormStatus, formData: FormData) {
    const response = await mutateTodo(
      prevState,
      formData,
      actionType,
      currentTodo?.id
    );

    if (!response.ok) {
      const responseBody = await response.json();
      return { message: responseBody.error };
    }

    dispatch(closeModal());
    setTriggerFetch(triggerFetch + 1);
  }

  return (
    <>
      <div className="h-full flex flex-col relative">
        <h2 className="text-2xl font-bold mb-8">Todo list</h2>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="h-5/6 pr-3 overflow-y-auto">
            <ol>
              {todoData?.map((todo) => (
                <Todo
                  todo={todo}
                  key={todo.text}
                  onEdit={handleEditClick}
                  onDelete={() => handleDeleteClick(todo)}
                />
              ))}
            </ol>
            <button
              className="text-5xl absolute bottom-0 right-0"
              onClick={handleAddClick}
            >
              +
            </button>
          </div>
        )}
      </div>
      <Modal>
        <TodoForm
          actionType={actionType}
          currentTodo={currentTodo}
          formAction={formAction}
          error={state}
        />
      </Modal>
    </>
  );
}
