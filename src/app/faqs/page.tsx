export default function FAQsPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 py-24 px-4 selection:bg-emerald-500/30">
            <div className="max-w-3xl mx-auto space-y-12 relative z-10">
                <div className="text-center space-y-4">
                    <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-lg text-slate-400">Everything you need to know about the Agentic Wellness Automator.</p>
                </div>

                <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl space-y-8">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">How does the AI work?</h3>
                        <p className="text-slate-400 leading-relaxed">Our advanced Gemini integration analyzes the biometric inputs and goals you save in your Dashboard Profile. It then synthesizes that data against cutting-edge wellness protocols to generate a custom-tailored daily routing.</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">How do the AI Credits work?</h3>
                        <p className="text-slate-400 leading-relaxed">Each time you click "Synthesize Plan", our AI engine deducts exactly 1 credit. The Agentic Pro subscription grants you 100 credits every month.</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">Is my data secure?</h3>
                        <p className="text-slate-400 leading-relaxed">Absolutely. We use Clerk for state-of-the-art authentication and Neon serverless Postgres for highly secure database architecture. Your data is never sold.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
