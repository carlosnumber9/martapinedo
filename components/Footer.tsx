import Image from 'next/image';
import Link from 'next/link';

export const Footer = () => (
  <footer
    className="flex flex-col items-center justify-center py-4 text-center text-gray-400 text-xs"
    aria-label="Footer"
  >
    <span>© Marta Pinedo Sánchez. Todos los derechos reservados.</span>
    <div className="flex flex-row mt-5">
      <Link
        href={'https://www.linkedin.com/in/marta-pinedo-7a8959195'}
        target="_blank"
      >
        <Image
          src={'/linkedin.png'}
          alt="LinkedIn logo with the link to Marta Pinedo LinkedIn profile"
          width={40}
          height={40}
          className="mx-2 cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out"
        />
      </Link>
    </div>
  </footer>
);
