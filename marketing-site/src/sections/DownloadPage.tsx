'use client';

import Link from 'next/link';
import { Star, Check, Download, BarChart3, Play, ShieldCheck, BookOpen, Lock, ChevronRight } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: 'System-Wise Playlists',
    desc: 'Organized lecture series grouped by medical systems and subjects with First Aid integration for structured revision.',
  },
  {
    icon: BarChart3,
    title: 'Auto Progress Sync',
    desc: 'Saves your exact video watch timestamps and course completion percentages automatically as you watch.',
  },
  {
    icon: Play,
    title: 'Protected HD Player',
    desc: 'Smooth high-definition video playback with auto-rotatable landscape fullscreen mode for comfortable study sessions.',
  },
  {
    icon: ShieldCheck,
    title: 'Single Device Security',
    desc: 'Your account and course access are safeguarded with secure single-device hardware authentication.',
  },
];

export function DownloadPageClient() {
  return (
    <div className="pt-20 sm:pt-24">
      <section className="relative overflow-hidden pt-8 pb-16 sm:pt-12 sm:pb-24">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 -right-24 w-[34rem] h-[34rem] bg-[#2D939F]/12 animate-blob blur-2xl" />
          <div className="absolute top-40 -left-32 w-[26rem] h-[26rem] bg-[#254670]/10 animate-blob blur-2xl" style={{ animationDelay: '3s' }} />
        </div>

        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center justify-items-center">
            <div>
              <p className="reveal text-sm font-semibold uppercase tracking-widest text-[#2D939F]">
                Download App
              </p>
              <h1 className="reveal mt-3 font-display text-4xl sm:text-5xl font-semibold tracking-tight text-[#1A3B5E]">
                Medical education that fits in your pocket.
              </h1>
              <p className="reveal mt-5 text-lg text-[#5A6E82] leading-relaxed">
                Get Concepts to Clinics directly on your Android device. Access comprehensive medical education lectures for MBBS, USMLE, FCPS, and NRE preparation anytime, anywhere.
              </p>

              {/* Android Download Button */}
              <div className="reveal mt-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <a
                  href="https://conceptstoclinics.b-cdn.net/concepts-to-clinics-v1.0.2.apk"
                  target="_blank"
                  rel="noopener noreferrer"
                  download="concepts-to-clinics-v1.0.2.apk"
                  className="inline-flex items-center gap-3 rounded-full bg-[#1A3B5E] px-7 py-3.5 text-base font-medium text-white transition-all duration-300 hover:bg-[#2D939F] hover:shadow-lg hover:shadow-[#1A3B5E]/15 hover:-translate-y-0.5"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Android App</span>
                </a>

                <div className="flex items-center gap-2 text-xs font-semibold text-[#5A6E82] bg-[#E6F2F8] px-4 py-3 rounded-full border border-[#D8E9F1]">
                  <ShieldCheck className="w-4 h-4 text-[#2D939F] shrink-0" />
                  <span>Compatible with all Android devices</span>
                </div>
              </div>

              <div className="reveal mt-6 flex items-center gap-4 text-sm text-[#5A6E82]">
                <div className="flex text-[#254670]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span>4.9 rating · 12,000+ medical students</span>
              </div>
            </div>

            {/* Mobile App PNG Mockup Image */}
            <div className="reveal relative flex justify-center overflow-visible">
              <div className="relative inline-block overflow-visible">
                <img
                  src="/app-mockup.png?v=3"
                  alt="Concepts to Clinics Mobile App Screen"
                  style={{ height: '400px', width: 'auto' }}
                  className="drop-shadow-xl transition-transform duration-500 hover:scale-[1.02]"
                />

                <div className="absolute bottom-16 -left-8 animate-float rounded-2xl bg-white px-3.5 py-1.5 shadow-xl border border-[#D8E9F1] rotate-[-4deg] whitespace-nowrap">
                  <p className="font-display text-[10px] font-bold text-[#1A3B5E] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#2D939F] animate-pulse" />
                    Concepts to Clinics Android App
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32 bg-[#F1F5F9]">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="reveal text-sm font-semibold uppercase tracking-widest text-[#2D939F]">
              Why learners love the app
            </p>
            <h2 className="reveal mt-3 font-display text-4xl sm:text-5xl font-semibold tracking-tight text-[#1A3B5E]">
              Built for how you actually study.
            </h2>
          </div>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="reveal group rounded-2xl border border-[#D8E9F1] bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#D8E9F1]/50"
              >
                <span className="grid place-items-center w-12 h-12 rounded-xl bg-[#E6F2F8] text-[#2D939F] transition-all duration-300 group-hover:bg-[#2D939F] group-hover:text-white group-hover:rotate-6">
                  <f.icon className="w-6 h-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-[#1A3B5E]">
                  {f.title}
                </h3>
                <p className="mt-2 text-[#5A6E82] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <div className="reveal rounded-3xl border border-[#D8E9F1] bg-white p-8 sm:p-12 text-center sm:text-left">
            <h2 className="font-display text-3xl font-semibold text-[#1A3B5E]">
              What&apos;s included in the Android app
            </h2>
            <ul className="mt-6 space-y-4">
              {[
                'Full access to all enrolled video lectures & courses',
                'First Aid-integrated curriculum & system-wise playlists',
                'Automatic video watch progress & timestamp tracking',
                'Protected HD video streaming with landscape mode',
                'Clinical case correlations & exam-focused scenarios',
                'Optimized for Android smartphones and tablets',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 grid place-items-center w-6 h-6 rounded-full bg-[#E0F4F6] text-[#2D939F] shrink-0">
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-[#1A3B5E] text-left">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <a
                href="https://conceptstoclinics.b-cdn.net/concepts-to-clinics-v1.0.2.apk"
                target="_blank"
                rel="noopener noreferrer"
                download="concepts-to-clinics-v1.0.2.apk"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#1A3B5E] px-8 py-4 text-base font-medium text-white transition-all duration-300 hover:bg-[#2D939F] hover:shadow-lg hover:shadow-[#1A3B5E]/15 hover:-translate-y-0.5"
              >
                <Download className="w-5 h-5" />
                <span>Download Android App</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
