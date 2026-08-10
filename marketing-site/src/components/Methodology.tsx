import { methodology } from '@/data/courses';

export function Methodology() {
  return (
    <section id="methodology" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="reveal text-sm font-semibold uppercase tracking-widest text-[#2D939F]">
            Our Teaching Methodology
          </p>
          <h2 className="reveal mt-3 font-display text-4xl sm:text-5xl font-semibold tracking-tight text-[#1A3B5E]">
            How we teach.
          </h2>
          <p className="reveal mt-5 text-lg text-[#5A6E82]">
            A structured approach that builds understanding from the ground up
            and connects every concept to clinical practice.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {methodology.map((item, i) => (
            <div
              key={item.title}
              className="reveal group relative rounded-2xl border border-[#D8E9F1] bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#D8E9F1]/50"
            >
              <div className="flex items-center gap-4">
                <span className="grid place-items-center w-12 h-12 rounded-xl bg-[#E6F2F8] text-[#2D939F] transition-all duration-300 group-hover:bg-[#2D939F] group-hover:text-white group-hover:rotate-6 shrink-0">
                  <item.icon className="w-6 h-6" />
                </span>
                <span className="font-display text-3xl font-semibold text-[#E6F2F8]">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-[#1A3B5E]">
                {item.title}
              </h3>
              <p className="mt-2 text-[#5A6E82] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
