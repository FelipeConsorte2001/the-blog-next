'use server';

import { getLoginSessionForApi } from '@/lib/login/manage-login';
import { DtoPostForApi } from '@/lib/post/schemas';
import { authenticatedApiRequest } from '@/utils/authenticated-api-request';
import { revalidateTag } from 'next/cache';

export async function deletePostAction(id: string) {
  const isAuthenticated = await getLoginSessionForApi();

  if (!isAuthenticated) {
    return {
      error: 'Do the login in another page',
    };
  }

  if (!id || typeof id !== 'string') {
    return {
      error: 'Invalid data',
    };
  }
  const postResponse = await authenticatedApiRequest<DtoPostForApi>(
    `/post/me/${id}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!postResponse.success) {
    return {
      error: 'Post not found',
    };
  }

  const deletePostResponse = await authenticatedApiRequest<DtoPostForApi>(
    `/post/me/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!deletePostResponse.success) {
    return {
      error: 'Error deleting post',
    };
  }

  revalidateTag('posts', { expire: 0 });
  revalidateTag(`posts-${postResponse.data.slug}`, { expire: 0 });

  return {
    error: '',
  };
}
