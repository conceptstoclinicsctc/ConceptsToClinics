import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    quote:
      "The calculus course finally made limits and derivatives make sense. I went from a C to an A- by finals.",
    name: 'Priya R.',
    role: 'College freshman',
  },
  {
    quote:
      'I prepped for the SAT entirely on the app and went from 1180 to 1410. The timed practice tests were a game changer.',
    name: 'Jordan T.',
    role: 'High school senior',
  },
  {
    quote:
      'Physics finally clicked. The visual demonstrations connect everything to real life. I actually look forward to studying now.',
    name: 'Sofia M.',
    role: 'AP Physics student',
  },
  {
    quote:
      'I love that I can download lectures and watch them on the bus. The offline mode is a lifesaver for my commute.',
    name: 'Daniel K.',
    role: 'Working professional',
  },
  {
    quote:
      'Organic chemistry was killing me until I found the chemistry course. The molecular visualizations are incredible.',
    name: 'Aisha L.',
    role: 'College sophomore',
  },
  {
    quote:
      'The progress tracking keeps me motivated. Seeing my streak and quiz scores improve week over week is genuinely addictive.',
    name: 'Marcus W.',
    role: 'Self-learner',
  },
];

export function Testimonials() {
  return (
    <section className="py-24 sm:py-32 bg-[#F1F5F9]">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="reveal text-sm font-semibold uppercase tracking-widest text-[#2D939F]">
              Learner stories
            </p>
            <h2 className="reveal mt-3 font-display text-4xl sm:text-5xl font-semibold tracking-tight text-[#1A3B5E]">
              Real progress, in their words.
            </h2>
          </div>
          <div className="reveal flex items-center gap-2 text-[#5A6E82]">
            <div className="flex text-[#254670]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <p className="text-sm">
              <span className="font-semibold text-[#1A3B5E]">4.9</span> average
              across 12,000+ reviews
            </p>
          </div>
        </div>

        <div className="mt-14 columns-1 md:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="reveal mb-5 break-inside-avoid rounded-2xl border border-[#D8E9F1] bg-white p-7 transition-all duration-300 hover:shadow-lg hover:shadow-[#D8E9F1]/40"
            >
              <Quote className="w-7 h-7 text-[#2D939F]/30" />
              <blockquote className="mt-3 text-[#1A3B5E] leading-relaxed">
                {t.quote}
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="grid place-items-center w-10 h-10 rounded-full bg-[#2D939F] text-white font-display text-sm font-semibold">
                  {t.name.charAt(0)}
                </span>
                <div>
                  <p className="font-semibold text-[#1A3B5E]">{t.name}</p>
                  <p className="text-sm text-[#5A6E82]">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
