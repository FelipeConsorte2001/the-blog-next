import PostDate from '../PostDate';
import PostHeading from '../PostHeading';
type PostSummaryProps = {
  postHeadion: 'h1' | 'h2';
  postLink: string;
  createdAt: string;
  title: string;
  excerpt: string;
};
export default async function PostSummary({
  createdAt,
  title,
  postHeadion,
  postLink,
  excerpt,
}: PostSummaryProps) {
  return (
    <div className='flex flex-col gap-4 sm:justify-center'>
      <PostDate dateTime={createdAt} />
      <PostHeading url={postLink} as={postHeadion}>
        {title}
      </PostHeading>
      <p>{excerpt}</p>
    </div>
  );
}
