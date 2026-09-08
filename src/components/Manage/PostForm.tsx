'use client';
import { createPostAction } from '@/actions/post/create-post-action';
import { makePartialDtoPost } from '@/dto/post/dto';
import { DtoPost } from '@/models/post/post-model';
import { useActionState, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from '../Button';
import { ImageUploader } from '../ImageUploader';
import { InputCheckbox } from '../InputCheckbox';
import { InputText } from '../InputText';
import { MarkdownEditor } from '../MarkdownEditor';
type ManagePostFormProps = {
  dtoPost?: DtoPost;
};
export function ManagePostForm({ dtoPost }: ManagePostFormProps) {
  const initialState = {
    formState: makePartialDtoPost(dtoPost),
    error: [],
  };

  const [state, action, isPending] = useActionState(
    createPostAction,
    initialState,
  );
  const { formState } = state;
  const [content, setContent] = useState(formState.content);

  useEffect(() => {
    if (state.error.length > 0) {
      toast.dismiss();
      state.error.forEach(error => toast.error(error));
    }
  }, [state.error]);
  return (
    <form action={action} className='mb-16'>
      <div className='flex flex-col gap-6'>
        <InputText
          labelText='Autor'
          name='author'
          placeholder='Digite o nome do autor'
          defaultValue={formState.author}
          type='text'
        />
        <InputText
          labelText='Titulo'
          placeholder='Digite Titulo'
          type='text'
          name='title'
          defaultValue={formState.title}
        />
        <InputText
          labelText='Excerpt'
          placeholder='Digite o excerpt'
          name='excerpt'
          defaultValue={formState.excerpt}
          type='text'
        />
        <MarkdownEditor
          labelText='Conteúdo'
          disabled={false}
          textAreaName='content'
          setValue={setContent}
          value={content}
        />
        <ImageUploader />

        <InputText
          labelText='Url da imagem de capa'
          placeholder='Digite a url da imagem'
          type='text'
          defaultValue={formState.coverImageUrl}
          name='coverImageUrl'
        />

        <InputCheckbox
          labelText='Publicar'
          type='checkbox'
          name='published'
          defaultChecked={formState.published}
        />
        <div className='mt-4'>
          <Button type='submit'>Enviar</Button>
        </div>
      </div>
    </form>
  );
}
