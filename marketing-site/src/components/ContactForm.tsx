'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle2, Mail, MapPin, MessageCircle, Instagram, Youtube } from 'lucide-react';

const programOptions = [
  'USMLE Step 1',
  'FCPS Part I',
  'NRE',
  'MBBS Third Professional',
  'MBBS Fourth Professional',
  'MBBS Final Professional',
  'General Inquiry',
];

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const empty: FormState = { name: '', email: '', subject: '', message: '' };

export function ContactForm() {
  const [form, setForm] = useState<FormState>(empty);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Please fill in your name, email, and a quick message.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('That email does not look quite right.');
      return;
    }
    setError('');
    setSubmitted(true);
  }

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-28">
            <p className="reveal text-sm font-semibold uppercase tracking-widest text-[#2D939F]">
              Get in touch
            </p>
            <h2 className="reveal mt-3 font-display text-4xl sm:text-5xl font-semibold tracking-tight text-[#1A3B5E]">
              We&apos;d love to hear from you.
            </h2>
            <p className="reveal mt-5 text-lg text-[#5A6E82] leading-relaxed">
              Questions about programs, the app, or partnerships? Send us a
              message and we will reply within one business day.
            </p>

            <div className="reveal mt-9 space-y-4">
              <a href="mailto:hello@conceptstoclinics.com" className="flex items-center gap-4 group">
                <span className="grid place-items-center w-11 h-11 rounded-xl bg-[#E6F2F8] text-[#2D939F] transition-colors group-hover:bg-[#2D939F] group-hover:text-white">
                  <Mail className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-xs text-[#5A6E82]">Email</p>
                  <p className="font-medium text-[#1A3B5E]">hello@conceptstoclinics.com</p>
                </div>
              </a>
              <a href="https://wa.me/923035078387" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <span className="grid place-items-center w-11 h-11 rounded-xl bg-[#E6F2F8] text-[#2D939F] transition-colors group-hover:bg-[#2D939F] group-hover:text-white">
                  <MessageCircle className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-xs text-[#5A6E82]">WhatsApp</p>
                  <p className="font-medium text-[#1A3B5E]">+92 303 5078387</p>
                </div>
              </a>
              <div className="flex items-center gap-4">
                <span className="grid place-items-center w-11 h-11 rounded-xl bg-[#E6F2F8] text-[#2D939F]">
                  <MapPin className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-xs text-[#5A6E82]">Location</p>
                  <p className="font-medium text-[#1A3B5E]">Online · Worldwide</p>
                </div>
              </div>
              <a href="https://www.instagram.com/conceptstoclinics?igsh=MndvZ21xaHhiYWli" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <span className="grid place-items-center w-11 h-11 rounded-xl bg-[#E6F2F8] text-[#2D939F] transition-colors group-hover:bg-[#2D939F] group-hover:text-white">
                  <Instagram className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-xs text-[#5A6E82]">Instagram</p>
                  <p className="font-medium text-[#1A3B5E]">@conceptstoclinics</p>
                </div>
              </a>
              <a href="https://www.youtube.com/@conceptstoclinics" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <span className="grid place-items-center w-11 h-11 rounded-xl bg-[#E6F2F8] text-[#2D939F] transition-colors group-hover:bg-[#2D939F] group-hover:text-white">
                  <Youtube className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-xs text-[#5A6E82]">YouTube</p>
                  <p className="font-medium text-[#1A3B5E]">@conceptstoclinics</p>
                </div>
              </a>
            </div>
          </div>

          <div className="reveal rounded-3xl border border-[#D8E9F1] bg-white p-7 sm:p-9 shadow-xl shadow-[#D8E9F1]/40">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <span className="grid place-items-center w-16 h-16 rounded-full bg-[#E0F4F6] text-[#2D939F]">
                  <CheckCircle2 className="w-8 h-8" />
                </span>
                <h3 className="mt-5 font-display text-2xl font-semibold text-[#1A3B5E]">
                  Thank you, {form.name.split(' ')[0]}!
                </h3>
                <p className="mt-2 max-w-sm text-[#5A6E82]">
                  Your message is on its way. We will get back to you at{' '}
                  <span className="font-medium text-[#1A3B5E]">{form.email}</span>{' '}
                  within one business day.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setForm(empty);
                    setSubmitted(false);
                  }}
                  className="mt-6 text-sm font-medium text-[#2D939F] underline decoration-[#254670] decoration-2 underline-offset-4 hover:text-[#257B85]"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#1A3B5E] mb-1.5">
                      Your name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                      placeholder="Dr. Aftab Ali"
                      className="w-full rounded-xl border border-[#D8E9F1] bg-[#F3F4F6] px-4 py-3 text-[#1A3B5E] placeholder:text-[#5A6E82]/50 focus:border-[#2D939F] focus:ring-2 focus:ring-[#2D939F]/20 focus:outline-none transition"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#1A3B5E] mb-1.5">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      placeholder="you@email.com"
                      className="w-full rounded-xl border border-[#D8E9F1] bg-[#F3F4F6] px-4 py-3 text-[#1A3B5E] placeholder:text-[#5A6E82]/50 focus:border-[#2D939F] focus:ring-2 focus:ring-[#2D939F]/20 focus:outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-[#1A3B5E] mb-1.5">
                    Program of interest
                  </label>
                  <select
                    id="subject"
                    value={form.subject}
                    onChange={(e) => update('subject', e.target.value)}
                    className="w-full rounded-xl border border-[#D8E9F1] bg-[#F3F4F6] px-4 py-3 text-[#1A3B5E] focus:border-[#2D939F] focus:ring-2 focus:ring-[#2D939F]/20 focus:outline-none transition"
                  >
                    <option value="">Choose a program (optional)</option>
                    {programOptions.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#1A3B5E] mb-1.5">
                    Your message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => update('message', e.target.value)}
                    placeholder="Tell us what you need help with..."
                    className="w-full rounded-xl border border-[#D8E9F1] bg-[#F3F4F6] px-4 py-3 text-[#1A3B5E] placeholder:text-[#5A6E82]/50 focus:border-[#2D939F] focus:ring-2 focus:ring-[#2D939F]/20 focus:outline-none transition resize-none"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2.5">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="group w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#2D939F] px-6 py-3.5 text-base font-medium text-white transition-all duration-300 hover:bg-[#257B85] hover:shadow-lg hover:shadow-[#1A3B5E]/20 hover:-translate-y-0.5"
                >
                  Send message
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
