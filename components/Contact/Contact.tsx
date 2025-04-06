import Image from 'next/image';

export const Contact = () => (
  <div
    className={
      'fixed z-50 bottom-5 right-5 w-20 h-20 flex justify-center items-center rounded-full shadow-contact bg-darkPrimary hover:bg-darkSecondary transition-colors duration-500 ease-in-out cursor-pointer'
    }
  >
    <Image src={'/contact.png'} alt={'Contact'} width={50} height={50} />
  </div>
);
