import type { Metadata } from 'next';
import { ContactPageClient } from '@/sections/ContactPage';

export const metadata: Metadata = {
  title: 'Contact Us & Student Support | Concepts to Clinics',
  description:
    'Get in touch with Concepts to Clinics for inquiries about USMLE, FCPS, MBBS, or NRE preparation courses. Reach us via email at contact@conceptstoclinics.com or WhatsApp.',
  keywords: [
    'Concepts to Clinics contact',
    'medical mentorship inquiry',
    'USMLE course guidance',
    'FCPS mentorship contact',
  ],
  alternates: { canonical: 'https://conceptstoclinics.com/contact' },
  openGraph: {
    title: 'Contact Us | Concepts to Clinics',
    description:
      'Questions about programs, the app, or personalized mentorship? Send us a message or chat via WhatsApp.',
    url: 'https://conceptstoclinics.com/contact',
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
