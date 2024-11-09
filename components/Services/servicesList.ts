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
      'Ofrezco asesoramiento personalizado en derecho civil, mercantil y administrativo, ayudando a mis clientes a tomar decisiones informadas en situaciones legales complejas.',
  },
  {
    id: 'redaccion',
    name: 'Revisión y Redacción de Contratos',
    description:
      'Me especializo en la revisión y redacción de contratos, asegurando que cada acuerdo proteja los intereses de mis clientes y prevenga posibles conflictos.',
  },
  {
    id: 'representacion',
    name: 'Representación Legal en Litigios',
    description:
      'Acompaño a mis clientes en cada etapa de su litigio, desde la preparación de documentos hasta la representación en audiencias, con una defensa comprometida y cercana.',
  },
  {
    id: 'gestion',
    name: 'Gestión de Procedimientos Administrativos',
    description:
      'Me encargo de gestionar procedimientos administrativos como citaciones y sanciones, facilitando el cumplimiento de obligaciones legales de manera eficaz.',
  },
  {
    id: 'resolucion',
    name: 'Resolución Alternativa de Disputas',
    description:
      'Ayudo a resolver conflictos a través de la mediación y negociación, buscando soluciones pacíficas que eviten el juicio y preserven relaciones.',
  },
];
