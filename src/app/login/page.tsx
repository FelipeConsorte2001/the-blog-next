import { LoginForm } from '@/components/LoginForm';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Login',
};

export default async function LoginPage() {
  return <LoginForm />;
}
