import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { programs as courses } from '@/data/courses';

export function Subjects() {
  return (
    <section id="subjects" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="reveal text-sm font-semibold uppercase tracking-widest text-[#2D939F]">
            What we teach
          </p>
          <h2 className="reveal mt-3 font-display text-4xl sm:text-5xl font-semibold tracking-tight text-[#1A3B5E]">
            Courses that turn confusion into confidence.
          </h2>
          <p className="reveal mt-5 text-lg text-[#5A6E82]">
            Every course is self-paced with video lectures, practice sets, and
            progress tracking. Pick one or mix several — the app adapts as you grow.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.map((s) => (
            <Link
              key={s.id}
              href="/courses"
              className="reveal group relative rounded-2xl border border-[#D8E9F1] bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#D8E9F1]/60 hover:border-[#2D939F]/30"
            >
              <div className="flex items-center justify-between">
                <span className="grid place-items-center w-12 h-12 rounded-xl bg-[#E6F2F8] text-[#2D939F] transition-all duration-300 group-hover:bg-[#2D939F] group-hover:text-white group-hover:rotate-6">
                  <s.icon className="w-6 h-6" strokeWidth={2} />
                </span>
                <span className="rounded-full bg-[#D8E9F1] px-3 py-1 text-xs font-medium text-[#1A3B5E]">
                  {s.tag}
                </span>
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-[#1A3B5E]">
                {s.title}
              </h3>
              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-[#5A6E82]">
                {s.tag}
              </p>
              <p className="mt-3 text-[#5A6E82] leading-relaxed">{s.shortDesc}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#2D939F] transition-colors group-hover:text-[#257B85]">
                View full course
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
