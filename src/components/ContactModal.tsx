"use client";

import { useState } from "react";
import { X, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";

export function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("loading");
        const formData = new FormData(e.currentTarget);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
                    name: formData.get("name"),
                    email: formData.get("email"),
                    message: formData.get("message"),
                }),
            });
            const result = await response.json();
            if (result.success) {
                setStatus("success");
                setMessage("Message sent successfully! We will get back to you shortly.");
            } else {
                setStatus("error");
                setMessage(result.message || "Something went wrong.");
            }
        } catch (error) {
            setStatus("error");
            setMessage("Failed to send message. Please try again.");
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden shadow-emerald-500/10">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-cyan-500" />
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="p-8">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text mb-2">Contact Us</h2>
                    <p className="text-slate-400 mb-6 font-medium">Have a question or feedback? We'd love to hear from you.</p>

                    {status === "success" ? (
                        <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex flex-col items-center text-center animate-in zoom-in-95">
                            <CheckCircle2 className="w-12 h-12 text-emerald-400 mb-4" />
                            <h3 className="text-xl font-bold text-emerald-300 mb-2">Message Sent!</h3>
                            <p className="text-emerald-400/80 mb-6 font-medium">{message}</p>
                            <Button onClick={onClose} className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl w-full h-12">
                                Close Window
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    required
                                    className="w-full px-4 py-3 bg-slate-950/60 border border-white/10 rounded-xl focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 text-slate-50 placeholder:text-slate-600 transition-all font-medium"
                                    placeholder="Jane Doe"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    className="w-full px-4 py-3 bg-slate-950/60 border border-white/10 rounded-xl focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 text-slate-50 placeholder:text-slate-600 transition-all font-medium"
                                    placeholder="jane@example.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1">Message</label>
                                <textarea
                                    name="message"
                                    id="message"
                                    required
                                    rows={4}
                                    className="w-full px-4 py-3 bg-slate-950/60 border border-white/10 rounded-xl focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 text-slate-50 placeholder:text-slate-600 transition-all resize-none font-medium"
                                    placeholder="How can we help you?"
                                />
                            </div>

                            {status === "error" && (
                                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3 mt-4">
                                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                                    <p className="text-sm text-red-300 font-medium">{message}</p>
                                </div>
                            )}

                            <Button
                                type="submit"
                                disabled={status === "loading"}
                                className="w-full h-12 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold text-base rounded-xl shadow-lg shadow-emerald-500/20 transition-all mt-6"
                            >
                                {status === "loading" ? (
                                    <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Sending...</>
                                ) : "Send Message"}
                            </Button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
