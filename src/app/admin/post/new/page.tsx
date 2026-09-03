import { ManagePostForm } from '@/components/Manage/PostForm';

export const dynamic = 'force-dynamic';

export default async function AdminPostNewPage() {
  return (
    <>
      <ManagePostForm />;
    </>
  );
}
