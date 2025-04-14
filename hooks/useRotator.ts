import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';

export const useRotator = () => {
  const [rotation, setRotation] = useState({ rotateX: 0, rotateY: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (isMobile) return;

      const { clientX, clientY } = event;
      const rotateX = -((clientX / window.innerWidth) * 2 - 1) * 15;
      const rotateY = -((clientY / window.innerHeight) * 2 - 1) * -15;
      setRotation({ rotateX, rotateY });
    };

    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
      if (!isMobile) return;

      const beta = event.beta;
      const gamma = event.gamma;

      if (beta !== null && gamma !== null) {
        const rotateX = Math.min(Math.max(gamma, -15), 15);
        const rotateY = Math.min(Math.max(beta - 45, -15), 15);

        setRotation({ rotateX, rotateY: -rotateY });
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
