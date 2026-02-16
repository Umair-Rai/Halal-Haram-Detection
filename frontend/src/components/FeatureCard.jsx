import { ArrowRight } from "lucide-react";

export function FeatureCard({ icon: Icon, title, description, delay }) {
    return (
        <div
            className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
        >
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-50 transition-all group-hover:bg-emerald-100/50"></div>

            <div className="relative z-10">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                    <Icon size={24} />
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">{title}</h3>
                <p className="text-slate-500 leading-relaxed">{description}</p>
            </div>
        </div>
    );
}
