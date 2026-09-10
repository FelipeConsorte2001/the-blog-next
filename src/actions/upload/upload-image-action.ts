'use server';

import { verifyLoginSession } from '@/lib/login/manage-login';
import { mkdir, writeFile } from 'fs/promises';
import { extname, resolve } from 'path';

type UploadImageActionResult = {
  url: string;
  error: string;
};
const imageMaxSize = Number(process.env.IMAGE_UPLOAD_MX_SIZE) || 921600;
const imageUploadDirectory = process.env.IMAGE_UPLOAD_DIRECTORY || 'upload';
const imageUrlServer =
  process.env.IMAGE_SERVER_URL || 'http://localhost:3000/uploads';
export async function uploadImageAction(
  formData: FormData,
): Promise<UploadImageActionResult> {
  const makeResult = ({ url = '', error = '' }) => {
    return { url, error };
  };

  const isAuthenticated = await verifyLoginSession();

  if (!isAuthenticated) {
    return makeResult({ error: 'Do the login again' });
  }

  if (!(formData instanceof FormData)) {
    return makeResult({ error: 'Invalid data' });
  }
  const file = formData.get('file');
  if (!(file instanceof File)) {
    return makeResult({ error: 'Invalid data' });
  }
  if (file.size > imageMaxSize) {
    return makeResult({ error: 'Invalid size' });
  }

  if (!file.type.startsWith('image/'))
    return makeResult({ error: 'Invalid data' });

  const imageExtension = extname(file.name);
  const uniqueImageName = `${Date.now()}${imageExtension}`;
  const uploadFullPath = resolve(process.cwd(), 'public', imageUploadDirectory);

  await mkdir(uploadFullPath, { recursive: true });
  const fileArrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(fileArrayBuffer);
  const fileFullPath = resolve(uploadFullPath, uniqueImageName);
  await writeFile(fileFullPath, buffer);
  console.log(`${imageUrlServer}/${uniqueImageName}`);
  return makeResult({ url: `${imageUrlServer}/${uniqueImageName}` });
}
