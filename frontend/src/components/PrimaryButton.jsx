import { Link } from "react-router-dom";

const baseClasses =
  "inline-flex items-center justify-center rounded-lg bg-primary-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-subtle transition-transform duration-200 hover:-translate-y-0.5 hover:bg-primary-400 focus-visible:ring-2 focus-visible:ring-primary-200 disabled:translate-y-0 disabled:opacity-60 disabled:pointer-events-none";

export function PrimaryButton({ children, className = "", to, href, ...props }) {
  const combined = `${baseClasses} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={combined} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combined} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={combined} {...props}>
      {children}
    </button>
  );
}


