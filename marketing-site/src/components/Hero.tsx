import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-20 pb-20 sm:pt-24 sm:pb-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -right-24 w-[34rem] h-[34rem] bg-[#2D939F]/12 animate-blob blur-2xl" />
        <div className="absolute top-40 -left-32 w-[26rem] h-[26rem] bg-[#254670]/10 animate-blob blur-2xl" style={{ animationDelay: '3s' }} />
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-3xl">

          {/* Tutor Profile Pill Badge */}
          <a
            href="https://www.linkedin.com/in/aftab-ali-b943bb182"
            target="_blank"
            rel="noopener noreferrer"
            className="reveal inline-flex items-center gap-3 bg-white/90 backdrop-blur border border-[#D8E9F1] hover:border-[#2D939F] p-1.5 pr-4 rounded-full shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer mb-6 group"
          >
            <img
              src="/dr-aftab.jpg?v=3"
              alt="Dr. Aftab Ali, MD"
              className="w-9 h-9 rounded-full object-cover object-top border-2 border-[#2D939F] group-hover:scale-105 transition-transform"
            />
            <span className="text-xs font-semibold text-[#1A3B5E] group-hover:text-[#2D939F] transition-colors">
              Founded by <strong className="text-[#2D939F]">Dr. Aftab Ali, MD</strong> (Step 2 CK: 260+)
            </span>
          </a>

          <h1 className="reveal font-display text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-[4.2rem] font-semibold tracking-tight text-[#1A3B5E]">
            Master Concepts.{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-[#2D939F]">Excel</span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M2 9 C 60 2, 140 2, 198 7"
                  fill="none"
                  stroke="#254670"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>{' '}
            in Clinics.
          </h1>

          <p className="reveal mt-6 max-w-2xl text-lg leading-relaxed text-[#5A6E82]">
            A comprehensive, concept-based medical education platform for USMLE,
            FCPS, MBBS, and NRE. Learn through our First Aid–based lecture series,
            connect concepts to clinical scenarios, and receive expert Mentorship to make
            your preparation simpler, more structured, and exam-focused.
          </p>

          <div className="reveal mt-9 flex flex-col sm:flex-row gap-3">
            <Link
              href="/download"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#2D939F] px-7 py-3.5 text-base font-medium text-white transition-all duration-300 hover:bg-[#257B85] hover:shadow-xl hover:shadow-[#1A3B5E]/20 hover:-translate-y-0.5"
            >
              Download App
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/courses"
              className="inline-flex items-center justify-center rounded-full border border-[#D8E9F1] bg-white px-7 py-3.5 text-base font-medium text-[#1A3B5E] transition-all duration-300 hover:border-[#1A3B5E] hover:-translate-y-0.5"
            >
              Explore Courses
            </Link>
          </div>
        </div>

        <div className="reveal mt-16 grid grid-cols-2 sm:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-[#D8E9F1] bg-[#D8E9F1]">
          {[
            { v: '150+', l: 'Hours of First Aid Lectures' },
            { v: '60+', l: 'Students Enrolled' },
            { v: '6', l: 'Programs' },
            { v: '1st', l: 'Attempt Success' },
          ].map((s) => (
            <div key={s.l} className="bg-white p-6 text-center">
              <p className="font-display text-3xl sm:text-4xl font-semibold text-[#2D939F]">
                {s.v}
              </p>
              <p className="mt-1.5 text-xs sm:text-sm text-[#5A6E82]">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
