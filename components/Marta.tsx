import Image from 'next/image';

export const Marta = () => {
  return (
    <div className="absolute bottom-0 left-0 w-screen h-[calc(100vh-5rem)] lg:w-1/2">
      <Image
        className="object-contain object-bottom"
        src="/marta.png"
        alt="Marta Pinedo Sánchez"
        fill
        priority
      />
    </div>
  );
};
