import type { Metadata } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ScrollProgress } from '@/components/ScrollProgress';
import { ScrollRevealer } from '@/components/ScrollRevealer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  icons: {
    icon: '/app-icon.png',
    shortcut: '/app-icon.png',
    apple: '/app-icon.png',
  },
  title: {
    default: 'Concepts to Clinics — Master Concepts. Excel in Clinics.',
    template: '%s | Concepts to Clinics',
  },
  description:
    'Comprehensive, concept-based medical education designed for MBBS, USMLE, FCPS, and NRE. Integrating the First Aid framework with clinical correlation and examination-focused learning.',
  keywords: [
    'USMLE preparation',
    'FCPS preparation',
    'NRE preparation',
    'MBBS lectures',
    'First Aid USMLE',
    'medical education',
    'concept-based learning',
    'medical courses online',
  ],
  openGraph: {
    title: 'Concepts to Clinics — Master Concepts. Excel in Clinics.',
    description:
      'Comprehensive, concept-based medical education designed for MBBS, USMLE, FCPS, and NRE.',
    type: 'website',
    siteName: 'Concepts to Clinics',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Concepts to Clinics — Master Concepts. Excel in Clinics.',
    description:
      'Comprehensive, concept-based medical education designed for MBBS, USMLE, FCPS, and NRE.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body>
        <ScrollProgress />
        <ScrollRevealer />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
