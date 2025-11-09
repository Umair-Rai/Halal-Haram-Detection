import { Link } from "react-router-dom";
import { PrimaryButton } from "../components/PrimaryButton.jsx";

const features = [
  {
    title: "Smart OCR & detection",
    description:
      "Gemini extracts label text while our trained YOLO model instantly recognises certified halal logos.",
  },
  {
    title: "Knowledge base powered",
    description:
      "A curated dataset of 39k+ phrases lets us classify ingredients using semantic search, not brittle keyword lists.",
  },
  {
    title: "Instant ingredient help",
    description: "Ask the chatbot about E-codes, additives, or ingredient aliases to get fast clarity.",
  },
];

export function HomePage() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-900/80 via-slate-950 to-slate-950" />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 py-16">
        <div className="grid gap-10 md:grid-cols-[1.15fr,0.85fr] md:items-center">
          <div>
            <span className="inline-flex items-center rounded-full border border-primary-500/40 bg-primary-500/10 px-3 py-1 text-xs uppercase tracking-widest text-primary-200">
              Know before you buy
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight text-slate-100 md:text-5xl">
              Identify halal products effortlessly
            </h1>
            <p className="mt-6 text-lg text-slate-300">
              Upload a photo of any ingredient list and receive an instant halal verdict. When logos are missing, our AI
              pipeline steps through OCR, parsing, and semantic matching so you can shop with confidence.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <PrimaryButton to="/upload" className="hover:no-underline">
                Get Started
              </PrimaryButton>
              <Link
                to="/guide"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary-300 hover:text-primary-200"
              >
                Read the user guide
                <span aria-hidden>&rarr;</span>
              </Link>
            </div>
          </div>
          <div className="relative rounded-3xl border border-slate-800 bg-slate-900 px-6 py-8 shadow-subtle">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="h-10 w-10 rounded-full bg-primary-500/20 text-primary-300 flex items-center justify-center font-semibold">
                  1
                </span>
                <div>
                  <p className="text-sm font-semibold text-primary-200">Scan the label</p>
                  <p className="text-sm text-slate-300/90">Upload any clear product image straight from your phone.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="h-10 w-10 rounded-full bg-primary-500/20 text-primary-300 flex items-center justify-center font-semibold">
                  2
                </span>
                <div>
                  <p className="text-sm font-semibold text-primary-200">Detect logos</p>
                  <p className="text-sm text-slate-300/90">
                    We search for certified halal marks before automatically moving on to the ingredient list.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="h-10 w-10 rounded-full bg-primary-500/20 text-primary-300 flex items-center justify-center font-semibold">
                  3
                </span>
                <div>
                  <p className="text-sm font-semibold text-primary-200">Analyse ingredients</p>
                  <p className="text-sm text-slate-300/90">
                    Gemini OCR + semantic matching cross-checks 39k+ verified phrases for a trustworthy verdict.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-[0_40px_80px_-60px_rgba(34,197,94,0.45)]"
            >
              <h3 className="text-lg font-semibold text-primary-200">{feature.title}</h3>
              <p className="mt-3 text-sm text-slate-300/85">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


