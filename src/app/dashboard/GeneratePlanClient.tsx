"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Activity } from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export function GeneratePlanClient() {
    const [generating, setGenerating] = useState(false);
    const router = useRouter();

    const handleGenerate = async () => {
        setGenerating(true);
        const toastId = toast.loading("Synthesizing your Agentic Wellness Plan with Gemini...");

        try {
            const res = await fetch("/api/generate-plan", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });

            const data = await res.json();

            if (!res.ok) {
                if (res.status === 402) {
                    toast.error(data.error || "Insufficient Credits. Please upgrade.", { id: toastId });
                    router.push("/pricing");
                } else if (res.status === 400) {
                    toast.error(data.error || "Please complete your profile first.", { id: toastId });
                    router.push("/dashboard/profile");
                } else {
                    throw new Error(data.error || "Generation error");
                }
                return;
            }

            toast.success("Wellness Plan Synthesized Successfully!", { id: toastId });
            router.refresh(); // Refresh dashboard page to show the newly generated plan and update credit count

        } catch (error: any) {
            toast.error(error.message || "Failed to generate plan.", { id: toastId });
        } finally {
            setGenerating(false);
        }
    };

    return (
        <div className="flex items-center gap-4">
            <Button
                size="lg"
                onClick={handleGenerate}
                disabled={generating}
                className="h-14 px-8 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold text-lg rounded-xl shadow-2xl shadow-emerald-500/25 transition-all"
            >
                {generating ? "Synthesizing..." : "Synthesize Plan"}
            </Button>
            <span className="text-sm font-medium text-slate-500 flex items-center gap-1.5 bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700/50">
                <Activity className="w-4 h-4 text-emerald-500" /> 1 Credit Required
            </span>
        </div>
    );
}
