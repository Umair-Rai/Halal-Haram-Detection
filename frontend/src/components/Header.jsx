import { NavLink } from "react-router-dom";

const navLinkClasses = ({ isActive }) =>
  [
    "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200",
    isActive
      ? "bg-primary-500 text-slate-950"
      : "text-slate-100/80 hover:bg-primary-500/20 hover:text-primary-200",
  ].join(" ");

export function Header() {
  const currentPath = typeof window !== "undefined" ? window.location.pathname : "/";

  return (
    <header className="border-b border-slate-800 bg-slate-950/95 backdrop-blur sticky top-0 z-50">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
        <NavLink to="/" className="flex items-center gap-2 text-lg font-semibold text-primary-300">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary-500 text-slate-900 font-bold">
            H
          </span>
          <span>Halal Product Identifier</span>
        </NavLink>
        <nav className="hidden gap-1 md:flex">
          <NavLink to="/" className={navLinkClasses} end>
            Home
          </NavLink>
          <NavLink to="/upload" className={navLinkClasses}>
            Upload
          </NavLink>
          <NavLink to="/chatbot" className={navLinkClasses}>
            Chatbot
          </NavLink>
          <NavLink to="/guide" className={navLinkClasses}>
            User Guide
          </NavLink>
        </nav>
        <select
          className="md:hidden rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100/80 focus:border-primary-500"
          onChange={(event) => {
            const target = event.target.value;
            if (target && typeof window !== "undefined") {
              window.location.href = target;
            }
          }}
          defaultValue={currentPath}
        >
          <option value="/">Home</option>
          <option value="/upload">Upload</option>
          <option value="/chatbot">Chatbot</option>
          <option value="/guide">User Guide</option>
        </select>
      </div>
    </header>
  );
}


