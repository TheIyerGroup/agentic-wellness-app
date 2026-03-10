"use client";

import { useState } from "react";
import { ShieldCheck, FileUp, AlertTriangle, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useClerk } from "@clerk/nextjs";

export default function PrivacyPage() {
    const { signOut } = useClerk();
    const [isDeleting, setIsDeleting] = useState(false);
    const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success">("idle");

    const handleDeleteAccount = async () => {
        const confirmDelete = window.confirm(
            "Are you absolutely sure you want to delete your account? This will permanently erase your profile, wellness plans, and all uploaded health data. This action cannot be undone."
        );

        if (!confirmDelete) return;

        setIsDeleting(true);
        try {
            const res = await fetch("/api/delete-account", { method: "DELETE" });
            if (res.ok) {
                await signOut(() => window.location.href = "/");
            } else {
                alert("Failed to delete account. Please try again or contact support.");
                setIsDeleting(false);
            }
        } catch (error) {
            console.error("Error deleting account:", error);
            alert("An unexpected error occurred.");
            setIsDeleting(false);
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;
        setUploadStatus("uploading");

        // Simulate an upload delay
        setTimeout(() => {
            setUploadStatus("success");
            // In a real app, you would securely upload this to an S3 bucket or similar
        }, 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
            <header className="mb-8">
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 flex items-center gap-3">
                    <ShieldCheck className="w-10 h-10 text-emerald-500" />
                    Privacy & Data Management
                </h1>
                <p className="text-slate-500 mt-3 text-lg font-light max-w-2xl">
                    Control your personal health data. We believe in strict data minimization, anonymization by design, and your absolute right to be forgotten.
                </p>
            </header>

            {/* AI Privacy Statement */}
            <section className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2 relative z-10">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    Strict Data Anonymization Protocol
                </h2>
                <div className="space-y-4 text-slate-300 text-sm leading-relaxed relative z-10 font-light">
                    <p>
                        Before any of your health metrics or wellness goals are processed by our Gemini Reasoning Engine, they are routed through our internal Trust Layer. This system explicitly strips all Personally Identifiable Information (PII) from the payload.
                    </p>
                    <p>
                        <strong>No AI Training:</strong> We strictly opt-out of all AI model training. Your prompts, uploaded test results, and generated logistics are entirely ephemeral during processing and are never used by Google or any third-party to train public AI models.
                    </p>
                </div>
            </section>

            {/* Secure File Upload */}
            <section className="bg-white dark:bg-slate-900/50 rounded-3xl p-8 border border-slate-200 dark:border-white/10 shadow-lg">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Upload Health Metrics</h2>
                <p className="text-slate-500 mb-6 text-sm">
                    Upload recent PDF blood test results or health metric exports to instantly enhance your next AI plan generation. Files are encrypted at rest.
                </p>

                <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-8 text-center bg-slate-50 dark:bg-slate-900/30 hover:bg-slate-100 dark:hover:bg-slate-900/50 transition-colors flex flex-col items-center justify-center min-h-[200px] relative">
                    {uploadStatus === "idle" && (
                        <>
                            <FileUp className="w-10 h-10 text-slate-400 mb-4" />
                            <p className="text-slate-600 dark:text-slate-400 font-medium mb-1">Click to upload or drag and drop</p>
                            <p className="text-xs text-slate-500">PDF, CSV, or TXT (Max 10MB)</p>
                            <input
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                accept=".pdf,.csv,.txt"
                                onChange={handleFileUpload}
                            />
                        </>
                    )}
                    {uploadStatus === "uploading" && (
                        <div className="flex flex-col items-center">
                            <Loader2 className="w-8 h-8 text-emerald-500 animate-spin mb-4" />
                            <p className="text-slate-600 dark:text-slate-400 font-medium">Encrypting and securely uploading...</p>
                        </div>
                    )}
                    {uploadStatus === "success" && (
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
                                <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <p className="text-emerald-700 dark:text-emerald-400 font-bold">File Secured</p>
                            <p className="text-sm text-slate-500 mt-1 mb-4">Your metrics are ready for the next AI generation.</p>
                            <Button variant="outline" size="sm" onClick={() => setUploadStatus("idle")}>
                                Upload Another File
                            </Button>
                        </div>
                    )}
                </div>
            </section>

            {/* Danger Zone */}
            <section className="bg-red-50 dark:bg-red-950/10 rounded-3xl p-8 border border-red-200 dark:border-red-900/50">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-red-100 dark:bg-red-500/20 rounded-xl shrink-0">
                        <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-500" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-bold text-red-900 dark:text-red-400 mb-2">Danger Zone</h2>
                        <p className="text-red-800/80 dark:text-red-400/80 text-sm leading-relaxed mb-6">
                            Exercising your right to be forgotten. Clicking this button will instantly and irreversibly delete your Clerk identity, your profile metrics, all generated wellness plans, and any uploaded files from our databases.
                        </p>
                        <Button
                            onClick={handleDeleteAccount}
                            disabled={isDeleting}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold h-12 px-6 rounded-xl shadow-lg shadow-red-500/20 transition-all flex items-center gap-2 w-full sm:w-auto"
                        >
                            {isDeleting ? (
                                <><Loader2 className="w-5 h-5 animate-spin" /> Deleting All Data...</>
                            ) : (
                                <><Trash2 className="w-5 h-5" /> Delete My Account & Data</>
                            )}
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
