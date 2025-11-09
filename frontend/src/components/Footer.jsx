export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
        <p>&copy; {year} Halal Product Identifier. Helping you shop with confidence.</p>
        <div className="flex flex-wrap items-center gap-4">
          <a href="#upload" className="hover:text-primary-300">
            Upload a label
          </a>
          <a href="#chatbot" className="hover:text-primary-300">
            Ask the chatbot
          </a>
          <a href="#guide" className="hover:text-primary-300">
            View the user guide
          </a>
        </div>
      </div>
    </footer>
  );
}


