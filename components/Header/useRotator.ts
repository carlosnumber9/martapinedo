import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';

export const useRotator = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (isMobile) return;

      const { clientX, clientY } = event;
      const x = -((clientX / window.innerWidth) * 2 - 1) * 15;
      const y = -((clientY / window.innerHeight) * 2 - 1) * -15;
      setRotation({ x, y });
    };

    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
      if (!isMobile) return;

      const beta = event.beta;
      const gamma = event.gamma;

      if (beta !== null && gamma !== null) {
        const x = Math.min(Math.max(gamma, -15), 15);
        const y = Math.min(Math.max(beta - 45, -15), 15);

        setRotation({ x, y: -y });
      }
    };

    let touchHandler: (() => void) | null = null;

    if (isMobile) {
      touchHandler = () => {
        document.removeEventListener('touchstart', touchHandler!);
      };
      document.addEventListener('touchstart', touchHandler);
    } else {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
      if (touchHandler) {
        document.removeEventListener('touchstart', touchHandler);
      }
    };
  }, []);

  return rotation;
};
