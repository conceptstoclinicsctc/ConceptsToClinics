import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function CtaBanner() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="reveal relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1A3B5E] to-[#254670] p-10 sm:p-16 text-center">
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[#2D939F]/30 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-[#2D939F]/20 blur-3xl" />
          <div className="relative">
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white">
              Begin Your Journey Towards Clinical Excellence
            </h2>
            <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
              Build your concepts. Strengthen your clinical reasoning. Prepare
              with purpose.
            </p>
            <p className="mt-4 text-base text-white/70 max-w-2xl mx-auto">
              Join Concepts to Clinics for a structured approach to medical
              education designed to help you excel in examinations and develop a
              strong foundation for your medical career.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/courses"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-medium text-[#1A3B5E] transition-all duration-300 hover:bg-[#E0F4F6] hover:-translate-y-0.5"
              >
                Explore Courses
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/download"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-7 py-3.5 text-base font-medium text-white transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5"
              >
                Download App
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
