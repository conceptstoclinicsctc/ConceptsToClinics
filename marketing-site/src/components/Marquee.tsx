import { marqueeItems } from '@/data/courses';

export function Marquee() {
  return (
    <section className="border-y border-[#D8E9F1] bg-[#F1F5F9] py-5 overflow-hidden">
      <div className="relative flex">
        <div className="flex shrink-0 animate-marquee">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="mx-6 inline-flex items-center gap-3 font-display text-lg font-medium text-[#5A6E82]"
            >
              {item}
              <span className="text-[#2D939F]">&#10022;</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
