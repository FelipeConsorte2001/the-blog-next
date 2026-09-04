'use client';
import { useState } from 'react';
import { Button } from '../Button';
import { ImageUploader } from '../ImageUploader';
import { InputCheckbox } from '../InputCheckbox';
import { InputText } from '../InputText';
import { MarkdownEditor } from '../MarkdownEditor';

export function ManagePostForm() {
  const [content, setContent] = useState('');
  return (
    <form action='' className='mb-16'>
      <div className='flex flex-col gap-6'>
        <InputText labelText='Titulo' placeholder='Digite Titulo' type='text' />
        <InputText labelText='Excerpt' placeholder='Digite o excerpt' />
        <ImageUploader />
        <InputCheckbox labelText='Sobrenome' title='publicado' />

        <InputText
          disabled
          labelText='Conteudo'
          placeholder='Digite o conteudo'
          defaultValue='Olá mundo'
        />
        <MarkdownEditor
          labelText='conteudo'
          disabled={false}
          textAreaName='markdown'
          setValue={setContent}
          value={content}
        />
        <InputText
          disabled
          labelText='Author'
          placeholder='Digite o nome do Author'
        />
        <div className='mt-4'>
          <Button type='submit'>Enviar</Button>
        </div>
      </div>
    </form>
  );
}
