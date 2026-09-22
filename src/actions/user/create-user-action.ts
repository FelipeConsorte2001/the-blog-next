'use server';

import {
  CreateUserSchema,
  PublicUserDto,
  PublicUserSchema,
} from '@/lib/user/schemas';
import { getZodErrorMessages } from '@/utils/get-zod-error-messages';

type CreateUserActionState = {
  user: PublicUserDto;
  errors: string[];
  success: boolean;
};

export async function createUserAction(
  state: CreateUserActionState,
  formData: FormData,
): Promise<CreateUserActionState> {
  if (!(formData instanceof FormData)) {
    return {
      user: state.user,
      errors: ['Invalid data'],
      success: false,
    };
  }

  const formObj = Object.fromEntries(formData.entries());
  const parsedFormData = CreateUserSchema.safeParse(formObj);

  if (!parsedFormData.success) {
    return {
      user: PublicUserSchema.parse(formObj),
      errors: getZodErrorMessages(parsedFormData.error),
      success: false,
    };
  }

  try {
    const apiUrl = process.env.API_URL || 'http://localhost:3001';

    const response = await fetch(`${apiUrl}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parsedFormData.data),
    });

    const json = await response.json();
    if (!response.ok) {
      console.log(json);
      return {
        user: PublicUserSchema.parse(formObj),
        errors: json.message,
        success: false,
      };
    }
    return {
      user: PublicUserSchema.parse(formObj),
      errors: ['Successs'],
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      user: PublicUserSchema.parse(formObj),
      errors: ['Failed to connected to server'],
      success: false,
    };
  }
}
