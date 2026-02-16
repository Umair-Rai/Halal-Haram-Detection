import { Link } from "react-router-dom";
import { ArrowRight, Upload, MessageCircle } from "lucide-react";

export function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-white pb-16 pt-12 md:pb-24 md:pt-20 lg:pb-32 lg:pt-28">
            {/* Background Decor */}
            <div className="absolute -left-4 top-0 h-72 w-72 rounded-full bg-emerald-50 mix-blend-multiply blur-3xl filter opacity-70 animate-blob"></div>
            <div className="absolute -right-4 top-0 h-72 w-72 rounded-full bg-teal-50 mix-blend-multiply blur-3xl filter opacity-70 animate-blob animation-delay-2000"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
                    {/* Content */}
                    <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                        <div className="mb-6 inline-flex items-center rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                            <span>Trusted by 10,000+ Users</span>
                        </div>
                        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                            Shop with <span className="text-emerald-600">Confidence</span>. <br className="hidden lg:block" />
                            Eat <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Halal</span>.
                        </h1>
                        <p className="mb-8 max-w-xl text-lg text-slate-600 sm:text-xl">
                            Instantly identify halal ingredients with our AI-powered detection. Upload a photo or ask our chatbot to ensure your food is safe and compliant.
                        </p>
                        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                            <Link
                                to="/upload"
                                className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-8 py-3.5 text-base font-semibold text-white shadow-md transition-transform hover:bg-emerald-700 hover:text-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                            >
                                <Upload className="mr-2 h-5 w-5" />
                                Upload Label
                            </Link>
                            <Link
                                to="/chatbot"
                                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-3.5 text-base font-semibold text-slate-700 shadow-sm transition-transform hover:bg-slate-50 hover:text-emerald-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-2"
                            >
                                <MessageCircle className="mr-2 h-5 w-5" />
                                Ask Chatbot
                            </Link>
                        </div>
                    </div>

                    {/* Visual (Placeholder for now, or CSS art) */}
                    <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none">
                        <div className="relative aspect-square overflow-hidden rounded-3xl bg-slate-100 shadow-2xl lg:aspect-[4/3]">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-white flex items-center justify-center">
                                <div className="p-8 text-center">
                                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-lg text-emerald-600">
                                        <Upload size={40} />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900">Scan & Detect</h3>
                                    <p className="mt-2 text-slate-500">Snap a photo of ingredients list</p>
                                </div>
                                {/* Decorative Floating Elements */}
                                <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-teal-100 opacity-50 blur-2xl"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
