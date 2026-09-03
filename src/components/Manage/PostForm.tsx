'use client';
import { Button } from '../Button';
import { InputCheckbox } from '../InputCheckbox';
import { InputText } from '../InputText';

export function ManagePostForm() {
  return (
    <form action='' className='mb-16'>
      <div className='flex flex-col gap-6'>
        <InputText labelText='Titulo' placeholder='Digite Titulo' type='text' />
        <InputText labelText='Excerpt' placeholder='Digite o excerpt' />

        <InputCheckbox labelText='Sobrenome' title='publicado' />

        <InputText
          disabled
          labelText='Conteudo'
          placeholder='Digite o conteudo'
          defaultValue='Olá mundo'
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
