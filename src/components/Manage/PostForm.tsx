'use client';
import { createPostAction } from '@/actions/post/create-post-action';
import { updatePostAction } from '@/actions/post/update-post-action';
import { makePartialDtoPost } from '@/dto/post/dto';
import { DtoPost } from '@/models/post/post-model';
import { useRouter, useSearchParams } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from '../Button';
import { ImageUploader } from '../ImageUploader';
import { InputCheckbox } from '../InputCheckbox';
import { InputText } from '../InputText';
import { MarkdownEditor } from '../MarkdownEditor';
type ManagePostFormUpdateProps = {
  mode: 'update';
  dtoPost: DtoPost;
};
type ManagePostFormCreateProps = {
  mode: 'create';
};
type ManagePostFormProps =
  | ManagePostFormUpdateProps
  | ManagePostFormCreateProps;

export function ManagePostForm(props: ManagePostFormProps) {
  const { mode } = props;

  const searchParams = useSearchParams();
  const created = searchParams.get('created');
  const router = useRouter();

  let dtoPost;
  const actionsMap = {
    update: updatePostAction,
    create: createPostAction,
  };
  if (mode === 'update') {
    dtoPost = props.dtoPost;
  }

  const initialState = {
    formState: makePartialDtoPost(dtoPost),
    error: [],
  };

  const [state, action, isPending] = useActionState(
    actionsMap[mode],
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

  useEffect(() => {
    if (state.sucess) {
      toast.dismiss();
      toast.success('Poste updated successfully');
    }
  }, [state]);
  useEffect(() => {
    if (created === '1') {
      toast.dismiss();
      toast.success('Poste created successfully');
      const url = new URL(window.location.href);
      url.searchParams.delete('created');
      router.replace(url.toString());
    }
  }, [created, router]);

  return (
    <form action={action} className='mb-16'>
      <div className='flex flex-col gap-6'>
        <InputText
          labelText='id'
          name='id'
          placeholder='ID gerado automaticamente'
          type='text'
          defaultValue={formState.id}
          disabled={isPending}
          readOnly
        />

        <InputText
          labelText='Slug'
          name='slug'
          placeholder='Slug gerada automaticamente'
          type='text'
          defaultValue={formState.slug}
          disabled={isPending}
          readOnly
        />
        <InputText
          labelText='Autor'
          name='author'
          placeholder='Digite o nome do autor'
          defaultValue={formState.author}
          type='text'
          disabled={isPending}
        />
        <InputText
          labelText='Titulo'
          placeholder='Digite Titulo'
          type='text'
          name='title'
          defaultValue={formState.title}
          disabled={isPending}
        />
        <InputText
          labelText='Excerpt'
          placeholder='Digite o excerpt'
          name='excerpt'
          defaultValue={formState.excerpt}
          type='text'
          disabled={isPending}
        />
        <MarkdownEditor
          labelText='Conteúdo'
          textAreaName='content'
          setValue={setContent}
          value={content}
          disabled={isPending}
        />
        <ImageUploader disabled={isPending} />

        <InputText
          labelText='Url da imagem de capa'
          placeholder='Digite a url da imagem'
          type='text'
          defaultValue={formState.coverImageUrl}
          disabled={isPending}
          name='coverImageUrl'
        />

        <InputCheckbox
          labelText='Publicar'
          type='checkbox'
          name='published'
          defaultChecked={formState.published}
          disabled={isPending}
        />
        <div className='mt-4'>
          <Button type='submit' disabled={isPending}>
            Enviar
          </Button>
        </div>
      </div>
    </form>
  );
}
