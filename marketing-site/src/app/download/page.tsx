import type { Metadata } from 'next';
import { DownloadPageClient } from '@/sections/DownloadPage';

export const metadata: Metadata = {
  title: 'Download the App — iOS & Android',
  description:
    'Get Concepts to Clinics on iOS or Android. Access comprehensive medical education lectures for MBBS, USMLE, FCPS, and NRE preparation anytime, anywhere.',
  alternates: { canonical: '/download' },
};

export default function DownloadPage() {
  return <DownloadPageClient />;
}
