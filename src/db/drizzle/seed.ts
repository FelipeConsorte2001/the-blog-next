import { PostModel } from '@/models/post/post-model';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { drizzleDb } from '.';
import { postsTable } from './schemas';

const ROOT_DIR = process.cwd();
const JSON_POSTS_FILE = resolve(ROOT_DIR, 'src', 'db', 'seed', 'posts.json');

(async () => {
  const jsonContent = await readFile(JSON_POSTS_FILE, 'utf8');
  const parsedJson = JSON.parse(jsonContent);
  const { posts } = parsedJson;

  const postFiltered = posts?.filter(
    (post: PostModel) => post.published === true,
  );

  try {
    await drizzleDb.delete(postsTable);
    await drizzleDb.insert(postsTable).values(postFiltered);

    console.log(`${postFiltered.length} posts foram salvos na base de dados.`);
  } catch (e) {
    console.log('Ocorreu um erro...');
    console.log(e);
  }
})();
