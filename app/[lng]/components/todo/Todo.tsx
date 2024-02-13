import type { TodoItem } from '@/lib/types';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

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
    <motion.li
      className="bg-slate-200 dark:bg-gray-400 text-gray-900 mb-5 p-3 rounded-lg shadow-lg"
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <p>{todo.text}</p>
        <div className="mt-5 text-right italic">
          {t('todos.dueDate')}
          <span className="text-bold">{todo.deadline}</span>
        </div>
      </div>
      <div className="mt-3 flex justify-end space-x-2">
        <motion.button
          type="button"
          onClick={handleEditClick}
          whileHover={{ rotate: 360 }}
        >
          <PencilIcon className="size-5" />
        </motion.button>
        <motion.button
          type="button"
          onClick={handleDeleteClick}
          whileHover={{ rotate: 180 }}
        >
          <TrashIcon className="size-5" />
        </motion.button>
      </div>
    </motion.li>
  );
}
