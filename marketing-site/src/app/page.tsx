import type { Metadata } from 'next';
import { HomePageClient } from '@/sections/HomePage';

export const metadata: Metadata = {
  title: 'Concepts to Clinics — Master Concepts. Excel in Clinics.',
  description:
    'Comprehensive, concept-based medical education designed for MBBS, USMLE, FCPS, and NRE. Integrating the First Aid framework with clinical correlation and examination-focused learning.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return <HomePageClient />;
}
