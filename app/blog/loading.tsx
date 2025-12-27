const LOADING_ELEMENTS = Array(7).fill(0);

export default function Loading() {
  return (
    <div className="flex flex-row flex-wrap w-screen h-auto">
      {LOADING_ELEMENTS.map((_, index) => (
        <div
          key={index}
          className="bg-darkSecondary m-1 w-96 md:w-1/2 lg:w-1/3 h-64 animate-pulse"
        />
      ))}
    </div>
  );
}
