import type { TodoItem } from '@/lib/types';

type TodoProps = {
  todo: TodoItem;
  onEdit: (todo: TodoItem) => void;
};

export function Todo({ todo, onEdit }: TodoProps) {
  const handleEditClick = () => {
    onEdit(todo);
  };

  return (
    <li className="bg-white mb-5 p-3 rounded-lg shadow-lg">
      <div>
        <p>{todo.text}</p>
        <span className="text-right">Deadline: {todo.deadline}</span>
      </div>
      <div className="flex justify-end space-x-2">
        <button onClick={handleEditClick}>Edit</button>
        <button>Delete</button>
      </div>
    </li>
  );
}
