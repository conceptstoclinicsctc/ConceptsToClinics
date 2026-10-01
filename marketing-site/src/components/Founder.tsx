import { Award, CheckCircle2, Calendar, Crown, GraduationCap } from 'lucide-react';

interface FacultyMember {
  name: string;
  degree: string;
  roleBadge: string;
  roleTitle: string;
  isFounder: boolean;
  image: string;
  credentials: string[];
  currentRoles: string[];
  linkedin: string;
}

const faculty: FacultyMember[] = [
  {
    name: 'Dr. Aftab Ali',
    degree: 'MBBS',
    roleBadge: 'Founder & Lead Instructor',
    roleTitle: 'MBBS · Founder & Lead Instructor',
    isFounder: true,
    image: '/dr-aftab.jpg?v=2',
    credentials: [
      '2024 MBBS Graduate',
      'House Job at JPMC',
      'USMLE Step 1 – Passed',
      'USMLE Step 2 CK – 260+ Score',
      'FCPS Part I – Passed',
      'All in First Attempt',
    ],
    currentRoles: ['Medical Officer', 'Match Applicant 2027'],
    linkedin: 'https://www.linkedin.com/in/aftab-ali-b943bb182',
  },
  {
    name: 'Dr. Rohan Lal',
    degree: 'MD',
    roleBadge: 'Course Instructor',
    roleTitle: 'MD · Course Instructor & Clinical Tutor',
    isFounder: false,
    image: '/dr-rohan.jpg',
    credentials: [
      '2023 Medical Graduate (YOG: 2023)',
      'House Job at GMMMC Sukkur',
      'USMLE Step 1 – Passed',
      'USMLE Step 2 CK – 254 Score',
      'USMLE Step 3 – 234 Score',
      'FCPS Part I – Medicine & Allied',
      'All in First Attempt',
    ],
    currentRoles: ['Medical Officer', 'Match Applicant 2027'],
    linkedin: 'https://www.linkedin.com/in/rohan-lal-2aa7b6362/?isSelfProfile=true',
  },
];

export function Founder() {
  return (
    <section id="faculty" className="py-24 sm:py-32 scroll-mt-16">
      {/* Anchor for backwards compatibility */}
      <span id="founder" className="sr-only" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <p className="reveal text-sm font-semibold uppercase tracking-widest text-[#2D939F]">
            Faculty &amp; Mentorship
          </p>
          <h2 className="reveal mt-3 font-display text-4xl sm:text-5xl font-semibold tracking-tight text-[#1A3B5E]">
            Learn from Top-Tier Scorers &amp; Clinicians
          </h2>
          <p className="reveal mt-4 text-base sm:text-lg text-[#5A6E82] leading-relaxed">
            Concepts to Clinics was founded by <strong className="text-[#1A3B5E] font-semibold">Dr. Aftab Ali</strong> to deliver structured, concept-driven medical education. Our educators are high-percentile scorers who conquered every licensing exam in their very first attempts.
          </p>
        </div>

        {/* Faculty Cards Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {faculty.map((member) => (
            <div
              key={member.name}
              className={[
                'reveal relative rounded-[2rem] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300',
                member.isFounder
                  ? 'bg-gradient-to-b from-white to-[#F4F9FC] border-2 border-[#2D939F]/40 shadow-xl shadow-[#1A3B5E]/5 ring-1 ring-[#2D939F]/20'
                  : 'bg-white border border-[#D8E9F1] shadow-lg shadow-slate-100/80 hover:border-[#2D939F]/40 hover:shadow-xl',
              ].join(' ')}
            >
              {/* Card Header: Role Badge & Identity */}
              <div>
                <div className="flex items-center justify-between gap-3 mb-6">
                  {member.isFounder ? (
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#1A3B5E] to-[#254670] text-white text-xs font-bold tracking-wider uppercase shadow-sm">
                      <Crown className="w-3.5 h-3.5 text-[#2D939F]" />
                      <span>Founder &amp; Lead Instructor</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E0F4F6] text-[#2D939F] border border-[#2D939F]/30 text-xs font-bold tracking-wider uppercase">
                      <GraduationCap className="w-3.5 h-3.5 text-[#2D939F]" />
                      <span>Course Instructor</span>
                    </div>
                  )}

                  <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#2D939F] bg-[#E0F4F6]/70 px-2.5 py-1 rounded-full">
                    <Award className="w-3.5 h-3.5 text-[#2D939F]" />
                    <span>1st Attempt Scorers</span>
                  </div>
                </div>

                {/* Profile Portrait & Title */}
                <div className="grid sm:grid-cols-[160px_1fr] gap-6 items-center mb-8">
                  {/* Photo Container */}
                  <div className="relative mx-auto sm:mx-0 w-40 sm:w-full aspect-[3/4] rounded-2xl overflow-hidden bg-slate-900 border-2 border-white shadow-md group">
                    <img
                      src={member.image}
                      alt={`${member.name}, ${member.degree} — ${member.roleBadge}`}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A3B5E]/60 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Name & Role Details */}
                  <div className="text-center sm:text-left">
                    <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#1A3B5E]">
                      {member.name}, <span className="text-[#2D939F]">{member.degree}</span>
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm font-semibold text-[#5A6E82] uppercase tracking-wide">
                      {member.roleTitle}
                    </p>

                    {/* Quick Badge */}
                    <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#D8E9F1] shadow-xs text-left">
                      <div className="w-6 h-6 rounded-lg bg-[#E0F4F6] flex items-center justify-center text-[#2D939F] shrink-0">
                        <Award className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#1A3B5E]">All Licensing Exams</p>
                        <p className="text-[10px] text-[#5A6E82] font-medium">Passed on First Attempt</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Credentials Section */}
                <div className="pt-2 border-t border-[#D8E9F1]/60">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#5A6E82] mb-3">
                    Verified Credentials
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-2.5">
                    {member.credentials.map((cred) => (
                      <li key={cred} className="flex items-start gap-2.5">
                        <span className="mt-0.5 grid place-items-center w-5 h-5 rounded-full bg-[#E0F4F6] text-[#2D939F] shrink-0">
                          <CheckCircle2 className="w-3 h-3" strokeWidth={3} />
                        </span>
                        <span className="text-[#1A3B5E] font-medium text-xs sm:text-sm">{cred}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer: Roles & LinkedIn */}
              <div className="mt-8 pt-5 border-t border-[#D8E9F1]/60">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#5A6E82] mb-3">
                  Current Status &amp; Profile
                </p>
                <div className="flex flex-wrap items-center gap-2.5">
                  {member.currentRoles.map((role) => (
                    <span
                      key={role}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#E6F2F8] px-3 py-1.5 text-xs font-medium text-[#1A3B5E]"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#2D939F]" />
                      {role}
                    </span>
                  ))}
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 border border-[#0A66C2]/20 px-3.5 py-1.5 text-xs font-semibold text-[#0A66C2] transition-colors ml-auto"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
