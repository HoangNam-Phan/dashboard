'use client';

import React, { useState } from 'react';
import Modal from '../modules/Modal';
import type { TodoItem } from '@/lib/types';
import { useDispatch } from 'react-redux';
import { openModal } from '@/store/actions';
import { Todo } from './Todo';
import TodoForm from './TodoForm';

const testTodos = [
  {
    id: 1,
    text: 'Finish TypeScript assignment',
    deadline: '2024-02-10',
  },
  {
    id: 2,
    text: 'Grocery shopping for the week',
    deadline: '2024-02-08',
  },
  {
    id: 3,
    text: 'Schedule dentist appointment',
    deadline: '2024-02-15',
  },
  {
    id: 4,
    text: 'Book flight tickets',
    deadline: '2024-03-01',
  },
];

export default function TodoComponent() {
  const dispatch = useDispatch();
  const [currentTodo, setCurrentTodo] = useState<TodoItem | null>(null);

  const handleAddClick = () => {
    dispatch(openModal());
  };

  const handleEditClick = (todo: TodoItem) => {
    setCurrentTodo(todo);
    dispatch(openModal());
  };

  return (
    <>
      <div className="h-full relative">
        <h2 className='text-3xl mb-5'>TODOS</h2>
        <ol>
          {testTodos.map((todo) => (
            <Todo todo={todo} key={todo.text} onEdit={handleEditClick} />
          ))}
        </ol>
        <button
          className="text-5xl absolute bottom-0 right-0"
          onClick={handleAddClick}
        >
          +
        </button>
      </div>
      <Modal>
        <TodoForm currentTodo={currentTodo} />
      </Modal>
    </>
  );
}
