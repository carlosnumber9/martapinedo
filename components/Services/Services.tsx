import { services, Service } from './servicesList';

export const Services = () => (
  <div className="flex flex-col justify-around items-center bg-[url('/background.jpg')] w-screen relative bg-cover bg-center pt-5 pb-5 gap-10">
    <h1 className={'text-3xl mt-5'}>Servicios</h1>
    <div className=" flex items-center justify-center gap-5 flex-wrap">
      {services.map(({ id, name, description }: Service) => (
        <div
          key={id}
          className="bg-darkSecondary p-10 flex flex-col justify-center items-center bg-opacity-80 sm:w-3/4 md:w-2/5 lg:w-1/4 gap-5 mx-5"
        >
          <h2 className="text-xl text-center">{name}</h2>
          <p className="text-justify">{description}</p>
        </div>
      ))}
    </div>
  </div>
);
