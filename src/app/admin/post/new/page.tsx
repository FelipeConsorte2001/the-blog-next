import { Button } from '@/components/Button';
import { BugIcon } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminPostNewPage() {
  return (
    <div className='flex gap-4 items-center'>
      <Button size='sm' variant='danger'>
        <BugIcon />
        Confirm
      </Button>
      <Button size='md' variant='default'>
        <BugIcon />
        Confirm
      </Button>
      <Button size='lg' variant='ghost'>
        <BugIcon />
        Confirm
      </Button>
      <Button size='lg' variant='ghost' disabled>
        <BugIcon />
        Confirm
      </Button>
    </div>
  );
}
