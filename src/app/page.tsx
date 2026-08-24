import Container from '@/components/Container';
import Header from '@/components/Header';
import PostsList from '@/components/PostsList';
import { SpinLoader } from '@/components/SpinLoader';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function HomePage() {
  return (
    <Container>
      <Header />

      <section className='grid grid-cols-1 gap-8 mb-16'>
        <Link href={'#'}>
          <Image
            src={'/images/bryen_0.png'}
            width={1200}
            height={720}
            alt='Título do post'
          />
        </Link>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente rem
          dolore ex animi soluta ullam, reiciendis id debitis saepe facere
          quidem voluptatum labore aspernatur? Quo praesentium consectetur quas
          laborum aperiam?
        </div>
      </section>

      <Suspense fallback={<SpinLoader />}>
        <PostsList />
      </Suspense>
    </Container>
  );
}
