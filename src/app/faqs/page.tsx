export default function FAQsPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 py-24 px-4 selection:bg-emerald-500/30">
            <div className="max-w-4xl mx-auto space-y-12 relative z-10">
                <div className="text-center space-y-4">
                    <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-lg text-slate-400">Everything you need to know about your data and the Agentic Wellness Automator.</p>
                </div>

                <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl space-y-10">
                    <div>
                        <h3 className="text-xl font-bold tracking-tight text-emerald-400 mb-3">
                            How does the AI model process my personal health details and blood tests to create a plan?
                        </h3>
                        <p className="text-slate-300 leading-relaxed font-light">
                            Our platform utilizes an advanced 'Three-Layer Cognitive Architecture' to act as a reasoning engine, not just a chatbot. In the Perception Layer, the system receives your raw input (like health questionnaires and optional blood test metrics) and structures it. In the Reasoning Layer, our AI (Gemini 3.1 Pro) decomposes your complex health data and biomarkers to generate a highly tailored, step-by-step wellness plan. Finally, the Action Layer formats this plan into your readable dashboard.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold tracking-tight text-emerald-400 mb-3">
                            How do you protect my sensitive health data and test results?
                        </h3>
                        <p className="text-slate-300 leading-relaxed font-light">
                            We practice strict 'Privacy and Compliance by Design'. Before any of your health metrics are sent to the AI for analysis, they pass through a Trust Layer that strips away all Personally Identifiable Information (PII) to ensure your data is completely anonymized. Furthermore, we strictly opt-out of AI training; your personal data and prompts are never stored, monitored, or used by Google to train public models. Your identity is securely isolated by Clerk, and your data is encrypted at rest in our database. (Learn more about global data privacy standards like the EU AI Act and GDPR <a href="https://artificialintelligenceact.eu/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4">here</a>)
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold tracking-tight text-cyan-400 mb-3">
                            Can I delete the information I have submitted?
                        </h3>
                        <p className="text-slate-300 leading-relaxed font-light">
                            Absolutely. We believe in data minimization and your 'right to be forgotten'. You can visit the 'Privacy & Data Management' tab in your dashboard at any time to permanently delete your account. Doing so will instantly and irreversibly erase your profile, generated wellness plans, and any uploaded blood test results from our active databases.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold tracking-tight text-white mb-3">
                            How do the AI Credits work?
                        </h3>
                        <p className="text-slate-400 leading-relaxed font-light">
                            Each time you click "Synthesize Plan", our AI engine deducts exactly 1 credit. The Agentic Pro subscription grants you 1,200 credits every year.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
