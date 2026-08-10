'use client';

import { ContactForm } from '@/components/ContactForm';
import { Faq } from '@/components/Faq';

export function ContactPageClient() {
  return (
    <div className="pt-16 sm:pt-20">
      <ContactForm />
      <Faq />
    </div>
  );
}
