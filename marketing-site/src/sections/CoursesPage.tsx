'use client';

import { useState } from 'react';
import { programs } from '@/data/courses';
import Link from 'next/link';
import {
  ArrowRight,
  Clock,
  BookOpen,
  ShieldCheck,
} from 'lucide-react';

const tags = ['All', 'USMLE', 'FCPS', 'MBBS'];

export function CoursesPageClient() {
  const [activeTag, setActiveTag] = useState('All');

  const filtered =
    activeTag === 'All'
      ? programs
      : programs.filter((c) => c.tag === activeTag);

  return (
    <div className="pt-20 sm:pt-24">
      {/* Header & Courses Section */}
      <section className="pt-8 pb-24 sm:pt-12 sm:pb-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="max-w-3xl">
            <p className="reveal text-sm font-semibold uppercase tracking-widest text-[#2D939F]">
              Program Catalog
            </p>
            <h1 className="reveal mt-3 font-display text-4xl sm:text-5xl font-semibold tracking-tight text-[#1A3B5E]">
              Comprehensive Medical Courses.
            </h1>
            <p className="reveal mt-4 text-lg text-[#5A6E82] leading-relaxed">
              Explore our structured First Aid–integrated courses with personalized mentorship.
              Click any course to view full syllabus, modules, and mentorship details.
            </p>
          </div>

          {/* Filter Category Pills */}
          <div className="reveal mt-8 mb-8 flex flex-wrap gap-2.5">
            {tags.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setActiveTag(t)}
                className={[
                  'rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300',
                  activeTag === t
                    ? 'bg-[#2D939F] text-white shadow-md shadow-[#2D939F]/20'
                    : 'bg-white border border-[#D8E9F1] text-[#5A6E82] hover:border-[#2D939F] hover:text-[#2D939F]',
                ].join(' ')}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Course Cards Container */}
          <div className="flex flex-col gap-10 sm:gap-12">
            {filtered.map((c) => (
              <article
                key={c.id}
                className="reveal is-visible grid lg:grid-cols-[auto_1fr] gap-6 lg:gap-10 rounded-3xl border border-[#D8E9F1] bg-white p-7 sm:p-10 transition-all duration-300 hover:shadow-xl hover:shadow-[#D8E9F1]/50"
              >
                <div className="flex lg:flex-col items-center lg:items-start gap-4">
                  <span className="grid place-items-center w-16 h-16 rounded-2xl bg-[#E6F2F8] text-[#2D939F] shrink-0">
                    <c.icon className="w-8 h-8" strokeWidth={2} />
                  </span>
                  <span className="inline-flex items-center justify-center rounded-full bg-[#D8E9F1] px-3.5 py-1.5 text-xs font-semibold text-[#1A3B5E] leading-none whitespace-nowrap">
                    {c.tag}
                  </span>
                </div>

                <div className="flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <Link href={`/courses/${c.id}`} className="group">
                        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#1A3B5E] group-hover:text-[#2D939F] transition-colors">
                          {c.title}
                        </h2>
                      </Link>
                      <div className="flex items-center gap-2">
                        {/* <span className="inline-flex items-center justify-center rounded-full bg-[#E0F4F6] border border-[#2D939F]/40 px-4 py-2 text-sm font-bold text-[#1A3B5E] leading-none whitespace-nowrap">
                          {c.fee}
                        </span> */}
                      </div>
                    </div>

                    <p className="mt-4 text-[#5A6E82] leading-relaxed text-base sm:text-lg">{c.shortDesc}</p>

                    <div className="mt-5 flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-2 text-sm text-[#5A6E82]">
                        <Clock className="w-4 h-4 text-[#2D939F]" />
                        <span>Duration: <strong className="text-[#1A3B5E]">{c.duration}</strong></span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#5A6E82]">
                        <ShieldCheck className="w-4 h-4 text-[#2D939F]" />
                        <span className="text-[#5A6E82]">{c.feeIncludes}</span>
                      </div>
                    </div>

                    {c.modulesCovered && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {c.modulesCovered.slice(0, 5).map((m) => (
                          <span
                            key={m}
                            className="rounded-lg bg-[#F1F5F9] border border-[#D8E9F1] px-3.5 py-1.5 text-xs font-semibold text-[#1A3B5E]"
                          >
                            {m}
                          </span>
                        ))}
                        {c.modulesCovered.length > 5 && (
                          <span className="rounded-lg bg-[#E0F4F6] px-3.5 py-1.5 text-xs font-semibold text-[#2D939F]">
                            +{c.modulesCovered.length - 5} more modules
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="mt-8 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 pt-6 border-t border-[#D8E9F1]">
                    <Link
                      href={`/courses/${c.id}`}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-[#2D939F] bg-white px-6 py-3 text-sm font-semibold text-[#2D939F] transition-all duration-300 hover:bg-[#2D939F] hover:text-white shadow-sm"
                    >
                      <BookOpen className="w-4 h-4" />
                      Read Full Details &amp; Syllabus
                    </Link>

                    <Link
                      href="/contact"
                      className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 rounded-full bg-[#1A3B5E] px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-[#254670]"
                    >
                      Enroll Now
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
