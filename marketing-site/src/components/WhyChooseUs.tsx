import { whyChooseUs } from '@/data/courses';

export function WhyChooseUs() {
  return (
    <section id="why" className="py-24 sm:py-32 bg-[#F1F5F9]">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">

          <h2 className="reveal mt-3 font-display text-4xl sm:text-5xl font-semibold tracking-tight text-[#1A3B5E]">
            Why Choose Concepts to Clinics?
          </h2>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {whyChooseUs.map((item) => (
            <div
              key={item.title}
              className="reveal group rounded-2xl border border-[#D8E9F1] bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#D8E9F1]/50"
            >
              <span className="grid place-items-center w-12 h-12 rounded-xl bg-[#E6F2F8] text-[#2D939F] transition-all duration-300 group-hover:bg-[#2D939F] group-hover:text-white group-hover:rotate-6">
                <item.icon className="w-6 h-6" />
              </span>
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
