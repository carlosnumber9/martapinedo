export const formatDate = (publishDate: Date): string => {
  const now = new Date();
  const diffInMs = now.getTime() - publishDate.getTime();
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

  if (diffInHours < 24) {
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return `hace ${diffInMinutes} ${diffInMinutes === 1 ? 'minuto' : 'minutos'}`;
    }
    if (diffInHours === 1) {
      return 'hace 1 hora';
    }
    return `hace ${diffInHours} horas`;
  }

  if (diffInHours >= 24 && diffInHours < 48) {
    return 'ayer';
  }

  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    ...(publishDate.getFullYear() !== now.getFullYear() && { year: 'numeric' }),
  };

  return `el ${new Intl.DateTimeFormat('es-ES', options).format(publishDate)}`;
};
