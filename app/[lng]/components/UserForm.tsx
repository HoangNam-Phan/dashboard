import React from 'react';
import type { ErrorObject } from '@/lib/types';

type UserFormProps = {
  title: string;
  submitText: string;
  formAction: (formData: FormData) => void;
  error?: ErrorObject;
  t: (key: string) => string;
};

export default function UserForm({
  title,
  submitText,
  formAction,
  error,
  t,
}: UserFormProps) {
  const inputClasses = `block w-full mt-2 px-3 py-2 border-2 rounded-md focus:outline-none 
                        focus:ring-2 focus:border-blue-500 hover:ring-1 hover:border-blue-200`;
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900">
            {t(title)}
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action={formAction}>
            <div>
              <label
                htmlFor="userName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {t('userName')}
              </label>
              <div className="mt-2">
                {error?.message && <p>{error.message}</p>}
                <input
                  id="userName"
                  name="userName"
                  type="userName"
                  autoComplete="userName"
                  required
                  className={inputClasses}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {t('password')}
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className={inputClasses}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700"
              >
                {t(submitText)}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
