import { Outlet } from "react-router-dom";
import { Header } from "../components/Header.jsx";
import { Footer } from "../components/Footer.jsx";

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}


