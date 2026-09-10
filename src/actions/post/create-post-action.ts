'use server';

import { makePartialDtoPost } from '@/dto/post/dto';
import { verifyLoginSession } from '@/lib/login/manage-login';
import { PostCreateSchema } from '@/lib/post/validation';
import { DtoPost, PostModel } from '@/models/post/post-model';
import { postRepository } from '@/repositories/post';
import { getZodErrorMessages } from '@/utils/get-zod-error-messages';
import { slugFromText } from '@/utils/make-slug-from-text';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { v4 } from 'uuid';

type CreatePostActionState = {
  formState: DtoPost;
  error: string[];
  sucess?: true;
};

export async function createPostAction(
  prevState: CreatePostActionState,
  formData: FormData,
): Promise<CreatePostActionState> {
  const isAuthenticated = await verifyLoginSession();
  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      error: ['Invalid data'],
    };
  }

  const formDataToObj = Object.fromEntries(formData.entries());
  const zodParsedObj = PostCreateSchema.safeParse(formDataToObj);

  if (!isAuthenticated) {
    return {
      formState: makePartialDtoPost(formDataToObj),
      error: ['Do the login in another page'],
    };
  }

  if (!zodParsedObj.success) {
    const error = getZodErrorMessages(zodParsedObj.error);
    return {
      error,
      formState: makePartialDtoPost(formDataToObj),
    };
  }

  const validPostData = zodParsedObj.data;

  const timeCreated = new Date().toISOString();
  const newPost: PostModel = {
    ...validPostData,
    createdAt: timeCreated,
    updatedAt: timeCreated,
    id: v4(),
    slug: slugFromText(validPostData.title),
  };

  try {
    await postRepository.create(newPost);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        formState: newPost,
        error: [e.message],
      };
    }
    return {
      formState: newPost,
      error: ['unknown erro'],
    };
  }
  revalidateTag('posts', { expire: 0 });

  redirect(`/admin/post/${newPost.id}?created=1`);
}
