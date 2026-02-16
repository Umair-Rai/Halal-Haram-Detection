import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, AlertCircle, RefreshCw } from "lucide-react";
import { askChatbot } from "../api/client.js";

export function ChatbotPage() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = { role: "user", content: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const data = await askChatbot(userMessage.content);

      // Transform API response into a chat-friendly format
      let botContent;
      if (data.results.length === 0) {
        botContent = "I couldn't find any specific information about that in my database. Could you try rephrasing or checking the spelling?";
      } else {
        // Create a summary or list from the results
        // For now, we'll display the top match and list others if available
        const topMatch = data.results[0];
        botContent = (
          <div className="space-y-3">
            <p className="font-medium text-slate-800">
              Found a match for <span className="text-emerald-600">"{topMatch.matched_text}"</span>:
            </p>
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
              ${topMatch.status === 'halal' ? 'bg-emerald-100 text-emerald-700' :
                topMatch.status === 'haram' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'}`}>
              {topMatch.status}
            </div>
            {data.results.length > 1 && (
              <p className="text-xs text-slate-500 mt-2">
                (Found {data.results.length} related entries)
              </p>
            )}
          </div>
        );
      }

      const botMessage = { role: "assistant", content: botContent };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorMessage = {
        role: "assistant",
        isError: true,
        content: "Sorry, I encountered an error while processing your request. Please try again."
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    "Is E120 Halal?",
    "Check Gelatin",
    "What is Shellac?",
    "Is Carmine allowed?"
  ];

  return (
    <section className="bg-slate-50 min-h-[calc(100vh-64px)] flex flex-col">
      <div className="flex-1 w-full max-w-4xl mx-auto flex flex-col">

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-0 animate-in fade-in duration-700">
              <div className="h-20 w-20 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-6 text-emerald-500">
                <Sparkles size={40} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Halal AI Assistant</h2>
              <p className="text-slate-500 max-w-md mb-8">
                Ask me about any ingredient or E-code to instantly check its halal status from our verified database.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setInputValue(suggestion)}
                    className="px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-600 hover:border-emerald-200 hover:text-emerald-700 hover:bg-emerald-50/50 transition-all text-left shadow-sm"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6 pb-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="h-10 w-10 shrink-0 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 border border-emerald-200">
                      {msg.isError ? <AlertCircle size={20} className="text-rose-500" /> : <Bot size={20} />}
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] rounded-2xl px-5 py-3.5 shadow-sm text-sm leading-relaxed
                      ${msg.role === "user"
                        ? "bg-emerald-600 text-white rounded-tr-none"
                        : msg.isError
                          ? "bg-rose-50 text-rose-700 border border-rose-100 rounded-tl-none"
                          : "bg-white text-slate-700 border border-slate-100 rounded-tl-none"
                      }`}
                  >
                    {msg.content}
                  </div>

                  {msg.role === "user" && (
                    <div className="h-10 w-10 shrink-0 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                      <User size={20} />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-4 justify-start">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 border border-emerald-200">
                    <Bot size={20} />
                  </div>
                  <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-none px-5 py-4 shadow-sm flex items-center gap-2">
                    <div className="h-2 w-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="h-2 w-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="h-2 w-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-100">
          <form onSubmit={handleSubmit} className="flex gap-3 max-w-4xl mx-auto relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your question here..."
              className="flex-1 bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-full px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all shadow-inner"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="bg-emerald-600 text-white rounded-full p-3.5 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg disabled:shadow-none hover:scale-105 active:scale-95 flex-shrink-0"
            >
              {isLoading ? <RefreshCw size={20} className="animate-spin" /> : <Send size={20} />}
            </button>
          </form>
          <p className="text-center text-[10px] text-slate-400 mt-2">
            AI can make mistakes. Please verify important information.
          </p>
        </div>
      </div>
    </section>
  );
}


