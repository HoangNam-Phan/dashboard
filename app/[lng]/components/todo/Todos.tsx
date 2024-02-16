'use client';

import { useState, useEffect } from 'react';
import { useFormState, FormStatus } from 'react-dom';
import Modal from '../modules/Modal';
import type { TodoItem } from '@/lib/types';
import { useDispatch } from 'react-redux';
import { openModal, closeModal } from '@/store/reducers/modal';
import { Todo } from './Todo';
import TodoForm from '../forms/TodoForm';
import { mutateTodo } from '@/lib/utils/todoActions';
import { PlusIcon } from '@heroicons/react/24/outline';
import Loading from '../modules/Loading';
import { motion } from 'framer-motion';

type TodosProps = {
  t: (key: string) => string;
};

export default function Todos({ t }: TodosProps) {
  // @ts-ignore
  const [state, formAction] = useFormState(handleFormAction);
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
    dispatch(openModal('todo'));
  }

  function handleEditClick(todo: TodoItem) {
    setActionType('PUT');
    setCurrentTodo(todo);
    dispatch(openModal('todo'));
  }

  async function handleDeleteClick(todo: TodoItem) {
    setActionType('DELETE');
    setCurrentTodo(todo);
    dispatch(openModal('todo'));
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

    dispatch(closeModal('todo'));
    setTriggerFetch(triggerFetch + 1);
  }

  return (
    <>
      <div className="h-full flex flex-col relative">
        <h2 className="text-2xl font-bold mb-2 lg:mb-5">{t('todos.title')}</h2>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="h-5/6 lg:pr-3 overflow-y-auto">
            <motion.ol
              data-testid="todoList"
              variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
            >
              {todoData?.map((todo) => (
                <Todo
                  t={t}
                  todo={todo}
                  key={todo.text}
                  onEdit={handleEditClick}
                  onDelete={() => handleDeleteClick(todo)}
                />
              ))}
            </motion.ol>
            <motion.button
              type="button"
              data-testid="addTodoButton"
              whileHover={{ scale: 1.5 }}
              className="absolute bottom-0 right-0"
              onClick={handleAddClick}
            >
              <PlusIcon className="size-7" />
            </motion.button>
          </div>
        )}
      </div>
      <Modal id="todo">
        <TodoForm
          t={t}
          actionType={actionType}
          currentTodo={currentTodo}
          formAction={formAction}
          error={state}
        />
      </Modal>
    </>
  );
}
