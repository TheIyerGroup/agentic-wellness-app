import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Activity } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export function Header() {
    return (
        <header className="px-6 lg:px-12 flex h-20 items-center justify-between border-b border-white/10 bg-slate-950/80 backdrop-blur-md sticky top-0 z-[100] w-full">
            <Link href="/" className="flex items-center gap-3 relative z-10 hover:opacity-90 transition-opacity">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <Activity className="w-5 h-5 text-slate-950" />
                </div>
                <span className="text-xl font-bold tracking-tight text-white">Agentic Wellness</span>
            </Link>
            <nav className="flex gap-4 relative z-10 items-center">
                <SignedOut>
                    <Link href="/sign-in">
                        <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/5 transition-colors">Sign In</Button>
                    </Link>
                    <Link href="/sign-up">
                        <Button className="bg-white text-slate-950 hover:bg-slate-200 transition-colors font-semibold shadow-xl shadow-white/10">
                            Get Started
                        </Button>
                    </Link>
                </SignedOut>
                <SignedIn>
                    <Link href="/dashboard">
                        <Button variant="ghost" className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-400/10 transition-colors font-semibold mr-2">
                            Dashboard
                        </Button>
                    </Link>
                    <div className="ring-2 ring-emerald-500/20 rounded-full p-0.5 mt-1">
                        <UserButton appearance={{ elements: { avatarBox: "w-8 h-8" } }} />
                    </div>
                </SignedIn>
            </nav>
        </header>
    );
}
