const LOADING_ELEMENTS = Array(7).fill(0);

export default function Loading() {
  return (
    <div className="p-8 pt-24 w-screen flex flex-row flex-wrap gap-7 h-auto justify-center items-stretch xl:justify-start">
      {LOADING_ELEMENTS.map((_, index) => (
        <div
          key={index}
          className="bg-darkSecondary/70 w-full md:w-1/2 lg:w-1/3 h-64 animate-pulse"
        />
      ))}
    </div>
  );
}
