import { ManagePostForm } from '@/components/Manage/PostForm';
import { makeDtoPost } from '@/dto/post/dto';
import { findPostByIdAdmin } from '@/lib/queries/admin';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

type AdminPostIdPageProps = {
  params: Promise<{
    id: string;
  }>;
};
export const metadata: Metadata = {
  title: 'Editar post',
};

export default async function PostAdminIdPage({
  params,
}: AdminPostIdPageProps) {
  const { id } = await params;
  const post = await findPostByIdAdmin(id);

  if (!post) notFound();

  const dtoPost = makeDtoPost(post);
  return (
    <>
      <div className='flex flex-col gap-6'>
        <h1 className='text-xl font-extrabold'>Editar post</h1>
        <ManagePostForm dtoPost={dtoPost} mode='update' />
      </div>
    </>
  );
}
