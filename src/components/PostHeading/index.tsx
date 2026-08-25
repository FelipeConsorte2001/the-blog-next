import clsx from 'clsx';
import Link from 'next/link';
type PostHeadingProps = {
  children: React.ReactNode;
  url: string;
  as: 'h1' | 'h2';
};

export default async function PostHeading({
  children,
  url,
  as: Tag,
}: PostHeadingProps) {
  const headingClassesMap = {
    h1: 'text-2xl/tight sm:text-4xl font-extrabold',
    h2: 'text-2xl/tight font-bold',
  };
  return (
    <Tag className={clsx(headingClassesMap[Tag])}>
      <Link className='group-hover:text-slate-600 transition' href={url}>
        {children}
      </Link>
    </Tag>
  );
}
