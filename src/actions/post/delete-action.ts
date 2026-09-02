'use server';

import { drizzleDb } from '@/db/drizzle';
import { postsTable } from '@/db/drizzle/schemas';
import { postRepository } from '@/repositories/post';
import { eq } from 'drizzle-orm';
import { revalidateTag } from 'next/cache';

export async function deletePostAction(id: string) {
  if (!id || typeof id !== 'string') {
    return {
      error: 'Invalid data',
    };
  }
  const post = await postRepository.findById(id).catch(() => undefined);
  if (!post)
    return {
      error: 'Invalid data',
    };

  await drizzleDb.delete(postsTable).where(eq(postsTable.id, id));
  revalidateTag('posts', { expire: 0 });
  revalidateTag(`posts-${post.slug}`, { expire: 0 });
}
