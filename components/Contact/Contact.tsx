import Image from 'next/image';

export const Contact = () => (
  <div
    className={
      'fixed bottom-5 right-5 w-20 h-20 flex justify-center items-center rounded-full shadow-contact bg-primary'
    }
  >
    <Image src={'/contact.png'} alt={'Contact'} width={50} height={50} />
  </div>
);
