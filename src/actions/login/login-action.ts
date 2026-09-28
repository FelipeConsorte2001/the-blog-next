'use server';

import { createLoginSessionFromApi } from '@/lib/login/manage-login';
import { LoginSchema } from '@/lib/login/schemas';
import { apiRequest } from '@/utils/api-request';
import { getZodErrorMessages } from '@/utils/get-zod-error-messages';
import { verifyHoneypotInput } from '@/utils/verify-honeypot-input';
import { redirect } from 'next/navigation';

type LoginActionState = {
  email: string;
  errors: string[];
};
export async function loginAction(state: LoginActionState, formData: FormData) {
  const isBot = await verifyHoneypotInput(formData);

  if (isBot)
    return {
      email: state.email,
      errors: ['nice'],
      success: false,
    };

  if (!(formData instanceof FormData)) {
    return {
      email: '',
      errors: ['Invalid Data'],
    };
  }

  const formObj = Object.fromEntries(formData.entries());
  const formEmail = formObj?.email?.toString() || '';

  const parsedFormData = LoginSchema.safeParse(formObj);

  if (!parsedFormData.success) {
    return {
      email: formEmail,
      errors: getZodErrorMessages(parsedFormData.error),
    };
  }

  const loginResponse = await apiRequest<{ accessToken: string }>(
    '/auth/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parsedFormData.data),
    },
  );

  if (!loginResponse.success) {
    return {
      email: formEmail,
      errors: loginResponse.errors,
    };
  }

  await createLoginSessionFromApi(loginResponse.data.accessToken);
  redirect('/admin/post');
}
