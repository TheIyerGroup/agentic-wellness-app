import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Activity, Brain, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-50 relative overflow-hidden selection:bg-emerald-500/30">
      {/* Premium Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/20 rounded-full blur-[120px] pointer-events-none" />

      <header className="px-6 lg:px-12 flex h-20 items-center justify-between border-b border-white/10 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Activity className="w-5 h-5 text-slate-950" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">Agentic Wellness</h1>
        </div>
        <nav className="flex gap-4 relative z-10">
          <Link href="/sign-in">
            <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/5 transition-colors">Sign In</Button>
          </Link>
          <Link href="/sign-up">
            <Button className="bg-white text-slate-950 hover:bg-slate-200 transition-colors font-semibold shadow-xl shadow-white/10">
              Get Started
            </Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-32 relative z-10">
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-sm font-medium mb-8 animate-in slide-in-from-bottom-4 fade-in duration-700">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Next-Gen AI Logistics Engine Live
        </div>

        {/* Hero Headline */}
        <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 max-w-4xl animate-in slide-in-from-bottom-8 fade-in duration-1000">
          Your Intelligent
          <span className="block mt-2 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 text-transparent bg-clip-text drop-shadow-sm">
            Health & Wellness Routine
          </span>
        </h2>

        {/* Subheadline */}
        <p className="max-w-[700px] text-lg md:text-xl text-slate-400 mb-12 animate-in slide-in-from-bottom-10 fade-in duration-1000 delay-150 leading-relaxed font-light">
          Stop guessing. Start optimizing. Agentic Wellness analyzes your precise metrics to generate dynamic lifestyle, habit, and nutritional logistics tailored exclusively to your goals.
        </p>

        {/* Call to Action */}
        <div className="flex flex-col sm:flex-row gap-6 animate-in slide-in-from-bottom-12 fade-in duration-1000 delay-300">
          <Link href="/dashboard">
            <Button size="lg" className="h-14 px-8 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold text-lg rounded-full shadow-2xl shadow-emerald-500/25 transition-all group">
              Start Your Optimization
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Value Props Grid */}
        <div className="mt-32 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 text-left animate-in fade-in duration-1000 delay-500">
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
            <Brain className="w-10 h-10 text-cyan-400 mb-6" />
            <h3 className="text-xl font-semibold text-white mb-3">Adaptive Intelligence</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Our AI constantly recalculates your ideal logistics based on shifting metrics and lifestyle changes.
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
            <Activity className="w-10 h-10 text-emerald-400 mb-6" />
            <h3 className="text-xl font-semibold text-white mb-3">Precision Logistics</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Granular breakdowns of your nutritional needs, activity schedules, and recovery protocols.
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
            <ShieldCheck className="w-10 h-10 text-teal-400 mb-6" />
            <h3 className="text-xl font-semibold text-white mb-3">Safe & Compliant</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Designed with strict guardrails to promote healthy, sustainable lifestyle changes—never medical diagnoses.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
