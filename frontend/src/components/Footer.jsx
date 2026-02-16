import { Link } from "react-router-dom";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 px-4 py-8 md:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-emerald-600 text-[10px] font-bold text-white">H</div>
          <p className="text-sm font-medium text-slate-900">&copy; {year} Halal Product Identifier</p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-slate-500">
          <Link to="/upload" className="transition-colors hover:text-emerald-600">
            Upload a label
          </Link>
          <Link to="/chatbot" className="transition-colors hover:text-emerald-600">
            Ask the chatbot
          </Link>
          <Link to="/guide" className="transition-colors hover:text-emerald-600">
            User Guide
          </Link>
        </div>
      </div>
    </footer>
  );
}


