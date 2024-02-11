import React from 'react';
import type { UserErrorMessage } from '@/lib/types';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

type UserFormProps = {
  title: string;
  submitText: string;
  success?: boolean;
  formAction: (formData: FormData) => void;
  error: UserErrorMessage;
  t: (key: string) => string;
};

export default function UserForm({
  title,
  submitText,
  success,
  formAction,
  error,
  t,
}: UserFormProps) {
  const labelClasses = 'block font-medium text-gray-900';
  const labelWrapperClasses = 'flex items-center justify-between';
  const inputClasses = `block w-full mt-2 px-3 py-2 border-2 rounded-md focus:outline-none 
    focus:ring-2 focus:border-blue-500 hover:ring-1 hover:border-blue-200`;
  const errorMessageClass = 'text-red-500 font-semibold';
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-bold text-gray-900">
            {t(title)}
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action={formAction}>
            <div>
              <div className={labelWrapperClasses}>
                <label htmlFor="userName" className={labelClasses}>
                  {t('userName')}
                </label>
                {error?.message?.userName && (
                  <p className={errorMessageClass}>
                    {t(error.message.userName)}
                  </p>
                )}
              </div>
              <div className="mt-2">
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
              <div className={labelWrapperClasses}>
                <label htmlFor="password" className={labelClasses}>
                  {t('password')}
                </label>
                {error?.message?.password && (
                  <p className={errorMessageClass}>
                    {t(error.message.password)}
                  </p>
                )}
              </div>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className={inputClasses}
                />
                {submitText === 'register.cta' ? (
                  <div className="absolute right-3 top-3 group">
                    <InformationCircleIcon className="h-5 w-5 group-hover:text-gray-600 cursor-pointer" />
                    <div className="hidden group-hover:block absolute z-10 p-2 bg-gray-700 text-white rounded-lg text-sm -mt-16 ml-12 w-60">
                      <span>{t('passwordTooltip.title')}</span>
                      <ol>
                        <li>{t('passwordTooltip.req1')}</li>
                        <li>{t('passwordTooltip.req2')}</li>
                        <li>{t('passwordTooltip.req3')}</li>
                      </ol>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700"
              >
                {t(submitText)}
              </button>
              {success ? (
                <div className="absolute my-10 left-1/2 -translate-x-1/2">
                  <p className="text-lg text-green-600 font-semibold">
                    {t('register.success')}
                  </p>
                </div>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
