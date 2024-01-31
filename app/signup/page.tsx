'use client';

import SignupForm from '@/components/UserForm';
import { registerUser } from '@/lib/actions';
import { useFormState } from 'react-dom';

export default function Signup() {
  const [state, formAction] = useFormState(registerUser, { message: null });

  return (
    <>
      <SignupForm
        title="Sign up"
        submitText="Sign up"
        formAction={formAction}
        error={state}
      />
    </>
  );
}
