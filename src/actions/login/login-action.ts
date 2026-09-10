'use server';

import { createLoginSession, verifyPassword } from '@/lib/login/manage-login';
import { redirect } from 'next/navigation';

type LoginActionState = {
  username: string;
  error: string;
};
export async function loginAction(state: LoginActionState, formData: FormData) {
  if (!(formData instanceof FormData)) {
    return {
      username: '',
      error: 'Invalid Data',
    };
  }

  const username = formData.get('username')?.toString().trim() || '';
  const password = formData.get('password')?.toString().trim() || '';
  if (!username || !password) {
    return {
      username,
      password: 'Passoword invalid',
    };
  }

  const isUsernameCorrect = username === process.env.LOGIN_USER;
  const isPasswordValid = await verifyPassword(
    password,
    process.env.LOGIN_PASS || '',
  );

  if (!isUsernameCorrect || !isPasswordValid) {
    return { username, password: 'User or password invalid' };
  }
  await createLoginSession(username);
  redirect('/admin/post');
}
