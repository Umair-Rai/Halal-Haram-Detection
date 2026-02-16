import { Camera, UploadCloud, FileText, MessageCircle, CheckCircle, Lightbulb, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    title: "Capture a clear photo",
    icon: Camera,
    detail: "Photograph the ingredients panel in good lighting. Avoid glare and ensure the entire list fits within the frame.",
    highlights: [
      "Face the ingredients label straight on.",
      "Fill the frame to keep text crisp.",
      "Wipe the lens so the contrast stays sharp.",
    ],
  },
  {
    title: "Upload and review",
    icon: UploadCloud,
    detail: "Drop the image into the Upload page. We first look for certified halal logos; otherwise we run the OCR pipeline.",
    highlights: [
      "Drag & drop or select a file from your device.",
      "Confirm the preview looks readable.",
      "Let the automated checks finish before moving on.",
    ],
  },
  {
    title: "Interpret the verdict",
    icon: FileText,
    detail: "View the match score, see the ingredient breakdown, and optionally review the full OCR transcript for verification.",
    highlights: [
      "Start with the overall halal verdict banner.",
      "Scan the flagged ingredient list for alerts.",
      "Open the transcript to double-check edge cases.",
    ],
  },
  {
    title: "Ask follow-up questions",
    icon: MessageCircle,
    detail: "Unsure about an ingredient? Head to the Chatbot page to cross-check additives, E-codes, or alternate names instantly.",
    highlights: [
      "Reference E-codes or additives by name.",
      "Save clarifications for future audits.",
      "Share conclusions with teammates quickly.",
    ],
  },
];

export function GuidePage() {
  return (
    <section className="bg-slate-50 py-16 md:py-24">
      <div className="mx-auto w-full max-w-6xl px-4">

        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-700 border border-emerald-100 mb-6">
            <Lightbulb size={14} className="fill-emerald-700" />
            How it works
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl mb-6">
            From capture to verdict in seconds.
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Follow these simple steps to verify your products accurately and efficiently.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="relative flex flex-col"
              >
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300 w-full h-full">
                  <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6">
                    <Icon size={24} />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-3">
                    <span className="text-emerald-500 text-xs font-bold uppercase tracking-widest mb-1 block">Step {index + 1}</span>
                    {step.title}
                  </h3>

                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {step.detail}
                  </p>

                  <ul className="space-y-3">
                    {step.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-3 text-sm text-slate-500">
                        <CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pro Tips Section */}
        <div className="mt-24 lg:mt-32 rounded-3xl bg-emerald-900 p-8 md:p-12 overflow-hidden relative">
          {/* Background Decorative Circles */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-emerald-800/30 blur-3xl" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="relative z-10 grid gap-8 md:grid-cols-[1fr,1.5fr] md:items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Pro tips for accuracy
              </h3>
              <p className="text-emerald-100 leading-relaxed mb-8">
                Small adjustments to your process can significantly improve detection reliability and save you time.
              </p>
              <Link to="/upload" className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-900 shadow-lg hover:bg-emerald-50 hover:scale-105 transition-all">
                Try it now
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Crop images to focus strictly on ingredients.",
                "Use the chatbot for quick E-code lookups.",
                "Capture in bright, even lighting.",
                "Keep local copies of offline databases."
              ].map((tip, i) => (
                <div key={i} className="bg-emerald-800/50 backdrop-blur-sm border border-emerald-700/50 rounded-2xl p-4">
                  <p className="text-sm text-emerald-50 leading-relaxed font-medium">
                    {tip}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}


