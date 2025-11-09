const steps = [
  {
    title: "Capture a clear photo",
    detail:
      "Photograph the ingredients panel in good lighting. Avoid glare and ensure the entire list fits within the frame.",
    highlights: [
      "Face the ingredients label straight on.",
      "Fill the frame to keep text crisp.",
      "Wipe the lens so the contrast stays sharp.",
    ],
  },
  {
    title: "Upload and review",
    detail:
      "Drop the image into the Upload page. We first look for certified halal logos; otherwise we run the OCR pipeline automatically.",
    highlights: [
      "Drag & drop or select a file from your device.",
      "Confirm the preview looks readable.",
      "Let the automated checks finish before moving on.",
    ],
  },
  {
    title: "Interpret the verdict",
    detail:
      "View the match score, see the ingredient breakdown, and optionally review the full OCR transcript for verification.",
    highlights: [
      "Start with the overall halal verdict banner.",
      "Scan the flagged ingredient list for alerts.",
      "Open the transcript to double-check edge cases.",
    ],
  },
  {
    title: "Ask follow-up questions",
    detail:
      "Unsure about an ingredient? Head to the Chatbot page to cross-check additives, E-codes, or alternate names instantly.",
    highlights: [
      "Reference E-codes or additives by name.",
      "Save clarifications for future audits.",
      "Share conclusions with teammates quickly.",
    ],
  },
];

export function GuidePage() {
  return (
    <section
      id="guide"
      className="relative overflow-hidden bg-slate-950 pb-24 pt-16"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 flex justify-center"
      >
        <div className="h-48 w-[32rem] -translate-y-8 rounded-full bg-gradient-to-br from-primary-500/30 via-primary-400/10 to-transparent blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4">
        <header className="relative text-center md:text-left">
          <div className="mx-auto max-w-2xl md:mx-0">
            <p className="inline-flex items-center rounded-full border border-primary-500/40 bg-primary-500/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-200">
              Halal verification flow
            </p>
            <h2 className="mt-5 text-3xl font-semibold text-slate-100 md:text-4xl">
              Guide your product from capture to halal verdict
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300/85 md:text-lg">
              Each step focuses on clarity so your team can move fast without second guessing the process.
            </p>
          </div>
        </header>

        <div className="relative mt-16 md:mt-20">
          <span
            aria-hidden
            className="pointer-events-none absolute left-[calc(0.5rem+1px)] top-4 hidden h-[calc(100%_-_2rem)] w-px bg-gradient-to-b from-primary-500/50 via-primary-500/10 to-transparent md:block"
          />

          <div className="flex flex-col gap-10">
            {steps.map((step, index) => (
              <article
                key={step.title}
                className="relative overflow-hidden rounded-3xl border border-slate-800/60 bg-slate-900/60 px-6 py-8 shadow-subtle transition hover:border-primary-500/40 hover:shadow-lg/30 md:grid md:grid-cols-[auto,1fr] md:gap-10 md:px-10"
              >
                <div className="relative mb-6 flex items-center gap-4 md:mb-0 md:flex-col md:items-start">
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-primary-500/40 bg-primary-500/10 text-lg font-semibold text-primary-200">
                    {index + 1}
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-200">
                    Step {index + 1}
                  </span>
                  <span
                    aria-hidden
                    className="absolute left-1/2 top-14 hidden h-[calc(100%_-_3.5rem)] w-px -translate-x-1/2 bg-slate-800 md:block"
                  />
                </div>

                <div className="flex flex-col gap-5">
                  <h3 className="text-2xl font-semibold text-slate-100">
                    {step.title}
                  </h3>

                  <p className="max-w-2xl text-sm leading-relaxed text-slate-300/85 md:text-base">
                    {step.detail}
                  </p>

                  <div className="grid gap-4 md:grid-cols-2">
                    {step.highlights.map((highlight) => (
                      <div
                        key={highlight}
                        className="flex items-start gap-3 rounded-2xl border border-slate-800/70 bg-slate-900/70 px-4 py-4 text-sm text-slate-300/90"
                      >
                        <span className="mt-1 inline-flex h-2.5 w-2.5 flex-none rounded-full bg-primary-400/80" aria-hidden />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-20 grid gap-6 rounded-3xl border border-primary-500/30 bg-primary-500/10 p-8 text-sm text-primary-100 md:grid-cols-[2fr,3fr] md:items-center">
          <div>
            <h3 className="text-lg font-semibold text-primary-100 md:text-xl">
              Tips for best accuracy
            </h3>
            <p className="mt-2 text-primary-200/80">
              Small tweaks to your process can save minutes on every verification run.
            </p>
          </div>
          <ul className="grid gap-4">
            <li className="rounded-2xl border border-primary-500/20 bg-primary-500/10 p-4">
              Trim the capture so the ingredient list dominates the frame. Crop out branding and background clutter.
            </li>
            <li className="rounded-2xl border border-primary-500/20 bg-primary-500/10 p-4">
              Use the chatbot to clarify ambiguous results or cross-check complex additives in seconds.
            </li>
            <li className="rounded-2xl border border-primary-500/20 bg-primary-500/10 p-4">
              Re-run the analysis with a sharper photo if OCR confidence seems low. Consistent lighting matters.
            </li>
            <li className="rounded-2xl border border-primary-500/20 bg-primary-500/10 p-4">
              Keep large knowledge-base files on fast storage for snappier indexing and lookup.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}


