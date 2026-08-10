const steps = [
  {
    n: '01',
    title: 'Download the app',
    desc: 'Get CTC Lectures on iOS or Android. Set up your profile in under a minute.',
  },
  {
    n: '02',
    title: 'Pick your courses',
    desc: 'Browse the catalog and enroll in the subjects you need. Mix and match freely.',
  },
  {
    n: '03',
    title: 'Watch & practice',
    desc: 'Stream video lectures, complete practice sets, and track your progress automatically.',
  },
  {
    n: '04',
    title: 'Track & improve',
    desc: 'See your streaks, quiz scores, and weak spots. The app suggests what to review next.',
  },
];

export function Process() {
  return (
    <section id="process" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="reveal text-sm font-semibold uppercase tracking-widest text-[#2D939F]">
            How it works
          </p>
          <h2 className="reveal mt-3 font-display text-4xl sm:text-5xl font-semibold tracking-tight text-[#1A3B5E]">
            A clear path from confused to confident.
          </h2>
        </div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className="reveal relative rounded-2xl border border-[#D8E9F1] bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#D8E9F1]/60"
            >
              <span className="font-display text-5xl font-semibold text-[#E6F2F8]">
                {s.n}
              </span>
              <h3 className="mt-3 font-display text-xl font-semibold text-[#1A3B5E]">
                {s.title}
              </h3>
              <p className="mt-2 text-[#5A6E82] leading-relaxed">{s.desc}</p>

              {i < steps.length - 1 && (
                <span className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-[#D8E9F1]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
