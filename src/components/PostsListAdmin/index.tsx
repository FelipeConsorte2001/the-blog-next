import { findAllPostsAdmin } from '@/lib/queries/admin';
import clsx from 'clsx';
import Link from 'next/link';
import { DeletePostButton } from '../DeletePostButton';

export default async function PostsListAdmin() {
  const posts = await findAllPostsAdmin();
  return (
    <div className='mb-16'>
      {posts.map(post => {
        return (
          <div
            key={post.id}
            className={clsx(
              'p-2',
              !post.published && 'bg-slate-300',
              'flex gap-2 items-center justify-between',
            )}
          >
            <Link href={`/admin/post/${post.id}`}>{post.title}</Link>
            {!post.published && (
              <span className='text-sx text-slate-600 italic'>
                (Não Publicado)
              </span>
            )}
            <DeletePostButton title={post.title} id={post.id} />
          </div>
        );
      })}
    </div>
  );
}
