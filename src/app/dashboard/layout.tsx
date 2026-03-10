import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { LayoutDashboard, User, CreditCard, Activity, Coins, ShieldAlert } from "lucide-react";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const clerkUser = await currentUser();
    let aiCredits = 0;

    if (clerkUser) {
        const userRecord = await db.query.users.findFirst({
            where: eq(users.clerkId, clerkUser.id)
        });
        if (userRecord) aiCredits = userRecord.aiCredits;
    }

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950 font-sans selection:bg-emerald-500/30">
            {/* Sidebar - Polished Glassmorphic */}
            <aside className="w-[280px] border-r border-slate-200/50 dark:border-white/10 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl flex flex-col relative z-20 shadow-2xl shadow-slate-200/20 dark:shadow-none transition-all">
                <div className="h-20 flex items-center px-8 border-b border-slate-200/50 dark:border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                            <Activity className="w-5 h-5 text-slate-950" />
                        </div>
                        <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">Agentic</span>
                    </div>
                </div>

                <nav className="flex-1 px-4 py-8 space-y-2 relative">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-4">Menu</div>
                    <Link href="/dashboard" className="group flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-white/5 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all font-medium">
                        <LayoutDashboard className="w-5 h-5 transition-transform group-hover:scale-110" />
                        Dashboard
                    </Link>
                    <Link href="/dashboard/profile" className="group flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-white/5 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all font-medium">
                        <User className="w-5 h-5 transition-transform group-hover:scale-110" />
                        My Profile
                    </Link>
                    <Link href="/dashboard/privacy" className="group flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-white/5 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all font-medium">
                        <ShieldAlert className="w-5 h-5 transition-transform group-hover:scale-110" />
                        Privacy & Data
                    </Link>
                    <Link href="/pricing" className="group flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-white/5 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all font-medium">
                        <CreditCard className="w-5 h-5 transition-transform group-hover:scale-110" />
                        Billing & Credits
                    </Link>
                </nav>

                {/* AI Credits Display */}
                <div className="px-6 mb-6">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 border border-slate-700/50 shadow-inner flex flex-col gap-2">
                        <div className="flex items-center justify-between text-slate-300">
                            <span className="text-xs font-semibold uppercase tracking-wider">AI Credits</span>
                            <Coins className="w-4 h-4 text-emerald-400" />
                        </div>
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold text-white">{aiCredits}</span>
                            <span className="text-sm font-medium text-slate-400">remaining</span>
                        </div>
                    </div>
                </div>

                <div className="p-6 border-t border-slate-200/50 dark:border-white/10 bg-white/30 dark:bg-slate-900/30">
                    <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/50 dark:hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-slate-200/50 dark:hover:border-white/10">
                        <div className="ring-2 ring-emerald-500/20 rounded-full p-0.5">
                            <UserButton appearance={{ elements: { avatarBox: "w-9 h-9" } }} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">Account</span>
                            <span className="text-xs text-slate-500">Manage settings</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto relative">
                {/* Subtle Background Elements */}
                <div className="fixed top-[-20%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="p-8 lg:p-12 relative z-10 max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
