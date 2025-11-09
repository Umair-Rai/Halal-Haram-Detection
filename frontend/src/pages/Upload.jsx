import { useState } from "react";
import { analyzeProduct } from "../api/client.js";
import { PrimaryButton } from "../components/PrimaryButton.jsx";

const statusColors = {
  halal: "text-emerald-400 bg-emerald-500/10",
  haram: "text-rose-400 bg-rose-500/10",
  doubtful: "text-amber-400 bg-amber-500/10",
  unknown: "text-slate-300 bg-slate-700/30",
};

export function UploadPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted");
    console.log("Selected file:", selectedFile);

    if (!selectedFile) {
      setError("Please choose an image to upload.");
      return;
    }

    setError("");
    setIsLoading(true);
    setResult(null);

    try {
      console.log("Calling analyzeProduct...");
      const response = await analyzeProduct(selectedFile);
      console.log("Response received:", response);
      setResult(response);
    } catch (err) {
      console.error("Error during analysis:", err);
      setError(err.response?.data?.detail ?? err.message ?? "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const statusClass = result ? statusColors[result.status] ?? statusColors.unknown : "";

  return (
    <section id="upload" className="bg-slate-950">
      <div className="mx-auto w-full max-w-5xl px-4 py-12">
        <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-subtle backdrop-blur"
          >
            <h2 className="text-2xl font-semibold text-slate-100">Upload a product label</h2>
            <p className="mt-3 text-sm text-slate-300/90">
              Supported formats: JPG, PNG, HEIC. For best results capture the ingredients panel in sharp focus.
            </p>

            <label
              htmlFor="file-upload"
              className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-primary-500/40 bg-primary-500/5 px-6 py-12 text-center transition hover:border-primary-500/70"
            >
              <span className="text-sm font-medium text-primary-200">
                {selectedFile ? selectedFile.name : "Click to choose or drag a file here"}
              </span>
              <span className="mt-2 text-xs text-slate-400">Max 10 MB • Images only</span>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  setSelectedFile(file ?? null);
                }}
              />
            </label>

            <PrimaryButton type="submit" className="mt-8 w-full" disabled={isLoading}>
              {isLoading ? "Analysing..." : "Analyse product"}
            </PrimaryButton>

            {error && <p className="mt-4 text-sm text-rose-400">{error}</p>}
          </form>

          <div className="space-y-6">
            {!result && (
              <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8">
                <h3 className="text-lg font-semibold text-slate-100">What to expect</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-300/85">
                  <li>
                    <span className="font-medium text-primary-200">1.</span> If a halal logo is detected the verdict is
                    instant.
                  </li>
                  <li>
                    <span className="font-medium text-primary-200">2.</span> Otherwise we run OCR and parse the
                    ingredients list automatically.
                  </li>
                  <li>
                    <span className="font-medium text-primary-200">3.</span> The final verdict compares the list against
                    our curated knowledge base.
                  </li>
                </ul>
              </div>
            )}

            {result && (
              <div className="space-y-6">
                <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-subtle">
                  <div className="flex items-center justify-between">
                    <p className="text-xs uppercase tracking-widest text-slate-400">Final verdict</p>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass}`}>
                      {result.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="mt-4 text-sm text-slate-300/90">{result.matched_text}</p>
                  {!result.logo_detected && (
                    <p className="mt-3 text-xs text-slate-400">
                      Semantic match score: {(result.score * 100).toFixed(1)}%
                    </p>
                  )}
                </div>

                {!result.logo_detected && result.ingredients?.length > 0 && (
                  <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
                    <p className="text-sm font-semibold text-primary-200">Ingredients detected</p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {result.ingredients.map((item, idx) => (
                        <li key={`${item}-${idx}`} className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-200">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.ingredients_block && (
                  <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
                    <p className="text-sm font-semibold text-primary-200">Raw ingredients block</p>
                    <p className="mt-3 whitespace-pre-wrap text-sm text-slate-300/90">{result.ingredients_block}</p>
                  </div>
                )}

                {result.ocr_text && (
                  <details className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
                    <summary className="cursor-pointer text-sm font-semibold text-primary-200">
                      Full OCR transcript
                    </summary>
                    <pre className="mt-3 max-h-64 overflow-y-auto whitespace-pre-wrap text-xs text-slate-300/80">
                      {result.ocr_text}
                    </pre>
                  </details>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}


