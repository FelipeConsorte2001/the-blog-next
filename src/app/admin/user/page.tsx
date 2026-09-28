import { SpinLoader } from '@/components/SpinLoader';
import { UpdateUser } from '@/components/UpdateUser';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export const medata: Metadata = {
  title: 'User Admin',
};
export default async function AdminUserPage() {
  return (
    <Suspense fallback={<SpinLoader className='mb-16' />}>
      <UpdateUser />
    </Suspense>
  );
}
