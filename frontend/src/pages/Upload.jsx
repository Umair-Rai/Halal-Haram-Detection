import { useState } from "react";
import { UploadCloud, FileImage, AlertCircle, CheckCircle, HelpCircle, XCircle, Search, ScanLine } from "lucide-react";
import { analyzeProduct } from "../api/client.js";

const statusConfig = {
  halal: {
    color: "text-emerald-700 bg-emerald-50 border-emerald-100",
    icon: CheckCircle,
    label: "Halal",
  },
  haram: {
    color: "text-rose-700 bg-rose-50 border-rose-100",
    icon: XCircle,
    label: "Haram",
  },
  doubtful: {
    color: "text-amber-700 bg-amber-50 border-amber-100",
    icon: HelpCircle,
    label: "Mushbooh",
  },
  unknown: {
    color: "text-slate-600 bg-slate-100 border-slate-200",
    icon: HelpCircle,
    label: "Unknown",
  },
};

export function UploadPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setError("Please choose an image to upload.");
      return;
    }

    setError("");
    setIsLoading(true);
    setResult(null);

    try {
      const response = await analyzeProduct(selectedFile);
      setResult(response);
    } catch (err) {
      console.error("Error during analysis:", err);
      setError(err.response?.data?.detail ?? err.message ?? "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const currentStatus = result ? statusConfig[result.status] ?? statusConfig.unknown : null;
  const StatusIcon = currentStatus?.icon;

  return (
    <section className="bg-slate-50 py-12 md:py-20 min-h-[calc(100vh-64px)]">
      <div className="mx-auto w-full max-w-5xl px-4">
        <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr] lg:gap-12">

          {/* Left Column: Upload Form */}
          <div>
            <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-100">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Scan Product</h1>
                <p className="mt-2 text-slate-600">
                  Upload a clear image of the ingredients list. We support JPG, PNG, and HEIC formats.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <label
                  htmlFor="file-upload"
                  className={`group relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-12 transition-all duration-300
                    ${selectedFile
                      ? "border-emerald-500 bg-emerald-50/30"
                      : "border-slate-300 bg-slate-50 hover:border-emerald-400 hover:bg-emerald-50/30"
                    }`}
                >
                  <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110
                    ${selectedFile ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400 group-hover:bg-emerald-100 group-hover:text-emerald-600"}`}>
                    {selectedFile ? <FileImage size={32} /> : <UploadCloud size={32} />}
                  </div>

                  <div className="text-center">
                    <span className="text-lg font-semibold text-slate-900 block mb-1">
                      {selectedFile ? selectedFile.name : "Click to upload"}
                    </span>
                    <span className="text-sm text-slate-500">
                      {selectedFile ? "Click to change file" : "or drag and drop here"}
                    </span>
                  </div>

                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      setSelectedFile(file ?? null);
                      setError("");
                    }}
                  />
                </label>

                {error && (
                  <div className="flex items-center gap-2 rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    <AlertCircle size={16} />
                    <p>{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || !selectedFile}
                  className="inline-flex w-full items-center justify-center rounded-full bg-emerald-600 px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-emerald-700 hover:shadow-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:bg-slate-300 disabled:shadow-none disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <ScanLine className="mr-2 h-5 w-5 animate-spin" />
                      Analysing...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-5 w-5" />
                      Analyse Ingredients
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Results & Info */}
          <div className="space-y-6">
            {!result && (
              <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-100 h-full">
                <h3 className="text-lg font-bold text-slate-900 mb-6">How it works</h3>
                <ul className="space-y-6">
                  {[
                    { title: "Scan Label", desc: "Upload a photo of the product", icon: ScanLine },
                    { title: "Detect Logos", desc: "We check for certified halal marks", icon: CheckCircle },
                    { title: "Smart Analysis", desc: "AI reads ingredients and checks our database", icon: Search },
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 font-bold text-sm">
                          {i + 1}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">{item.title}</h4>
                        <p className="text-sm text-slate-500">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result && currentStatus && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Main Verdict Card */}
                <div className={`rounded-3xl p-8 border shadow-sm ${currentStatus.color}`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-1">Final Verdict</p>
                      <h2 className="text-3xl font-extrabold">{currentStatus.label}</h2>
                    </div>
                    {StatusIcon && <StatusIcon size={48} className="opacity-20" />}
                  </div>

                  <div className="mt-6 pt-6 border-t border-black/5">
                    <p className="font-medium text-lg leading-snug">
                      {result.matched_text}
                    </p>
                    {!result.logo_detected && (
                      <div className="mt-4 flex items-center gap-2 text-sm opacity-80">
                        <span className="font-semibold">{Math.round(result.score * 100)}%</span>
                        confidence score
                      </div>
                    )}
                  </div>
                </div>

                {/* Additional Details */}
                {!result.logo_detected && result.ingredients?.length > 0 && (
                  <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">Detected Ingredients</h3>
                    <div className="flex flex-wrap gap-2">
                      {result.ingredients.map((item, idx) => (
                        <span key={idx} className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* OCR Debug Toggle */}
                {result.ocr_text && (
                  <div className="rounded-3xl bg-white shadow-sm border border-slate-100 overflow-hidden">
                    <details className="group">
                      <summary className="flex cursor-pointer items-center justify-between p-6 hover:bg-slate-50">
                        <span className="text-sm font-semibold text-slate-900">View Full Text</span>
                        <Search size={16} className="text-slate-400 transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="bg-slate-50 p-6 pt-0 border-t border-slate-100">
                        <pre className="whitespace-pre-wrap text-xs text-slate-500 font-mono leading-relaxed mt-4">
                          {result.ocr_text}
                        </pre>
                      </div>
                    </details>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}


