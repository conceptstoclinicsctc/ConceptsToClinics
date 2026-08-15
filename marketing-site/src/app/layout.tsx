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
  metadataBase: new URL('https://conceptstoclinics.com'),
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  title: {
    default: 'Concepts to Clinics | USMLE, FCPS, MBBS & NRE Medical Preparation',
    template: '%s | Concepts to Clinics',
  },
  description:
    'Master medical concepts & excel in clinical exams. First Aid-integrated lecture series, clinical correlations, and structured mentorship for USMLE Step 1, FCPS Part 1, MBBS & NRE by Dr. Aftab Ali.',
  keywords: [
    'USMLE Step 1 preparation',
    'FCPS Part 1 course',
    'NRE medical exam',
    'MBBS online lectures',
    'First Aid USMLE video lectures',
    'concept based medical education',
    'Dr. Aftab Ali MBBS',
    'medical student mentorship',
    'high yield clinical medical lectures',
    'Concepts to Clinics app',
  ],
  authors: [{ name: 'Dr. Aftab Ali', url: 'https://www.linkedin.com/in/aftab-ali-b943bb182' }],
  creator: 'Concepts to Clinics',
  publisher: 'Concepts to Clinics',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://conceptstoclinics.com',
  },
  openGraph: {
    title: 'Concepts to Clinics | USMLE, FCPS, MBBS & NRE Medical Preparation',
    description:
      'Structured First Aid-integrated medical lectures and 1-on-1 mentorship connecting basic sciences to clinical practice. Founded by Dr. Aftab Ali.',
    url: 'https://conceptstoclinics.com',
    siteName: 'Concepts to Clinics',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 800,
        alt: 'Concepts to Clinics Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Concepts to Clinics | USMLE, FCPS, MBBS & NRE Medical Preparation',
    description:
      'Structured First Aid-integrated medical lectures and expert mentorship connecting basic concepts to clinical scenarios.',
    images: ['/logo.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Concepts to Clinics',
    url: 'https://conceptstoclinics.com',
    logo: 'https://conceptstoclinics.com/logo.png',
    description:
      'Comprehensive, concept-based medical education platform designed for USMLE, FCPS, MBBS, and NRE.',
    founder: {
      '@type': 'Person',
      name: 'Dr. Aftab Ali',
      jobTitle: 'Founder & Lead Instructor',
      sameAs: 'https://www.linkedin.com/in/aftab-ali-b943bb182',
    },
    sameAs: [
      'https://www.linkedin.com/in/aftab-ali-b943bb182',
      'https://www.instagram.com/conceptstoclinics',
      'https://www.youtube.com/@conceptstoclinics',
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
