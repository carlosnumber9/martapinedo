import { VideoContainer } from 'components/VideoContainer/VideoContainer';
import { services, Service } from './servicesList';

export const Services = () => (
  <VideoContainer>
    <h2 className="text-3xl mt-5 ml-5 self-start">Servicios</h2>
    <hr className="ml-5 mr-5 self-stretch border-white/20" />
    <div className=" flex items-center justify-center gap-5 flex-wrap mt-5">
      {services.map(({ id, name, description }: Service) => (
        <div
          key={id}
          className="bg-darkSecondary p-10 flex flex-col justify-center items-center bg-opacity-80 sm:w-3/4 md:w-2/5 lg:w-1/4 gap-5 mx-5"
        >
          <h2 className="text-xl text-center">{name}</h2>
          <p>{description}</p>
        </div>
      ))}
    </div>
  </VideoContainer>
);
