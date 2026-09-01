'use client';
import { deletePostAction } from '@/actions/post/delete-action';
import { Trash2Icon } from 'lucide-react';
import { useState, useTransition } from 'react';
import { Dialog } from '../Dialog';
type DeletePostButtonProps = {
  title: string;
  id: string;
};
export function DeletePostButton({ title, id }: DeletePostButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [showDialog, setShowDialog] = useState(false);
  async function handlerClick() {
    startTransition(async () => {
      const result = await deletePostAction(id);
      console.log('dek', result);
      setShowDialog(false);
    });
  }
  return (
    <>
      <button
        className='text-red-600 cursor-pointer [&_svg]:w-4 [&_svg]:h-4 hover:scale-120 hover:text-red-700 transition disabled:text-slate-600 disabled:cursor-not-allowed'
        aria-label={`Apagar post: ${title}`}
        title={`Apagar post: ${title}`}
        onClick={() => setShowDialog(true)}
        disabled={isPending}
      >
        <Trash2Icon />
      </button>
      {showDialog && (
        <Dialog
          isVisible={showDialog}
          content={`Tem certeza que deseja apagar o post: ${title}`}
          title={'Apagar Post?'}
          onCancel={() => setShowDialog(false)}
          onConfirm={() => handlerClick()}
          disabled={isPending}
        />
      )}
    </>
  );
}
