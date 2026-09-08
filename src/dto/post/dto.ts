import { DtoPost, PostModel } from '@/models/post/post-model';

export const makePartialDtoPost = (post?: Partial<PostModel>): DtoPost => {
  return {
    id: post?.id || '' || '',
    slug: post?.slug || '',
    title: post?.title || '',
    excerpt: post?.excerpt || '',
    author: post?.author || '',
    content: post?.content || '',
    coverImageUrl: post?.coverImageUrl || '',
    createdAt: post?.createdAt || '',
    published: post?.published || false,
  };
};

export const makeDtoPost = (post: PostModel): DtoPost => {
  return makePartialDtoPost(post);
};
