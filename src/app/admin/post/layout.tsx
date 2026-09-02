import { MenuAdmin } from '@/components/MenuAdmin';

type AdminPostLayoutProps = {
  children: React.ReactNode;
};
export default function AdminPostLayout({
  children,
}: Readonly<AdminPostLayoutProps>) {
  return (
    <>
      <MenuAdmin />
      {children}
    </>
  );
}
