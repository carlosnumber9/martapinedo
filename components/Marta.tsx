import Image from 'next/image';

export const Marta = () => {
  return (
    <div className="absolute top-[calc(5rem+10px)] bottom-0 left-0 w-screen lg:w-1/2 scale-95 origin-bottom">
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
