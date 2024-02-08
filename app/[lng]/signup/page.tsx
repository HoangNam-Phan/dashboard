'use client';

import SignupForm from '@/app/[lng]/components/UserForm';
import { registerUser } from '@/lib/utils/userActions';
import { useFormState } from 'react-dom';

export default function Signup() {
  // @ts-ignore
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
