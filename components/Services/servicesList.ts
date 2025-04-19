export interface Service {
  id: string;
  name: string;
  description: string;
}

export const services: Service[] = [
  {
    id: 'asesoria',
    name: 'Asesoría y Consultoría Legal',
    description:
      'Derecho civil, mercantil y administrativo para ayudarte a tomar decisiones legales con seguridad',
  },
  {
    id: 'redaccion',
    name: 'Revisión y Redacción de Contratos',
    description:
      'Garantizo acuerdos claros y seguros que protejan tus intereses y prevengan conflictos.',
  },
  {
    id: 'representacion',
    name: 'Representación Legal en Litigios',
    description:
      'Defiendo tu caso con compromiso y cercanía, desde la preparación hasta las audiencias.',
  },
  {
    id: 'gestion',
    name: 'Gestión de Procedimientos Administrativos',
    description:
      'Tramito citaciones, sanciones y otros procedimientos para que cumplas con tus obligaciones legales sin complicaciones.',
  },
  {
    id: 'resolucion',
    name: 'Resolución Alternativa de Disputas',
    description:
      'Busco soluciones pacíficas mediante mediación y negociación, evitando el juicio y cuidando las relaciones.',
  },
];
