'use server';

import { getLoginSessionForApi } from '@/lib/login/manage-login';
import { authenticatedApiRequest } from '@/utils/authenticated-api-request';

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

  const isAuthenticated = await getLoginSessionForApi();

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

  const uploadResponse = await authenticatedApiRequest<{ url: string }>(
    `/upload`,
    {
      method: 'POST',
      body: formData,
    },
  );

  if (!uploadResponse.success)
    return makeResult({ error: uploadResponse.errors[0] });

  const url = `${process.env.IMAGE_SERVER_URL}${uploadResponse.data.url}`;
  return makeResult({ url });
}
