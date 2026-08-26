'use client';
import ErrorMessage from '@/components/ErrorMessage';
import { useEffect } from 'react';
type ErrorProps = {
  error: Error;
};
export default function RootErrorPage({ error }: ErrorProps) {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <ErrorMessage
      pageTitle='Internal Server Error'
      contentTitle='501'
      content='Ocorreu um erro do qual nossa aplicação não conseguiu ser recuperar. Tente novamente mais tarde.'
    />
  );
}
