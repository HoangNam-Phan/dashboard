'use server';

import { saveUser, isValidUser, isExistingUser } from './users';
import { redirect } from 'next/navigation';
import { FormStatus } from 'react-dom';
import { FormUser } from './types';

function isValidPassword(password: FormDataEntryValue | null): boolean {
  const passwordString = String(password);
  const letterRegex = /[a-zA-Z]/;
  const uppercaseRegex = /[A-Z]/;
  const numberRegex = /\d/;

  return (
    passwordString.length >= 8 &&
    numberRegex.test(passwordString) &&
    letterRegex.test(passwordString) &&
    uppercaseRegex.test(passwordString)
  );
}

function getUserData(formData: FormData): FormUser {
  return {
    userName: formData.get('userName'),
    password: formData.get('password'),
  };
}

export async function registerUser(prevState: FormStatus, formData: FormData) {
  const user = getUserData(formData);

  const duplicateUsername = isExistingUser(user);
  if (duplicateUsername) {
    return { message: 'User name is already taken.' };
  }

  if (!isValidPassword(user.password)) {
    return { message: 'Password is not valid.' };
  }

  saveUser(user);
  redirect('/');
}

export async function loginUser(prevState: FormStatus, formData: FormData) {
  const user = getUserData(formData);
  const login = isValidUser(user);

  if (!login.success) {
    return { message: 'You entered credentials are not correct.' };
  }

  return { message: 'Login successful!', token: login.token };
}
