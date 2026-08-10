import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { programs } from '@/data/courses';

export function Programs() {
  return (
    <section id="programs" className="py-24 sm:py-32 bg-[#F1F5F9]">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="reveal text-sm font-semibold uppercase tracking-widest text-[#2D939F]">
            Our Programs
          </p>
          <h2 className="reveal mt-3 font-display text-4xl sm:text-5xl font-semibold tracking-tight text-[#1A3B5E]">
            Programs designed for every stage.
          </h2>
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {programs.map((p) => (
            <article
              key={p.id}
              className="reveal group rounded-2xl border border-[#D8E9F1] bg-white p-8 transition-all duration-300 hover:shadow-xl hover:shadow-[#D8E9F1]/50 hover:border-[#2D939F]/30"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="grid place-items-center w-14 h-14 rounded-xl bg-[#E6F2F8] text-[#2D939F] transition-all duration-300 group-hover:bg-[#2D939F] group-hover:text-white group-hover:rotate-6">
                  <p.icon className="w-7 h-7" />
                </span>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#D8E9F1] px-3.5 py-1.5 text-xs font-medium text-[#1A3B5E] leading-none whitespace-nowrap">
                    <Clock className="w-3.5 h-3.5" />
                    {p.duration}
                  </span>
                </div>
              </div>

              <h3 className="mt-5 font-display text-xl font-semibold text-[#1A3B5E]">
                {p.title}
              </h3>
              <p className="mt-3 text-[#5A6E82] leading-relaxed">
                {p.shortDesc}
              </p>

              <Link
                href="/courses"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#2D939F] transition-colors group-hover:text-[#257B85]"
              >
                View Program
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
