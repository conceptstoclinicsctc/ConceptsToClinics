import { Award, CheckCircle2, Calendar } from 'lucide-react';

const credentials = [
  '2024 MBBS Graduate',
  'House Job at JPMC',
  'USMLE Step 1 – Passed',
  'USMLE Step 2 CK – 260+ Score',
  'FCPS Part I – Medicine & Allied Passed',
  'All in First Attempt',
];

const currentRoles = ['Medical Officer', 'Match Applicant 2027'];

export function Founder() {
  return (
    <section id="founder" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-center">
          <div className="reveal relative">
            <div className="relative mx-auto max-w-sm">
              
              {/* Tutor Photo Card */}
              <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden bg-slate-900 border-4 border-white shadow-2xl relative group">
                <img
                  src="/dr-aftab.jpg?v=3"
                  alt="Aftab Ali, MD — Founder, Lead Tutor & Mentor"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A3B5E]/75 via-[#1A3B5E]/20 to-transparent" />
                
                <div className="absolute bottom-14 sm:bottom-16 left-6 right-6 text-center text-white z-10">
                  <p className="font-display text-2xl font-semibold text-white drop-shadow-md">
                    Aftab Ali
                  </p>
                  <p className="mt-1 text-xs font-semibold text-[#2D939F] uppercase tracking-wider drop-shadow">
                    FOUNDER, LEAD TUTOR &amp; MENTOR
                  </p>
                </div>
              </div>

              {/* First Attempt Badge */}
              <div className="absolute -bottom-5 -right-5 rounded-2xl bg-white px-5 py-3.5 shadow-xl border border-[#D8E9F1] flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#E0F4F6] flex items-center justify-center text-[#2D939F] shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-display text-sm font-bold text-[#1A3B5E]">
                    First Attempt
                  </p>
                  <p className="text-[11px] text-[#5A6E82] font-medium">All Licensing Exams Passed</p>
                </div>
              </div>

            </div>
          </div>

          <div>
            <p className="reveal text-sm font-semibold uppercase tracking-widest text-[#2D939F]">
              Meet Your Founder
            </p>
            <h2 className="reveal mt-3 font-display text-4xl sm:text-5xl font-semibold tracking-tight text-[#1A3B5E]">
              Aftab Ali, MD
            </h2>

            <div className="reveal mt-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#5A6E82] mb-4">
                Credentials
              </p>
              <ul className="grid sm:grid-cols-2 gap-3">
                {credentials.map((c) => (
                  <li key={c} className="flex items-start gap-3">
                    <span className="mt-0.5 grid place-items-center w-6 h-6 rounded-full bg-[#E0F4F6] text-[#2D939F] shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={3} />
                    </span>
                    <span className="text-[#1A3B5E] font-medium text-sm">{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="reveal mt-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#5A6E82] mb-4">
                Current Roles
              </p>
              <div className="flex flex-wrap gap-3">
                {currentRoles.map((r) => (
                  <span
                    key={r}
                    className="inline-flex items-center gap-2 rounded-full bg-[#D8E9F1] px-4 py-2 text-sm font-medium text-[#1A3B5E]"
                  >
                    <Calendar className="w-4 h-4 text-[#2D939F]" />
                    {r}
                  </span>
                ))}
                <a
                  href="https://www.linkedin.com/in/aftab-ali-b943bb182"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 border border-[#0A66C2]/20 px-4 py-2 text-sm font-semibold text-[#0A66C2] transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
                  </svg>
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
