import { services, Service } from './servicesList';

export const Services = () => (
  <div className="flex flex-col justify-around items-center bg-[url('/background.jpg')] w-screen relative mt-10 bg-cover bg-center min-h-screen">
    <h1 className={'text-3xl mt-5'}>Servicios</h1>
    <div className=" flex items-center justify-center gap-5 flex-wrap">
      {services.map(({ id, name, description }: Service) => (
        <div
          key={id}
          className="bg-primary p-10 flex flex-col justify-center items-center bg-opacity-80"
        >
          <span>{name}</span>
          <p>{description}</p>
        </div>
      ))}
    </div>
  </div>
);