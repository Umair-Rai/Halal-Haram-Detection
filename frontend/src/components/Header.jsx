import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinkClasses = ({ isActive }) =>
  [
    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
    isActive
      ? "bg-emerald-100 text-emerald-700 font-semibold"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
  ].join(" ");

const mobileNavLinkClasses = ({ isActive }) =>
  [
    "block px-4 py-3 rounded-lg text-base font-medium transition-colors",
    isActive
      ? "bg-emerald-50 text-emerald-700"
      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
  ].join(" ");

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 text-lg font-bold text-slate-900" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-sm">
            <span className="font-bold">H</span>
          </div>
          <span>Halal Identifier</span>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
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

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link
            to="/upload"
            className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition-transform hover:scale-105 hover:bg-slate-800 active:scale-95"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="rounded-md p-2 text-slate-600 hover:bg-slate-100 md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute left-0 right-0 top-16 border-b border-slate-200 bg-white px-4 py-4 shadow-lg md:hidden">
          <nav className="flex flex-col gap-2">
            <NavLink to="/" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)} end>
              Home
            </NavLink>
            <NavLink to="/upload" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>
              Upload
            </NavLink>
            <NavLink to="/chatbot" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>
              Chatbot
            </NavLink>
            <NavLink to="/guide" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>
              User Guide
            </NavLink>
            <hr className="my-2 border-slate-100" />
            <Link
              to="/upload"
              className="block w-full rounded-lg bg-emerald-600 px-4 py-3 text-center text-sm font-bold text-white shadow-sm hover:bg-emerald-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Started
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}


