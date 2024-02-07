'use client';

import React, { useState } from 'react';
import Modal from './modules/Modal';
import type { Todo } from '@/lib/types';
import { useDispatch } from 'react-redux';
import { openModal } from '@/store/actions';

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

const TodoComponent: React.FC = () => {
  const dispatch = useDispatch();
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  const handleAddClick = () => {
    dispatch(openModal());
  };

  return (
    <>
      <div>
        {testTodos.map((todo) => (
          <div key={`${todo.id}-${todo.deadline}`}>
            <p>{todo.text}</p>
            <span>{todo.deadline}</span>
          </div>
        ))}
        <button onClick={handleAddClick}>Add Todo</button>
      </div>
      <Modal>
        <div>
          <p>{testTodos[0].text}</p>
          <span>{testTodos[0].deadline}</span>
        </div>
      </Modal>
    </>
  );
};

export default TodoComponent;
