'use server';

import {
  IMAGE_SERVER_URL,
  IMAGE_UPLOAD_DIRECTORY,
  IMAGE_UPLOAD_MX_SIZE,
} from '@/lib/constantes';
import { mkdir, writeFile } from 'fs/promises';
import { extname, resolve } from 'path';

type UploadImageActionResult = {
  url: string;
  error: string;
};

export async function uploadImageAction(
  formData: FormData,
): Promise<UploadImageActionResult> {
  const makeResult = ({ url = '', error = '' }) => {
    return { url, error };
  };
  if (!(formData instanceof FormData)) {
    return makeResult({ error: 'Invalid data' });
  }
  const file = formData.get('file');
  if (!(file instanceof File)) {
    return makeResult({ error: 'Invalid data' });
  }
  if (file.size > IMAGE_UPLOAD_MX_SIZE) {
    return makeResult({ error: 'Invalid size' });
  }

  if (!file.type.startsWith('image/'))
    return makeResult({ error: 'Invalid data' });

  const imageExtension = extname(file.name);
  const uniqueImageName = `${Date.now()}${imageExtension}`;
  const uploadFullPath = resolve(
    process.cwd(),
    'public',
    IMAGE_UPLOAD_DIRECTORY,
  );

  await mkdir(uploadFullPath, { recursive: true });
  const fileArrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(fileArrayBuffer);
  const fileFullPath = resolve(uploadFullPath, uniqueImageName);
  await writeFile(fileFullPath, buffer);
  console.log(`${IMAGE_SERVER_URL}/${uniqueImageName}`);
  return makeResult({ url: `${IMAGE_SERVER_URL}/${uniqueImageName}` });
}
