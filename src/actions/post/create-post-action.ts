'use server';

import { getLoginSessionForApi } from '@/lib/login/manage-login';
import {
  CreatePostForApiSchema,
  DtoPostForApi,
  DtoPostForApiSchema,
} from '@/lib/post/schemas';
import { authenticatedApiRequest } from '@/utils/authenticated-api-request';
import { getZodErrorMessages } from '@/utils/get-zod-error-messages';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

type CreatePostActionState = {
  formState: DtoPostForApi;
  error: string[];
  sucess?: true;
};

export async function createPostAction(
  prevState: CreatePostActionState,
  formData: FormData,
): Promise<CreatePostActionState> {
  const isAuthenticated = await getLoginSessionForApi();
  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      error: ['Invalid data'],
    };
  }

  const formDataToObj = Object.fromEntries(formData.entries());
  const zodParsedObj = CreatePostForApiSchema.safeParse(formDataToObj);

  if (!isAuthenticated) {
    return {
      formState: DtoPostForApiSchema.parse(formDataToObj),
      error: ['Do the login in another page'],
    };
  }

  if (!zodParsedObj.success) {
    const error = getZodErrorMessages(zodParsedObj.error);
    return {
      error,
      formState: DtoPostForApiSchema.parse(formDataToObj),
    };
  }

  const newPost = zodParsedObj.data;
  const createPostResponse = await authenticatedApiRequest<DtoPostForApi>(
    `/post/me`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    },
  );

  if (!createPostResponse.success) {
    return {
      formState: DtoPostForApiSchema.parse(formDataToObj),
      error: createPostResponse.errors,
    };
  }

  const createdPost = createPostResponse.data;

  revalidateTag('posts', {});
  redirect(`/admin/post/${createdPost.id}?created=1`);
}
