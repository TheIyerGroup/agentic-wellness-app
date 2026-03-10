export default function ContactPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 py-24 px-4 selection:bg-emerald-500/30">
            <div className="max-w-2xl mx-auto space-y-12 relative z-10">
                <div className="text-center space-y-4">
                    <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text">
                        Contact Us
                    </h1>
                    <p className="text-lg text-slate-400">We're here to help you optimize your logistics.</p>
                </div>

                <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-white/10 p-8 md:p-12 shadow-2xl text-center">
                    <p className="text-slate-300 font-medium text-lg mb-8">
                        For support, enterprise inquiries, or general questions, please reach out to our team at The Iyer Group.
                    </p>
                    <a
                        href="https://www.iyergrp.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-12 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 text-sm font-bold text-slate-950 shadow-lg hover:opacity-90 transition-opacity"
                    >
                        Visit The Iyer Group
                    </a>
                </div>
            </div>
        </div>
    );
}
