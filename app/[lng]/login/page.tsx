'use client';

import LoginForm from '@/app/[lng]/components/forms/UserForm';
import { loginUser } from '@/lib/utils/userActions';
import { useFormState } from 'react-dom';
import { FormStatus } from 'react-dom';
import { useTranslation } from '@/app/i18n/client';
import { LanguageParams } from '@/lib/types';
import { UserErrorMessage } from '@/lib/types';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { setIsLoggedIn } from '@/store/reducers/login';
import { RootState } from '@/store/store';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import Cookies from 'js-cookie';

export default function Login({ params: { lng } }: LanguageParams) {
  // @ts-ignore
  const [state, formAction] = useFormState(loginAndSetToken, null);
  const lang = useSelector((state: RootState) => state.language.lang);
  const [loginSuccessful, setLoginSuccessful] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation(lng);
  const router = useRouter();

  async function loginAndSetToken(prevState: FormStatus, formData: FormData) {
    const login = await loginUser(prevState, formData);
    if (login?.token) {
      Cookies.set('token', login.token, { expires: 30 });
      dispatch(setIsLoggedIn(true));
      setLoginSuccessful(true);

      setTimeout(() => {
        router.push(`/${lang}/dashboard`);
      }, 1000);
    }

    return login;
  }

  return (
    <>
      <LoginForm
        title="login.title"
        submitText="login.cta"
        success={loginSuccessful}
        formAction={formAction}
        error={state as UserErrorMessage}
        t={t}
      />
    </>
  );
}
