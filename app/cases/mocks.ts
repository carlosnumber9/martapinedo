import { Case, SupportedLocale } from 'app/types';

export const CASES_MOCKS: Record<SupportedLocale, Case[]> = {
  es: [
    {
      heading: 'Resolucion contractual',
      caseName: 'Acuerdo extrajudicial para una empresa familiar',
      description: {
        text: 'Marta acompano a una empresa familiar en la resolucion de un conflicto contractual con un proveedor estrategico. El trabajo permitio cerrar un acuerdo equilibrado sin iniciar un procedimiento judicial.',
        html: '<p>Marta acompano a una empresa familiar en la resolucion de un conflicto contractual con un proveedor estrategico. El trabajo permitio cerrar un acuerdo equilibrado sin iniciar un procedimiento judicial.</p>',
      },
      solvedAt: '2025-11-18',
    },
    {
      heading: 'Reclamacion civil',
      caseName: 'Recuperacion de deuda mediante negociacion',
      description: {
        text: 'La estrategia combino analisis documental, comunicacion firme y negociacion progresiva hasta alcanzar un calendario de pago viable para la parte deudora y satisfactorio para el cliente.',
        html: '<p>La estrategia combino analisis documental, comunicacion firme y negociacion progresiva hasta alcanzar un calendario de pago viable para la parte deudora y satisfactorio para el cliente.</p>',
      },
      solvedAt: '2025-07-04',
    },
    {
      heading: 'Procedimiento administrativo',
      caseName: 'Anulacion de una sancion administrativa',
      description: {
        text: 'Tras revisar el expediente, se detectaron defectos de motivacion y prueba. La defensa se centro en esos puntos y consiguio que la administracion estimara las alegaciones presentadas.',
        html: '<p>Tras revisar el expediente, se detectaron defectos de motivacion y prueba. La defensa se centro en esos puntos y consiguio que la administracion estimara las alegaciones presentadas.</p>',
      },
      solvedAt: '2024-12-12',
    },
    {
      heading: 'Contrato mercantil',
      caseName: 'Revision preventiva de acuerdo de colaboracion',
      description: {
        text: 'Marta reviso un acuerdo de colaboracion antes de su firma, ajustando responsabilidades, plazos y causas de terminacion para reducir riesgos futuros entre las partes.',
        html: '<p>Marta reviso un acuerdo de colaboracion antes de su firma, ajustando responsabilidades, plazos y causas de terminacion para reducir riesgos futuros entre las partes.</p>',
      },
      solvedAt: '2024-05-23',
    },
  ],
  en: [
    {
      heading: 'Contract resolution',
      caseName: 'Out-of-court agreement for a family business',
      description: {
        text: 'Marta supported a family business through a contractual dispute with a strategic supplier. The work helped close a balanced agreement without starting court proceedings.',
        html: '<p>Marta supported a family business through a contractual dispute with a strategic supplier. The work helped close a balanced agreement without starting court proceedings.</p>',
      },
      solvedAt: '2025-11-18',
    },
    {
      heading: 'Civil claim',
      caseName: 'Debt recovery through negotiation',
      description: {
        text: 'The strategy combined document analysis, clear communication and progressive negotiation until reaching a payment schedule that was viable for the debtor and satisfactory for the client.',
        html: '<p>The strategy combined document analysis, clear communication and progressive negotiation until reaching a payment schedule that was viable for the debtor and satisfactory for the client.</p>',
      },
      solvedAt: '2025-07-04',
    },
    {
      heading: 'Administrative proceeding',
      caseName: 'Annulment of an administrative penalty',
      description: {
        text: 'After reviewing the file, defects in reasoning and evidence were identified. The defence focused on those points and led the administration to uphold the submitted arguments.',
        html: '<p>After reviewing the file, defects in reasoning and evidence were identified. The defence focused on those points and led the administration to uphold the submitted arguments.</p>',
      },
      solvedAt: '2024-12-12',
    },
    {
      heading: 'Commercial contract',
      caseName: 'Preventive review of a collaboration agreement',
      description: {
        text: 'Marta reviewed a collaboration agreement before signature, adjusting responsibilities, deadlines and termination clauses to reduce future risks between the parties.',
        html: '<p>Marta reviewed a collaboration agreement before signature, adjusting responsibilities, deadlines and termination clauses to reduce future risks between the parties.</p>',
      },
      solvedAt: '2024-05-23',
    },
  ],
};
