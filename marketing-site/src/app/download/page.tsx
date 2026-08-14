import type { Metadata } from 'next';
import { DownloadPageClient } from '@/sections/DownloadPage';

export const metadata: Metadata = {
  title: 'Download Android App | Concepts to Clinics Mobile',
  description:
    'Download the official Concepts to Clinics Android app (APK). Access 150+ hours of First Aid medical lectures, system playlists, and auto progress sync anytime, anywhere.',
  keywords: [
    'Concepts to Clinics Android app download',
    'medical education app APK',
    'USMLE Step 1 video app',
    'FCPS Part 1 app download',
  ],
  alternates: { canonical: 'https://conceptstoclinics.com/download' },
  openGraph: {
    title: 'Download Concepts to Clinics Android App',
    description:
      'Access comprehensive medical lectures and First Aid preparation directly on your Android device.',
    url: 'https://conceptstoclinics.com/download',
  },
};

export default function DownloadPage() {
  return <DownloadPageClient />;
}
