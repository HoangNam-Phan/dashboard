import type { TodoItem } from '@/lib/types';
import type { TodoErrorMessage } from '@/lib/types';

type TodoFormProps = {
  actionType: string;
  currentTodo: TodoItem | null;
  formAction: (formData: FormData) => void;
  error?: TodoErrorMessage;
  t: (key: string) => string;
};

export default function TodoForm({
  actionType,
  currentTodo,
  formAction,
  error,
  t,
}: TodoFormProps) {
  const inputClasses = `mt-2 px-3 py-2 border-2 rounded-md focus:outline-none 
     focus:ring-2 focus:border-blue-500 hover:ring-1 hover:border-blue-200`;
  return (
    <form className="flex flex-col space-y-5" action={formAction}>
      {actionType === 'DELETE' ? (
        <>
          <p>{t('todos.form.deleteWarning')}</p>
          <button className="self-end" type="submit">
            {t('todos.form.delete')}
          </button>
        </>
      ) : (
        <>
          {' '}
          <div>
            <label htmlFor="text">{t('todos.form.content')}</label>
            <input
              className={`w-full ${inputClasses}`}
              type="text"
              name="text"
              id="text"
              defaultValue={currentTodo?.text}
              required
            />
          </div>
          <div>
            <label htmlFor="deadline">{t('todos.form.deadline')}</label>
            <input
              className={`block ${inputClasses}`}
              type="date"
              name="deadline"
              id="deadline"
              defaultValue={currentTodo?.deadline}
              required
            />
          </div>
          {error?.message && (
            <p className="text-red-500 font-semibold">{error.message}</p>
          )}
          <button className="self-end" type="submit">
            {actionType === 'POST' ? t('todos.form.add') : t('todos.form.save')}{' '}
          </button>
        </>
      )}
    </form>
  );
}
