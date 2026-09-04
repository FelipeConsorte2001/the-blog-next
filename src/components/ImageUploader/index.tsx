'use client';

import { uploadImageAction } from '@/actions/upload/upload-image-action';
import { IMAGE_UPLOAD_MX_SIZE } from '@/lib/constantes';
import { ImageUpIcon } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState, useTransition } from 'react';
import { toast } from 'react-toastify';
import { Button } from '../Button';

export function ImageUploader() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUplaoding, startTransition] = useTransition();
  const [imgUrl, setImgUrl] = useState<string>('');
  function handleChooseFile() {
    if (!fileInputRef.current) return;

    fileInputRef.current.click();
  }
  function handleChange() {
    toast.dismiss();
    if (!fileInputRef.current) {
      setImgUrl('');
      return;
    }
    const fileInput = fileInputRef.current;
    const file = fileInput.files?.[0];

    if (!file) {
      setImgUrl('');
      return;
    }

    if (file.size > IMAGE_UPLOAD_MX_SIZE) {
      toast.error(
        `Imagem muito grande. Max.: ${IMAGE_UPLOAD_MX_SIZE / 1024}KB.`,
      );
      fileInput.value = '';
      setImgUrl('');

      return;
    }
    const formData = new FormData();
    formData.append('file', file);

    startTransition(async () => {
      const result = await uploadImageAction(formData);
      if (result.error) {
        toast.error(result.error);
        fileInput.value = '';
        setImgUrl('');
        return;
      }
      setImgUrl(result.url);
      toast.success('Imagem enviada');
    });

    fileInput.value = '';
  }

  return (
    <div className='flex flex-col py-4'>
      <Button onClick={handleChooseFile} type='button' disabled={isUplaoding}>
        <ImageUpIcon />
        Enviar Imagem
      </Button>
      {!!imgUrl && (
        <div className='flex flex-col gap-4'>
          <p>
            <b>URL:</b> {imgUrl}
          </p>
          <Image
            className='rounded'
            src={imgUrl}
            alt='Image carregada'
            width={1200}
            height={720}
            unoptimized
          />
        </div>
      )}
      <input
        onChange={handleChange}
        type='file'
        ref={fileInputRef}
        className='hidden'
        name='file'
        accept='image/*'
      />
    </div>
  );
}
