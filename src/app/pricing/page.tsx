import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
    return (
        <div className="flex flex-col min-h-screen bg-slate-950 text-slate-50 relative overflow-hidden py-24 selection:bg-emerald-500/30">
            {/* Background Glows */}
            <div className="absolute top-[-20%] left-[20%] w-[60%] h-[60%] bg-emerald-600/10 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-3xl mx-auto text-center space-y-6 mb-16 relative z-10 px-4">
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text">
                    Simple, Transparent Pricing
                </h1>
                <p className="text-xl text-slate-400 font-light">
                    Subscribe. Get AI Credits. Optimize Your Health.
                </p>
            </div>

            <div className="max-w-md mx-auto w-full relative z-10 px-4">
                {/* Glow Behind Card */}
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-[2rem] blur opacity-25" />

                <div className="bg-slate-900/80 backdrop-blur-xl rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden relative">

                    <div className="absolute top-0 right-0 px-4 py-1.5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 text-xs font-extrabold uppercase rounded-bl-2xl tracking-widest shadow-lg">
                        Agentic Pro
                    </div>

                    <div className="p-10 border-b border-white/10 text-center">
                        <div className="inline-flex items-center justify-center p-3 bg-white/5 border border-white/10 rounded-2xl mb-6 shadow-xl backdrop-blur-md">
                            <Sparkles className="w-8 h-8 text-emerald-400" />
                        </div>
                        <div className="flex justify-center items-baseline gap-2 mb-4">
                            <span className="text-6xl font-extrabold tracking-tighter text-white">$9.99</span>
                            <span className="text-slate-500 font-medium text-lg">/ month</span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Everything you need for comprehensive AI wellness scheduling and precise nutritional logistics.
                        </p>
                    </div>

                    <div className="p-10 bg-slate-950/50 flex flex-col gap-6">
                        <div className="flex items-start gap-4">
                            <div className="p-1 rounded-full bg-emerald-500/20 mt-0.5">
                                <Check className="h-4 w-4 text-emerald-400" strokeWidth={3} />
                            </div>
                            <span className="text-slate-300 font-medium">Full Profile Health Metrics Tracking</span>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="p-1 rounded-full bg-emerald-500/20 mt-0.5">
                                <Check className="h-4 w-4 text-emerald-400" strokeWidth={3} />
                            </div>
                            <span className="text-slate-300 font-medium">Personalized Nutrition Routines</span>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="p-1 rounded-full bg-emerald-500/20 mt-0.5">
                                <Check className="h-4 w-4 text-emerald-400" strokeWidth={3} />
                            </div>
                            <span className="text-slate-300 font-medium">Habit & Fitness Logistics Generation</span>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="p-1 rounded-full bg-cyan-500/20 mt-0.5">
                                <Check className="h-4 w-4 text-cyan-400" strokeWidth={3} />
                            </div>
                            <span className="text-cyan-300 font-semibold drop-shadow-sm">100 AI Generation Credits / month</span>
                        </div>

                        <form action="/api/checkout" method="POST">
                            <Button size="lg" type="submit" className="h-14 w-full mt-6 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold text-lg rounded-xl shadow-2xl shadow-emerald-500/25 transition-all">
                                Subscribe Now
                            </Button>
                        </form>
                        <div className="text-center space-y-2 mt-4">
                            <p className="text-xs text-slate-500 flex items-center justify-center gap-1.5 font-medium">
                                Secure payments accepted via:
                            </p>
                            <p className="text-xs text-slate-400">
                                PayPal, Google Pay, Apple Pay, Visa, Mastercard, and Amex
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <Link href="/dashboard" className="text-sm font-medium text-slate-500 hover:text-white transition-colors">
                        Return to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}
