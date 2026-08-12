'use client';

import { Hero } from '@/components/Hero';
import { Marquee } from '@/components/Marquee';
import { About } from '@/components/About';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { Founder } from '@/components/Founder';
import { DemoLecture } from '@/components/DemoLecture';
import { Methodology } from '@/components/Methodology';
import { Programs } from '@/components/Programs';
import { CtaBanner } from '@/components/CtaBanner';

export function HomePageClient() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <WhyChooseUs />
      <Founder />
      <DemoLecture />
      {/* <Methodology /> */}
      <Programs />
      <CtaBanner />
    </>
  );
}
