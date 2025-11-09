import { useState } from "react";
import { askChatbot } from "../api/client.js";
import { PrimaryButton } from "../components/PrimaryButton.jsx";

export function ChatbotPage() {
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!question.trim()) {
      setError("Please enter a question.");
      return;
    }

    setError("");
    setIsLoading(true);
    setResponse(null);

    try {
      const data = await askChatbot(question);
      setResponse(data);
    } catch (err) {
      setError(err.response?.data?.detail ?? err.message ?? "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="chatbot" className="bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
      <div className="mx-auto w-full max-w-4xl px-4 py-12">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/75 p-8 shadow-subtle backdrop-blur">
          <h2 className="text-2xl font-semibold text-slate-100">Chat about ingredients or E-codes</h2>
          <p className="mt-3 text-sm text-slate-300/85">
            Ask “Is E120 allowed?” or “What is mono and diglycerides?” and we will surface the closest knowledge base
            entries.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <textarea
              className="min-h-[120px] w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 focus:border-primary-400"
              placeholder="Type your question..."
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
            />
            <PrimaryButton type="submit" disabled={isLoading}>
              {isLoading ? "Thinking..." : "Ask the chatbot"}
            </PrimaryButton>
          </form>

          {error && <p className="mt-4 text-sm text-rose-400">{error}</p>}

          {response && (
            <div className="mt-6 space-y-4">
              {response.results.length === 0 && (
                <p className="text-sm text-slate-300/80">No close matches were found in the knowledge base.</p>
              )}
              {response.results.map((item, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs uppercase tracking-widest text-slate-400">Match #{idx + 1}</p>
                    <span className="text-xs text-primary-300">
                      {(item.score * 100).toFixed(1)}
                      <span className="text-[10px] text-slate-400">%</span>
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-slate-100">{item.matched_text}</p>
                  <p className="mt-1 text-xs uppercase tracking-wide text-primary-200">{item.status}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}


