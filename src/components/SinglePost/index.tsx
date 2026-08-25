import { findPostBySlugCached } from '@/lib/queries';

type SinglePostProps = {
  slug: string;
};

export default async function SinglePost({ slug }: SinglePostProps) {
  const post = await findPostBySlugCached(slug);

  return <p>{post.title}</p>;
}
