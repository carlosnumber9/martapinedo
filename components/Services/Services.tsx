import { services, Service } from './servicesList';

export const Services = () => (
  <div className="w-screen h-[100vh] relative mt-10 bg-[url('/background.jpg')] bg-cover bg-center min-h-screen flex items-center justify-center gap-5">
    {services.map(({ id, name, description }: Service) => (
      <div
        key={id}
        className="bg-primary p-10 flex flex-col justify-center items-center"
      >
        <span>{name}</span>
        <p>{description}</p>
      </div>
    ))}
  </div>
);
