import { Stethoscope, Mail, MessageCircle, Instagram, Youtube } from 'lucide-react';
import Link from 'next/link';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Courses', href: '/courses' },
  { label: 'Team', href: '/team' },
  { label: 'Download & Login', href: '/download' },
  { label: 'Contact Us', href: '/contact' },
];

const socialLinks = [
  { label: 'WhatsApp', icon: MessageCircle, href: 'https://wa.me/923035078387' },
  { label: 'Email', icon: Mail, href: 'mailto:contact@conceptstoclinics.com' },
  { label: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/conceptstoclinics?igsh=MndvZ21xaHhiYWli' },
  { label: 'YouTube', icon: Youtube, href: 'https://www.youtube.com/@conceptstoclinics' },
];

export function Footer() {
  return (
    <footer className="bg-[#1A3B5E] text-white">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <img
                src="/logo.png"
                alt="Concepts to Clinics Logo"
                className="w-10 h-10 object-contain rounded-lg bg-white p-0.5"
              />
              <div>
                <span className="font-display text-lg font-semibold block leading-tight">
                  Concepts to Clinics
                </span>
                <span className="text-xs text-[#2D939F] font-semibold tracking-wide">
                  by Aftab Ali, MD
                </span>
              </div>
            </Link>
            <p className="mt-4 text-sm text-white/70 max-w-xs leading-relaxed">
              Master Concepts. Excel in Clinics.
            </p>
            <p className="mt-2 text-sm text-white/50 max-w-xs leading-relaxed">
              Comprehensive, concept-based medical education designed for MBBS,
              USMLE, FCPS, and NRE.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
              Quick Links
            </p>
            <ul className="mt-4 space-y-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/80 hover:text-[#2D939F] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
              Connect With Us
            </p>
            <ul className="mt-4 space-y-3">
              {socialLinks.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-sm text-white/80 hover:text-[#2D939F] transition-colors"
                  >
                    <s.icon className="w-4 h-4 text-[#2D939F]" />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>&copy; {new Date().getFullYear()} Concepts to Clinics by Aftab Ali. All rights reserved.</p>
          <p>Built for medical learners everywhere.</p>
        </div>
      </div>
    </footer>
  );
}
