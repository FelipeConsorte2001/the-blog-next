import { postRepository } from '@/repositories/post';

type PostsListProps = {
  className?: string;
};
export default async function PostsList({ className = '' }: PostsListProps) {
  const posts = await postRepository.findAll();

  return (
    <div>
      {posts.map(post => {
        return <p key={post.id}>{post.id}</p>;
      })}
    </div>
  );
}
