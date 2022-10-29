import Image from 'next/image'

export default function Home() {
  return (
    <div className={'py-0 px-8'}>
      <main className={'flex flex-col items-center justify-center flex-grow min-h-screen px-0 py-16'}>
        <h1 className={'title'}>
          Welcome to <a href="https://nextjs.org">Next.js 13!</a>
        </h1>

        <p className={'text-2xl leading-normal mx-0 my-16'}>
          Get started by editing{' '}
          <code className={'code'}>app/page.tsx</code>
        </p>

        <div className={'grid'}>
          <a href="https://beta.nextjs.org/docs" className={'card'}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js 13</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={'card'}
          >
            <h2>Examples &rarr;</h2>
            <p>Explore the Next.js 13 playground.</p>
          </a>

          <a
            href="https://vercel.com/templates/next.js/app-directory?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={'card'}
          >
            <h2>Deploy &rarr;</h2>
            <p>Deploy your Next.js site to a public URL with Vercel.</p>
          </a>
        </div>
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
