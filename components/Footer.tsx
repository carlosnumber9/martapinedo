import Image from 'next/image';
import Link from 'next/link';

export const Footer = () => (
  <footer
    className="flex flex-col items-center justify-center py-4 text-center text-gray-400 text-xs"
    aria-label="Footer"
  >
    <span>© Marta Pinedo Sánchez. Todos los derechos reservados.</span>
    <div className="flex flex-row mt-5 items-center">
      <Link
        href={'https://www.linkedin.com/in/marta-pinedo-7a8959195'}
        target="_blank"
      >
        <Image
          src={'/linkedin.png'}
          alt="LinkedIn logo with linking to Marta Pinedo's LinkedIn profile"
          width={40}
          height={40}
          className="mx-2 cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out"
        />
      </Link>
      <Link href={'https://www.ejoabogados.com/'} target="_blank">
        <Image
          src={'/ejo.jpg'}
          alt="EJO law firm logo linking to Marta Pinedo's current company"
          width={50}
          height={50}
          className="mx-2 cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out"
        />
      </Link>
      <Link href={'https://lexgoapp.com/marta-pinedo-i4447'} target="_blank">
        <Image
          src={'/lexgoapp.png'}
          alt="LexGoApp logo linking to Marta Pinedo's LexGoApp profile"
          width={70}
          height={70}
          className="mx-2 cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out"
        />
      </Link>
    </div>
  </footer>
);
