import { findAllPostsAdmin } from '@/lib/queries/admin';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const medata: Metadata = {
  title: 'Title Admin',
};
export default async function PostAdminPage() {
  const posts = await findAllPostsAdmin();
  return (
    <div>
      {posts.map(post => {
        return <p key={post.id}>{post.id}</p>;
      })}
    </div>
  );
}
