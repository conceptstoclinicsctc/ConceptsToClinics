import type { Metadata } from 'next';
import { CoursesPageClient } from '@/sections/CoursesPage';

export const metadata: Metadata = {
  title: 'Course Catalog — Browse All Programs',
  description:
    'Explore every Concepts to Clinics program: USMLE Step 1, FCPS Part I, NRE, and MBBS Professional courses. Full details on duration, topics, and curriculum.',
  alternates: { canonical: '/courses' },
};

export default function CoursesPage() {
  return <CoursesPageClient />;
}
