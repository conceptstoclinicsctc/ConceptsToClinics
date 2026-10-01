'use client';

import { useEffect, useState } from 'react';
import { Menu, X, Stethoscope } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useScrolled } from '@/hooks/useScrolled';

const links = [
  { label: 'Home', href: '/' },
  { label: 'Courses', href: '/courses' },
  { label: 'Team', href: '/team' },
  { label: 'Download', href: '/download' },
  { label: 'Contact', href: '/contact' },
];

function isActive(pathname: string | null, href: string) {
  if (!pathname) return false;
  return href === '/' ? pathname === '/' : pathname.startsWith(href);
}

export function Header() {
  const scrolled = useScrolled(40);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={[
        'fixed top-0 inset-x-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-[#E6F2F8]/85 backdrop-blur-md border-b border-[#D8E9F1] py-3'
          : 'bg-transparent py-5',
      ].join(' ')}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <img
            src="/logo.png"
            alt="Concepts to Clinics Logo"
            className="w-10 h-10 object-contain transition-transform duration-500 group-hover:scale-105"
          />
          <span className="font-display text-lg font-semibold tracking-tight text-[#1A3B5E]">
            Concepts to Clinics
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={[
                'nav-underline text-sm font-medium transition-colors',
                isActive(pathname, l.href)
                  ? 'text-[#2D939F]'
                  : 'text-[#5A6E82] hover:text-[#2D939F]',
              ].join(' ')}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/download"
            className="inline-flex items-center rounded-full bg-[#1A3B5E] px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#2D939F] hover:shadow-lg hover:shadow-[#1A3B5E]/15 hover:-translate-y-0.5"
          >
            Download App
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden grid place-items-center w-10 h-10 rounded-full border border-[#D8E9F1] text-[#1A3B5E]"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <div
        className={[
          'md:hidden overflow-hidden transition-all duration-500 ease-out',
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
        ].join(' ')}
      >
        <div className="mx-5 mt-3 rounded-2xl border border-[#D8E9F1] bg-white p-5 shadow-xl shadow-[#D8E9F1]/40">
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={[
                  'rounded-lg px-3 py-3 text-base font-medium transition-colors',
                  isActive(pathname, l.href)
                    ? 'bg-[#E0F4F6] text-[#2D939F]'
                    : 'text-[#5A6E82] hover:bg-[#F1F5F9] hover:text-[#2D939F]',
                ].join(' ')}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/download"
              className="mt-2 inline-flex items-center justify-center rounded-full bg-[#2D939F] px-5 py-3 text-base font-medium text-white"
            >
              Download App
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
