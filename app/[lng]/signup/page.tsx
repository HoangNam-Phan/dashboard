'use client';

import SignupForm from '@/app/[lng]/components/forms/UserForm';
import { registerUser } from '@/lib/utils/userActions';
import { useFormState } from 'react-dom';
import { UserErrorMessage } from '@/lib/types';
import { useTranslation } from '@/app/i18n/client';
import { LanguageParams } from '@/lib/types';

export default function Signup({ params: { lng } }: LanguageParams) {
  // @ts-ignore
  const [state, formAction] = useFormState(registerUser, null);
  const { t } = useTranslation(lng);

  return (
    <>
      <SignupForm
        title="register.title"
        submitText="register.cta"
        formAction={formAction}
        error={state as UserErrorMessage}
        t={t}
      />
    </>
  );
}
