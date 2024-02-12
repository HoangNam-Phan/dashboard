'use client';

import SignupForm from '@/app/[lng]/components/forms/UserForm';
import { registerUser } from '@/lib/utils/userActions';
import { useFormState } from 'react-dom';
import { FormStatus } from 'react-dom';
import { UserErrorMessage } from '@/lib/types';
import { useTranslation } from '@/app/i18n/client';
import { LanguageParams } from '@/lib/types';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation'
import { useState } from 'react';

export default function Signup({ params: { lng } }: LanguageParams) {
  // @ts-ignore
  const [state, formAction] = useFormState(registerUserAndRedirect, null);
  const [registerSuccessful, setRegisterSuccessful] = useState(false);
  const lang = useSelector((state: RootState) => state.language.lang);
  const router = useRouter();
  const { t } = useTranslation(lng);

  async function registerUserAndRedirect(
    prevState: FormStatus,
    formData: FormData
  ) {
    const register = await registerUser(prevState, formData);
    if (register?.message) {
      return register;
    }

    setRegisterSuccessful(true);

    setTimeout(() => {
      setRegisterSuccessful(false);
      router.push(`/${lang}/login`);
    }, 3000);
  }

  return (
    <>
      <SignupForm
        title="register.title"
        submitText="register.cta"
        success={registerSuccessful}
        formAction={formAction}
        error={state as UserErrorMessage}
        t={t}
      />
    </>
  );
}
