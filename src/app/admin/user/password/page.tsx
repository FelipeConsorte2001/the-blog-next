import { SpinLoader } from '@/components/SpinLoader';
import { UpdatePasswordForm } from '@/components/UpdateUserPassword';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export const medata: Metadata = {
  title: 'Trocar Senha',
};
export default async function UpdatePassword() {
  return (
    <Suspense fallback={<SpinLoader className='mb-16' />}>
      <UpdatePasswordForm />
    </Suspense>
  );
}
