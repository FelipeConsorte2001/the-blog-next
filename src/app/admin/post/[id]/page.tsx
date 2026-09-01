export const dynamic = 'force-dynamic';

type AdminPostIdPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PostAdminIdPage({
  params,
}: AdminPostIdPageProps) {
  const { id } = await params;
  return <div>id page{id}</div>;
}
