'use client';

import { ContactForm } from '@/components/ContactForm';
import { Faq } from '@/components/Faq';

export function ContactPageClient() {
  return (
    <div className="pt-20 sm:pt-24">
      <ContactForm />
      <Faq />
    </div>
  );
}
