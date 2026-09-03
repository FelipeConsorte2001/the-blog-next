'use client';
import {
  CircleXIcon,
  FileTextIcon,
  HouseIcon,
  MenuIcon,
  PlusIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
export function MenuAdmin() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  const classNameLink =
    '[&>svg]:w-4 [&>svg]:h-4 px-4 flex transition hover:bg-slate-800 items-center justify-start gap-2 h-10 shrink-0 cursor-pointer sm:overflow-visible sm:h-auto';
  const openCloseBtnClasses = `${classNameLink} text-blue-200 italic sm:hidden`;
  return (
    <nav
      className={`bg-slate-900 text-slate-100 rounded-lg flex flex-col overflow-hidden mb-8 sm:flex-row sm:flex-wrap ${!isOpen ? 'h-10 overflow-hidden' : null}`}
    >
      <button
        className={openCloseBtnClasses}
        onClick={() => setIsOpen(s => !s)}
      >
        {!isOpen && (
          <>
            <MenuIcon />
            Menu
          </>
        )}
        {isOpen && (
          <>
            <CircleXIcon />
            Fechar
          </>
        )}
      </button>
      <a href='/' target='_blank' className={classNameLink}>
        <HouseIcon />
        Home
      </a>
      <Link href='/admin/post' className={classNameLink}>
        <FileTextIcon />
        Posts
      </Link>
      <Link href='/admin/post/new' className={classNameLink}>
        <PlusIcon />
        Criar Post
      </Link>
    </nav>
  );
}
