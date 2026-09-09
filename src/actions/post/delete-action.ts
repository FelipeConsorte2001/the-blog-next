'use server';

import { postRepository } from '@/repositories/post';
import { revalidateTag } from 'next/cache';

export async function deletePostAction(id: string) {
  if (!id || typeof id !== 'string') {
    return {
      error: 'Invalid data',
    };
  }
  let post;
  try {
    post = await postRepository.delete(id);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return { error: e.message };
    }
    return { error: 'unknown erro' };
  }
  revalidateTag('posts', { expire: 0 });
  revalidateTag(`posts-${post.slug}`, { expire: 0 });
}
