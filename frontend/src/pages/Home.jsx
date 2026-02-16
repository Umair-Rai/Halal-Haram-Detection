import { Scan, ShieldCheck, Database, Zap } from "lucide-react";
import { HeroSection } from "../components/HeroSection.jsx";
import { FeatureCard } from "../components/FeatureCard.jsx";

const features = [
  {
    icon: Scan,
    title: "Smart OCR & Detection",
    description:
      "Gemini extracts label text while our trained YOLO model instantly recognises certified halal logos.",
  },
  {
    icon: Database,
    title: "Knowledge Base Powered",
    description:
      "A curated dataset of 39k+ phrases lets us classify ingredients using semantic search, not brittle keyword lists.",
  },
  {
    icon: Zap,
    title: "Instant Ingredient Help",
    description: "Ask the chatbot about E-codes, additives, or ingredient aliases to get fast clarity.",
  },
];

export function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />

      {/* Features Section */}
      <section id="features" className="bg-slate-50 py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Why Choose Halal Identifier?
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              We combine advanced AI with a massive database to give you the most accurate halal verdicts.
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to shop with confidence?</h2>
          <p className="text-emerald-100 mb-8 max-w-2xl mx-auto text-lg">
            Join thousands of users who rely on our app for their daily grocery shopping.
          </p>
          <a href="/upload" className="inline-block bg-white text-emerald-900 font-bold py-3 px-8 rounded-full hover:bg-emerald-50 transition-colors">
            Start Scanning Now
          </a>
        </div>
      </section>
    </div>
  );
}


