import type { TodoItem } from '@/lib/types';

type TodoProps = {
  todo: TodoItem;
  onEdit: (todo: TodoItem) => void;
  onDelete: () => void;
};

export function Todo({ todo, onEdit, onDelete }: TodoProps) {
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
          Due to: <span className="text-bold">{todo.deadline}</span>
        </div>
      </div>
      <div className="mt-3 flex justify-end space-x-2">
        <button onClick={handleEditClick}>Edit</button>
        <button onClick={handleDeleteClick}>Delete</button>
      </div>
    </li>
  );
}
