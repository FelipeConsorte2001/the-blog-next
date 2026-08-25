import { findAllPublicPostsCached } from '@/lib/queries';
import PostCoverImage from '../PostCoverImage';
import PostSummary from '../PostSummary';

export default async function PostFeatured() {
  const posts = await findAllPublicPostsCached();
  const post = posts[0];
  const postLink = `/post/${post.slug}`;
  return (
    <section className='grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group'>
      <PostCoverImage
        linkProps={{
          href: postLink,
        }}
        imageProps={{
          width: 1200,
          height: 720,
          src: post.coverImageUrl,
          alt: post.title,
          priority: true,
        }}
      />
      <PostSummary
        postHeadion='h1'
        postLink={postLink}
        title={post.title}
        createdAt={post.createdAt}
        excerpt={post.excerpt}
      />
    </section>
  );
}
