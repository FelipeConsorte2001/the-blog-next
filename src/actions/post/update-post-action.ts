'use server';

import { makeDtoPost, makePartialDtoPost } from '@/dto/post/dto';
import { PostUpdateSchema } from '@/lib/validation';
import { DtoPost } from '@/models/post/post-model';
import { postRepository } from '@/repositories/post';
import { getZodErrorMessages } from '@/utils/get-zod-error-messages';
import { revalidateTag } from 'next/cache';

type UpdatePostActionState = {
  formState: DtoPost;
  error: string[];
  sucess?: true;
};

export async function updatePostAction(
  prevState: UpdatePostActionState,
  formData: FormData,
): Promise<UpdatePostActionState> {
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
  const zodParsedObj = PostUpdateSchema.safeParse(formDataToObj);

  if (!zodParsedObj.success) {
    const error = getZodErrorMessages(zodParsedObj.error);
    return {
      error,
      formState: makePartialDtoPost(formDataToObj),
    };
  }

  const validPostData = zodParsedObj.data;
  const newPost = {
    ...validPostData,
  };

  let post;
  try {
    post = await postRepository.update(id, newPost);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        formState: makePartialDtoPost(formDataToObj),
        error: [e.message],
      };
    }
    return {
      formState: makePartialDtoPost(formDataToObj),
      error: ['unknown erro'],
    };
  }
  revalidateTag('posts', { expire: 0 });
  revalidateTag(`posts-${post.slug}`, { expire: 0 });

  return {
    formState: makeDtoPost(post),
    error: [],
    sucess: true,
  };
}
