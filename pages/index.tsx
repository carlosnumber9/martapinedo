import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className={'py-0 px-8'}>
      <main className={'flex flex-col items-center justify-center flex-grow min-h-screen px-0 py-16'}>
        <h1 className={'title'}>
          Welcome to <a href="https://nextjs.org">Next.js 13!</a>
        </h1>

          <Link
            href="/office"
            rel="noopener noreferrer"
          >
            <h2>The office &rarr;</h2>
          </Link>

          <Link
            href="/contact"
            rel="noopener noreferrer"
          >
            <h2>Contact &rarr;</h2>
          </Link>
      </main>

      <footer className={'flex items-center justify-center flex-grow'}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={'h-4 ml-2'}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
