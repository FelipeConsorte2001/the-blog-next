import { MenuAdmin } from '@/components/MenuAdmin';
import { requireLoginSessionOrRedirectForApi } from '@/lib/login/manage-login';

type AdminPostLayoutProps = {
  children: React.ReactNode;
};
export default async function AdminPostLayout({
  children,
}: Readonly<AdminPostLayoutProps>) {
  await requireLoginSessionOrRedirectForApi();
  return (
    <>
      <MenuAdmin />
      {children}
    </>
  );
}
