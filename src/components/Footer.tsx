import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-slate-950/80 backdrop-blur-xl py-12 relative overflow-hidden z-20">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-emerald-500/10 blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col items-center md:items-start">
                        <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text mb-2">
                            Agentic Wellness Automator
                        </span>
                        <p className="text-sm text-slate-500">
                            &copy; {new Date().getFullYear()} All rights reserved.
                        </p>
                    </div>

                    <nav className="flex items-center gap-8">
                        <Link
                            href="/faqs"
                            className="text-sm font-medium text-slate-400 hover:text-emerald-400 transition-colors"
                        >
                            FAQs
                        </Link>
                        <Link
                            href="/contact"
                            className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors"
                        >
                            Contact Us
                        </Link>
                        <a
                            href="https://theiyergroup.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-1"
                        >
                            The Iyer Group, LLC
                        </a>
                    </nav>
                </div>
            </div>
        </footer>
    );
}
