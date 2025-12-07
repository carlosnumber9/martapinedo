import { Metadata } from 'next';
import { ContactForm } from 'components';

export const metadata: Metadata = {
  title: 'Contacto | Marta Pinedo Sánchez',
  description: 'Página de contacto de Marta Pinedo Sánchez',
};

export default function ContactPage() {
  return <ContactForm />;
}