import { findAllPublicPostsFromApiCached } from '@/lib/post/queries/public';
import PostCoverImage from '../PostCoverImage';
import PostSummary from '../PostSummary';

export default async function PostsList() {
  const postsRes = await findAllPublicPostsFromApiCached();

  if (!postsRes.success) return null;

  const posts = postsRes.data;

  if (posts.length <= 0) return null;

  return (
    <div className='grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 lg:grid-cols-3'>
      {posts.slice(1).map(post => {
        const postLink = `/post/${post.slug}`;
        return (
          <div key={post.id} className='flex flex-col group gap-4'>
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
              postHeadion='h2'
              postLink={postLink}
              title={post.title}
              createdAt={post.createdAt}
              excerpt={post.excerpt}
            />
          </div>
        );
      })}
    </div>
  );
}
