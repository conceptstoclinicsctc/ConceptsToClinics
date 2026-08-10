import type { Metadata } from 'next';
import { ContactPageClient } from '@/sections/ContactPage';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Questions about programs, the app, or partnerships? Send us a message and we will reply within one business day.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
