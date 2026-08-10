import { programs } from '@/data/courses';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Award,
  Sparkles,
} from 'lucide-react';

export function generateStaticParams() {
  return programs.map((p) => ({
    id: p.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const program = programs.find((p) => p.id === id);
  if (!program) return { title: 'Course Not Found' };
  return {
    title: `${program.title} — Concepts to Clinics`,
    description: program.shortDesc,
  };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const program = programs.find((p) => p.id === id);

  if (!program) {
    notFound();
  }

  return (
    <div className="pt-20 sm:pt-24 min-h-screen">
      
      {/* 1. Page Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-20 sm:pt-12 sm:pb-28">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 -right-24 w-[34rem] h-[34rem] bg-[#2D939F]/12 animate-blob blur-2xl" />
          <div className="absolute top-40 -left-32 w-[26rem] h-[26rem] bg-[#254670]/10 animate-blob blur-2xl" style={{ animationDelay: '3s' }} />
        </div>

        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="reveal mb-6">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 rounded-full border border-[#D8E9F1] bg-white px-5 py-2 text-sm font-semibold text-[#1A3B5E] shadow-sm hover:border-[#1A3B5E] hover:bg-[#1A3B5E] hover:text-white transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Courses
            </Link>
          </div>

          <div className="reveal flex items-center gap-3 mb-4">
            <span className="grid place-items-center w-12 h-12 rounded-2xl bg-[#E6F2F8] text-[#2D939F]">
              <program.icon className="w-6 h-6" />
            </span>
            <span className="rounded-full bg-[#D8E9F1] px-4 py-1.5 text-xs font-bold text-[#1A3B5E]">
              {program.tag}
            </span>
          </div>

          <h1 className="reveal font-display text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#1A3B5E] leading-tight">
            {program.title}
          </h1>

          <p className="reveal mt-6 text-lg sm:text-xl text-[#5A6E82] leading-relaxed max-w-3xl">
            {program.shortDesc}
          </p>

          {/* Fee & App Access Banner */}
          <div className="reveal mt-10 sm:mt-14 flex flex-wrap items-center justify-between gap-6 rounded-3xl bg-[#E6F2F8]/70 border border-[#D8E9F1] p-6 sm:p-8 backdrop-blur shadow-sm">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#5A6E82]">
                Course Fee &amp; Access Details
              </p>
              <p className="font-display text-3xl sm:text-4xl font-bold text-[#1A3B5E] mt-1">
                {program.fee}
              </p>
              <p className="text-sm sm:text-base text-[#2D939F] font-semibold mt-1">
                {program.feeIncludes}
              </p>
            </div>
            <Link
              href="/download"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-[#2D939F] px-8 py-4 text-base font-semibold text-white transition-all hover:bg-[#257B85] hover:shadow-xl hover:-translate-y-0.5"
            >
              Enroll Now ({program.fee})
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Why Choose This Pathway Section */}
      {program.whyThisCourse && (
        <section className="py-20 sm:py-28 bg-[#F8FAFC] border-y border-[#D8E9F1]">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="reveal max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-widest text-[#2D939F] mb-3">
                Why Choose This Pathway
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#1A3B5E]">
                Designed to solve common preparation pitfalls.
              </h2>
              <p className="mt-6 text-lg sm:text-xl text-[#5A6E82] leading-relaxed">
                {program.whyThisCourse}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 3. Modules Covered Section */}
      {program.modulesCovered && (
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="reveal mb-10 sm:mb-14">
              <p className="text-sm font-bold uppercase tracking-widest text-[#2D939F] mb-3">
                Curriculum Modules
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#1A3B5E]">
                Modules covered in this course.
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {program.modulesCovered.map((m) => (
                <div
                  key={m}
                  className="reveal flex items-center gap-3.5 rounded-2xl bg-white border border-[#D8E9F1] p-5 sm:p-6 text-base sm:text-lg font-semibold text-[#1A3B5E] shadow-sm"
                >
                  <span className="grid place-items-center w-8 h-8 rounded-xl bg-[#E0F4F6] text-[#2D939F] shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </span>
                  <span>{m}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Course Components Section */}
      {program.components && program.components.length > 0 && (
        <section className="py-20 sm:py-28 bg-[#F8FAFC] border-y border-[#D8E9F1]">
          <div className="mx-auto max-w-6xl px-5 sm:px-8 space-y-16">
            <div className="reveal">
              <p className="text-sm font-bold uppercase tracking-widest text-[#2D939F] mb-3">
                Course Breakdown
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#1A3B5E]">
                Structured course components &amp; methodology.
              </h2>
            </div>

            {program.components.map((comp) => (
              <div
                key={comp.name}
                className="reveal space-y-6 pt-10 first:pt-0 border-t first:border-0 border-[#D8E9F1]"
              >
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#1A3B5E]">
                  {comp.name}
                </h3>
                <p className="text-lg sm:text-xl text-[#5A6E82] leading-relaxed">
                  {comp.description}
                </p>

                {comp.features && (
                  <div className="space-y-4 pt-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#5A6E82]">
                      Key Highlights
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                      {comp.features.map((feat) => (
                        <li
                          key={feat}
                          className="flex items-start gap-3.5 rounded-2xl bg-white border border-[#D8E9F1] p-5 sm:p-6 text-base sm:text-lg text-[#1A3B5E] font-medium shadow-sm"
                        >
                          <span className="grid place-items-center w-7 h-7 rounded-full bg-[#E0F4F6] text-[#2D939F] shrink-0 mt-0.5">
                            <CheckCircle2 className="w-4 h-4" />
                          </span>
                          <span className="leading-relaxed">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {comp.outcome && (
                  <div className="rounded-2xl bg-[#E0F4F6] border border-[#2D939F]/30 p-6 text-base sm:text-lg font-medium text-[#1A3B5E] leading-relaxed">
                    <strong className="text-[#2D939F] font-bold">🎯 Target Outcome:</strong> {comp.outcome}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. Questions Answered in Mentorship */}
      {program.questionsAnswered && (
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="reveal mb-10 sm:mb-14 max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-widest text-[#2D939F] mb-3">
                Mentorship FAQ
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#1A3B5E]">
                Questions we help you answer in mentorship.
              </h2>
            </div>

            <div className="space-y-5">
              {program.questionsAnswered.map((q) => (
                <div
                  key={q}
                  className="reveal flex items-start gap-4 sm:gap-5 rounded-2xl bg-white border border-[#D8E9F1] p-6 sm:p-7 text-lg sm:text-xl font-medium text-[#1A3B5E] shadow-sm hover:border-[#2D939F]/50 transition-colors"
                >
                  <span className="grid place-items-center w-10 h-10 rounded-xl bg-[#E0F4F6] text-[#2D939F] shrink-0 mt-0.5">
                    <HelpCircle className="w-5 h-5" />
                  </span>
                  <span className="leading-relaxed pt-0.5">{q}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. What You'll Receive & Key Features */}
      {(program.whatYouWillReceive || program.keyFeatures) && (
        <section className="py-20 sm:py-28 bg-[#F8FAFC] border-y border-[#D8E9F1]">
          <div className="mx-auto max-w-6xl px-5 sm:px-8 space-y-16">
            
            {program.whatYouWillReceive && (
              <div>
                <div className="reveal">
                  <p className="text-sm font-bold uppercase tracking-widest text-[#2D939F] mb-3">
                    Student Deliverables
                  </p>
                  <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#1A3B5E] mb-8">
                    What you receive with your mentorship.
                  </h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  {program.whatYouWillReceive.map((w) => (
                    <div
                      key={w}
                      className="reveal flex items-start gap-3.5 rounded-2xl bg-white border border-[#D8E9F1] p-6 text-base sm:text-lg text-[#1A3B5E] font-medium shadow-sm"
                    >
                      <span className="grid place-items-center w-8 h-8 rounded-full bg-[#E0F4F6] text-[#2D939F] shrink-0 mt-0.5">
                        <CheckCircle2 className="w-5 h-5" />
                      </span>
                      <span className="leading-relaxed">{w}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {program.keyFeatures && (
              <div>
                <div className="reveal">
                  <p className="text-sm font-bold uppercase tracking-widest text-[#2D939F] mb-3">
                    Course Highlights
                  </p>
                  <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#1A3B5E] mb-8">
                    Key features of the program.
                  </h2>
                </div>
                <div className="space-y-4">
                  {program.keyFeatures.map((kf) => (
                    <div
                      key={kf}
                      className="reveal flex items-start gap-4 rounded-2xl bg-white border border-[#D8E9F1] p-6 text-lg sm:text-xl text-[#1A3B5E] font-medium shadow-sm"
                    >
                      <span className="grid place-items-center w-9 h-9 rounded-xl bg-[#E0F4F6] text-[#2D939F] shrink-0 mt-0.5">
                        <Award className="w-5 h-5" />
                      </span>
                      <span className="leading-relaxed pt-0.5">{kf}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </section>
      )}

      {/* 7. Why Mentorship is Different */}
      {program.whyDifferent && (
        <section className="py-24 sm:py-32 bg-[#1A3B5E] text-white">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="reveal max-w-3xl mx-auto text-center">
              <h2 className="font-display text-3xl sm:text-5xl font-semibold mb-6 text-white">
                Why Our Mentorship Is Different
              </h2>
              <p className="text-lg sm:text-xl text-white/90 leading-relaxed">
                {program.whyDifferent}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 8. Target Outcome & Bottom Enrollment CTA */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          {(program.targetOutcome || program.ourGoal) && (
            <div className="reveal rounded-3xl bg-[#E0F4F6] border border-[#2D939F]/40 p-8 sm:p-12 mb-16 shadow-sm">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1A3B5E] mb-4 flex items-center gap-3">
                <Award className="w-8 h-8 text-[#2D939F]" />
                {program.ourGoal ? 'Our Goal' : 'Target Outcome'}
              </h2>
              <p className="text-lg sm:text-xl text-[#1A3B5E] leading-relaxed font-medium">
                {program.ourGoal || program.targetOutcome}
              </p>
            </div>
          )}

          <div className="reveal flex flex-wrap items-center justify-between gap-6 pt-10 border-t border-[#D8E9F1]">
            <Link
              href="/courses"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-[#D8E9F1] bg-white px-7 py-3.5 text-base font-semibold text-[#1A3B5E] shadow-sm hover:border-[#1A3B5E] hover:bg-[#1A3B5E] hover:text-white transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to All Courses
            </Link>

            <Link
              href="/download"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-[#2D939F] px-8 py-4 text-base font-semibold text-white transition-all hover:bg-[#257B85] hover:shadow-xl hover:-translate-y-0.5"
            >
              Enroll Now ({program.fee})
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
