import { db } from "@/db";
import { users, wellnessPlans } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CalendarDays, ArrowLeft } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

export default async function HistoryPage() {
    const clerkUser = await currentUser();
    if (!clerkUser) redirect("/sign-in");

    const userRecord = await db.query.users.findFirst({
        where: eq(users.clerkId, clerkUser.id)
    });

    let history: any[] = [];
    if (userRecord) {
        history = await db.query.wellnessPlans.findMany({
            where: eq(wellnessPlans.userId, userRecord.id),
            orderBy: [desc(wellnessPlans.createdAt)],
        });
    }

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 flex items-center gap-3">
                        <CalendarDays className="w-8 h-8 text-emerald-500" />
                        Plan History
                    </h1>
                    <p className="text-slate-500 mt-2 text-lg">Review your previously generated wellness logistics.</p>
                </div>
                <Link href="/dashboard">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 shadow-sm dark:bg-slate-900 dark:text-white dark:border-slate-800 dark:hover:bg-slate-800 rounded-lg font-semibold transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                    </button>
                </Link>
            </header>

            {history.length === 0 ? (
                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-slate-800 p-12 text-center">
                    <p className="text-slate-500 text-lg">You have not generated any wellness plans yet.</p>
                </div>
            ) : (
                <div className="space-y-8">
                    {history.map((plan) => (
                        <div key={plan.id} className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-lg">
                            <div className="mb-6 flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                                <span className="font-semibold text-slate-400">
                                    {new Date(plan.createdAt).toLocaleDateString(undefined, {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </span>
                            </div>
                            <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:text-emerald-700 dark:prose-headings:text-emerald-400 prose-a:text-cyan-500">
                                <ReactMarkdown>{plan.planContent}</ReactMarkdown>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
