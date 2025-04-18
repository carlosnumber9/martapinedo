import { PageTransition } from './Transition';

export const Loader = () => (
  <PageTransition>
    <div className="flex items-center justify-center h-screen bg-darkPrimary">
      <div className="flex items-center justify-center space-x-2">
        <div className="w-4 h-4 rounded-full animate-pulse bg-white/70"></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-white/70"></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-white/70"></div>
      </div>
    </div>
  </PageTransition>
);
