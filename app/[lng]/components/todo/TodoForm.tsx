import type { TodoItem } from '@/lib/types';

type TodoFormProps = {
  currentTodo: TodoItem | null;
};

export default function TodoForm({ currentTodo }: TodoFormProps) {
  return (
    <form>
      <div>
        <label htmlFor="todoText">Todo Text:</label>
        <input
          type="text"
          id="todoText"
          defaultValue={currentTodo?.text}
          required
        />
      </div>
      <div>
        <label htmlFor="deadline">Deadline:</label>
        <input
          type="date"
          id="deadline"
          defaultValue={currentTodo?.deadline}
          required
        />
      </div>
      <button type="submit">{currentTodo ? 'Edit' : 'Add'} Todo</button>
    </form>
  );
}
