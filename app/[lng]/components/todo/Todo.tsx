import type { TodoItem } from '@/lib/types';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';

type TodoProps = {
  todo: TodoItem;
  onEdit: (todo: TodoItem) => void;
  onDelete: () => void;
  t: (key: string) => string;
};

export function Todo({ todo, onEdit, onDelete, t }: TodoProps) {
  function handleEditClick() {
    onEdit(todo);
  }
  function handleDeleteClick() {
    onDelete();
  }

  return (
    <li className="bg-white mb-5 p-3 rounded-lg shadow-lg">
      <div>
        <p>{todo.text}</p>
        <div className="mt-5 text-right italic">
          {t('todos.dueDate')}
          <span className="text-bold">{todo.deadline}</span>
        </div>
      </div>
      <div className="mt-3 flex justify-end space-x-2">
        <button type="button" onClick={handleEditClick}>
          <PencilIcon className="size-5" />
        </button>
        <button type="button" onClick={handleDeleteClick}>
          <TrashIcon className="size-5" />
        </button>
      </div>
    </li>
  );
}
