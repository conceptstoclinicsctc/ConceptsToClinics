import type { Metadata } from 'next';
import { TeamPageClient } from '@/sections/TeamPage';

export const metadata: Metadata = {
  title: 'Faculty & Mentors | Concepts to Clinics',
  description:
    'Meet the faculty and educators behind Concepts to Clinics. Founded by Aftab Ali, MD with Associate Mentor Rohan Lal, MD, featuring top-tier USMLE and FCPS scorers.',
  keywords: [
    'Concepts to Clinics faculty',
    'medical mentors',
    'Aftab Ali MD',
    'Rohan Lal MD',
    'USMLE tutors',
    'FCPS mentorship',
    'concept based medical education',
  ],
  alternates: { canonical: 'https://conceptstoclinics.com/team' },
  openGraph: {
    title: 'Faculty & Mentors | Concepts to Clinics',
    description:
      'Meet the medical educators and mentors at Concepts to Clinics. Top-percentile scorers dedicated to concept-based mastery for USMLE, FCPS, MBBS & NRE.',
    url: 'https://conceptstoclinics.com/team',
  },
};

export default function TeamPage() {
  return <TeamPageClient />;
}
