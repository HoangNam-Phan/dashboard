'use client';

import LoginForm from '@/app/[lng]/components/forms/UserForm';
import { loginUser } from '@/lib/utils/userActions';
import { useFormState } from 'react-dom';
import { FormStatus } from 'react-dom';
import { useTranslation } from '@/app/i18n/client';
import { LanguageParams } from '@/lib/types';
import { UserErrorMessage } from '@/lib/types';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { redirect } from 'next/navigation';

function setCookie(name: string, value: string, days: number) {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + days);

  const cookieString = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
  document.cookie = cookieString;
}

export default function Login({ params: { lng } }: LanguageParams) {
  // @ts-ignore
  const [state, formAction] = useFormState(loginAndSetToken, null);
  const lang = useSelector((state: RootState) => state.language.lang);
  const { t } = useTranslation(lng);

  async function loginAndSetToken(prevState: FormStatus, formData: FormData) {
    const login = await loginUser(prevState, formData);
    if (login?.token) {
      setCookie('token', login.token, 30);
    }

    redirect(`/${lang}/dashboard`);
  }

  return (
    <>
      <LoginForm
        title="login.title"
        submitText="login.cta"
        formAction={formAction}
        error={state as UserErrorMessage}
        t={t}
      />
    </>
  );
}
