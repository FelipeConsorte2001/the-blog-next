import { findPublicPostBySlugCached } from '@/lib/queries/public';
import Image from 'next/image';
import PostDate from '../PostDate';
import PostHeading from '../PostHeading';
import { SafeMarkedown } from '../Safe/Markdown';

type SinglePostProps = {
  slug: string;
};

export default async function SinglePost({ slug }: SinglePostProps) {
  const post = await findPublicPostBySlugCached(slug);

  return (
    <article className='mb-16'>
      <header className='gruop flex flex-col gap-4 mb-4'>
        <Image
          className='rounded-xl '
          src={post.coverImageUrl}
          width={1200}
          height={720}
          alt={post.title}
          priority
        />
        <PostHeading url={`/post/${post.slug}`} as='h2'>
          {post.title}
        </PostHeading>
        <p>
          {post.author} | <PostDate dateTime={post.createdAt} />
        </p>
      </header>
      <p className='mb-4 text-xl text-slate-600'>{post.excerpt}</p>
      <SafeMarkedown markdown={post.content} />
    </article>
  );
}
