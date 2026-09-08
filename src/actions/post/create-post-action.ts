'use server';

import { drizzleDb } from '@/db/drizzle';
import { postsTable } from '@/db/drizzle/schemas';
import { makePartialDtoPost } from '@/dto/post/dto';
import { PostCreateSchema } from '@/lib/validation';
import { DtoPost, PostModel } from '@/models/post/post-model';
import { getZodErrorMessages } from '@/utils/get-zod-error-messages';
import { slugFromText } from '@/utils/make-slug-from-text';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { v4 } from 'uuid';

type CreatePostActionState = {
  formState: DtoPost;
  error: string[];
};

export async function createPostAction(
  prevState: CreatePostActionState,
  formData: FormData,
): Promise<CreatePostActionState> {
  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      error: ['Invalid data'],
    };
  }

  const formDataToObj = Object.fromEntries(formData.entries());
  const zodParsedObj = PostCreateSchema.safeParse(formDataToObj);
  console.log(zodParsedObj.error);

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

  await drizzleDb.insert(postsTable).values(newPost);
  revalidateTag('posts', { expire: 0 });

  redirect(`/admin/post/${newPost.id}`);
}
