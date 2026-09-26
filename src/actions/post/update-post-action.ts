'use server';

import { getLoginSessionForApi } from '@/lib/login/manage-login';
import {
  DtoPostForApi,
  DtoPostForApiSchema,
  UpdatePostForApiSchema,
} from '@/lib/post/schemas';
import { authenticatedApiRequest } from '@/utils/authenticated-api-request';
import { getZodErrorMessages } from '@/utils/get-zod-error-messages';
import { revalidateTag } from 'next/cache';

type UpdatePostActionState = {
  formState: DtoPostForApi;
  error: string[];
  sucess?: true;
};

export async function updatePostAction(
  prevState: UpdatePostActionState,
  formData: FormData,
): Promise<UpdatePostActionState> {
  const isAuthenticated = await getLoginSessionForApi();
  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      error: ['Invalid data'],
    };
  }

  const id = formData.get('id')?.toString() || '';

  if (!id || typeof id !== 'string') {
    return {
      formState: prevState.formState,
      error: ['Invalid data'],
    };
  }

  const formDataToObj = Object.fromEntries(formData.entries());
  const zodParsedObj = UpdatePostForApiSchema.safeParse(formDataToObj);

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
  const updatePostResponse = await authenticatedApiRequest<DtoPostForApi>(
    `/post/me/${id}`,
    {
      method: 'PATCH',
      body: JSON.stringify(newPost),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!updatePostResponse.success) {
    return {
      formState: DtoPostForApiSchema.parse(formDataToObj),
      error: updatePostResponse.errors,
    };
  }

  const post = updatePostResponse.data;

  revalidateTag('posts', {});
  revalidateTag(`post-${post.slug}`, {});

  return {
    formState: DtoPostForApiSchema.parse(post),
    error: [],
    sucess: true,
  };
}
