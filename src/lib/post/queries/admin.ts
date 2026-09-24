import { PostModelFromApi } from '@/models/post/post-model';
import { postRepository } from '@/repositories/post';
import { authenticatedApiRequest } from '@/utils/authenticated-api-request';
import { cache } from 'react';

export const findPostByIdAdmin = cache(
  async (id: string) => await postRepository.findById(id),
);

export const findPostByIdFromApiAdmin = cache(async (id: string) => {
  const postResponse = await authenticatedApiRequest<PostModelFromApi>(
    `/post/me/${id}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    },
  );
  return postResponse;
});
export const findAllPostsAdmin = cache(
  async () => await postRepository.findAll(),
);

export const findPostAllFromApiAdmin = cache(async () => {
  const postResponse = await authenticatedApiRequest<PostModelFromApi[]>(
    `/post/me`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    },
  );
  return postResponse;
});
