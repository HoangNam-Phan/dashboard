'use client';

import LoginForm from '@/components/UserForm';
import { loginUser } from '@/lib/actions';
import { useFormState } from 'react-dom';
import { FormStatus } from 'react-dom';

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

export default function Login() {
  // @ts-ignore
  const [state, formAction] = useFormState(loginAndSetToken, { message: null });

  return (
    <>
      <LoginForm
        title="Log in"
        submitText="Log in"
        formAction={formAction}
        error={state}
      />
    </>
  );
}
