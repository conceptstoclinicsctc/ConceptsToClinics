'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import Link from 'next/link';

const faqs = [
  {
    q: 'What examinations do the programs prepare me for?',
    a: 'Our programs are designed for MBBS Professional Examinations, USMLE Step 1, FCPS Part I, and NRE. Each program follows a defined curriculum with course-specific emphasis according to the requirements of each examination.',
  },
  {
    q: 'How long is the First Aid lecture series?',
    a: 'The complete, system-wise First Aid for the USMLE Step 1 lecture series is delivered in just 150 hours, designed to serve as a primary learning resource and minimize dependence on multiple video resources.',
  },
  {
    q: 'Is personalized mentorship included in every program?',
    a: 'Selected programs include individualized academic mentorship, providing study planning, progress monitoring, performance assessment, and examination guidance. Check each program page for details on what is included.',
  },
  {
    q: 'What devices is the app available on?',
    a: 'Concepts to Clinics is currently available on Android phones and tablets. iOS and web app versions are coming soon — stay tuned for updates.',
  },
  {
    q: 'Do I need prior medical knowledge to start?',
    a: 'Every topic begins with fundamental principles and progresses toward more advanced concepts, ensuring genuine understanding rather than dependence on rote memorization. The curriculum is designed to build from basics to advanced.',
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="reveal border-b border-[#D8E9F1]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-display text-lg font-medium text-[#1A3B5E]">
          {q}
        </span>
        <span
          className={[
            'grid place-items-center shrink-0 w-8 h-8 rounded-full border transition-all duration-300',
            open
              ? 'bg-[#2D939F] border-[#2D939F] text-white rotate-180'
              : 'border-[#D8E9F1] text-[#5A6E82]',
          ].join(' ')}
        >
          {open ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </span>
      </button>
      <div
        className={[
          'grid transition-all duration-500 ease-out',
          open ? 'grid-rows-[1fr] opacity-100 pb-5' : 'grid-rows-[0fr] opacity-0',
        ].join(' ')}
      >
        <p className="overflow-hidden text-[#5A6E82] leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

export function Faq() {
  return (
    <section id="faq" className="py-24 sm:py-32 bg-[#F1F5F9]">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="text-center">
          <p className="reveal text-sm font-semibold uppercase tracking-widest text-[#2D939F]">
            FAQ
          </p>
          <h2 className="reveal mt-3 font-display text-4xl sm:text-5xl font-semibold tracking-tight text-[#1A3B5E]">
            Questions, answered.
          </h2>
        </div>

        <div className="mt-12">
          {faqs.map((f) => (
            <FaqItem key={f.q} {...f} />
          ))}
        </div>

        <p className="reveal mt-10 text-center text-[#5A6E82]">
          Still curious?{' '}
          <Link
            href="/contact"
            className="font-semibold text-[#2D939F] underline decoration-[#254670] decoration-2 underline-offset-4 hover:text-[#257B85]"
          >
            Send us a note
          </Link>{' '}
          — we reply within a day.
        </p>
      </div>
    </section>
  );
}
