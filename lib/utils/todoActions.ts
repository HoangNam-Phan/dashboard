import type { FormTodo } from '@/lib/types';
import { FormStatus } from 'react-dom';

function getTodoData(formData: FormData, id: number | undefined): FormTodo {
  const todoData = {
    text: formData.get('text'),
    deadline: formData.get('deadline'),
  };

  if (id) {
    return { ...todoData, id };
  }

  return todoData;
}

export async function mutateTodo(
  prevState: FormStatus,
  formData: FormData,
  actionType: string,
  id?: number
) {
  const todoData = getTodoData(formData, id);
  const response = await fetch('/api/todos', {
    method: actionType,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todoData),
  });

  return response;
}
