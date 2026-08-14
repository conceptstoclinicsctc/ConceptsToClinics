import type { Metadata } from 'next';
import { CoursesPageClient } from '@/sections/CoursesPage';

export const metadata: Metadata = {
  title: 'Medical Courses & Programs | USMLE, FCPS, MBBS & NRE',
  description:
    'Explore structured First Aid-integrated medical preparation courses. Complete syllabus, system-wise lectures, and 1-on-1 mentorship for USMLE Step 1, FCPS Part 1, MBBS & NRE.',
  keywords: [
    'USMLE Step 1 course',
    'FCPS Part 1 preparation',
    'MBBS third year lectures',
    'MBBS final year course',
    'NRE medical preparation',
    'First Aid medical lectures',
  ],
  alternates: { canonical: 'https://conceptstoclinics.com/courses' },
  openGraph: {
    title: 'Medical Courses & Programs | Concepts to Clinics',
    description:
      'Explore structured First Aid-integrated medical preparation courses for USMLE Step 1, FCPS Part 1, MBBS, and NRE.',
    url: 'https://conceptstoclinics.com/courses',
  },
};

export default function CoursesPage() {
  return <CoursesPageClient />;
}
