'use client';

import LoginForm from '@/components/UserForm';
import { loginUser } from '@/lib/actions';
import { redirect } from 'next/navigation';
import { useFormState } from 'react-dom';
import { FormStatus } from 'react-dom';

async function loginAndSetToken(prevState: FormStatus, formData: FormData) {
  const login = await loginUser(prevState, formData);
  if (login.token) {
    localStorage.setItem('token', login.token);
    redirect('/');
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
