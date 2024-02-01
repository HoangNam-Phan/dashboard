'use client';

import LoginForm from '@/app/[lng]/components/UserForm';
import { loginUser } from '@/lib/utils/actions';
import { useFormState } from 'react-dom';
import { FormStatus } from 'react-dom';
import { useTranslation } from '@/app/i18n/client';
import { LanguageParams } from '@/lib/types';

function setCookie(name: string, value: string, days: number) {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + days);

  const cookieString = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
  document.cookie = cookieString;
}

async function loginAndSetToken(prevState: FormStatus, formData: FormData) {
  const login = await loginUser(prevState, formData);
  if (login.token) {
    setCookie('token', login.token, 30);
  }

  return login;
}

export default function Login({ params: { lng } }: LanguageParams) {
  // @ts-ignore
  const [state, formAction] = useFormState(loginAndSetToken, { message: null });
  const { t } = useTranslation(lng);

  return (
    <>
      <LoginForm
        title={t('title')}
        submitText="Log in"
        formAction={formAction}
        error={state}
      />
    </>
  );
}
