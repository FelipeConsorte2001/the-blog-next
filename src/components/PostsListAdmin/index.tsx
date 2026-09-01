import { findAllPostsAdmin } from '@/lib/queries/admin';

export default async function PostsListAdmin() {
  const posts = await findAllPostsAdmin();
  return (
    <div>
      {posts.map(post => {
        return <p key={post.id}>{post.id}</p>;
      })}
    </div>
  );
}
