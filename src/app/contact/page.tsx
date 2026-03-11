"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

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
                    access_key: formData.get("access_key"),
                    subject: formData.get("subject"),
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
        <div className="min-h-screen bg-slate-950 text-slate-50 py-24 px-4 selection:bg-emerald-500/30 relative flex flex-col items-center justify-center">
            {/* Background Glow */}
            <div className="absolute top-[20%] right-[20%] w-[40%] h-[40%] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full max-w-xl bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-cyan-500" />
                
                <div className="p-8 sm:p-12">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text mb-4">Contact Us</h1>
                        <p className="text-slate-400 font-medium">Have a question or feedback? We&apos;d love to hear from you. Fill out the form below and our team will get back to you securely.</p>
                    </div>

                    {status === "success" ? (
                        <div className="p-8 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex flex-col items-center text-center animate-in zoom-in-95">
                            <CheckCircle2 className="w-16 h-16 text-emerald-400 mb-6" />
                            <h3 className="text-2xl font-bold text-emerald-300 mb-2">Message Sent!</h3>
                            <p className="text-emerald-400/80 mb-8 font-medium">{message}</p>
                            <Button onClick={() => setStatus("idle")} className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl w-full h-12">
                                Send Another Message
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <input type="hidden" name="access_key" value="2fe05607-dbf7-47b3-a48b-c6d1ad14bbc5" />
                            <input type="hidden" name="subject" value="New Contact Message from Agentic Wellness Main App" />
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    id="name" 
                                    required 
                                    className="w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 text-slate-50 placeholder:text-slate-600 transition-all font-medium shadow-inner"
                                    placeholder="Jane Doe"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    id="email" 
                                    required 
                                    className="w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 text-slate-50 placeholder:text-slate-600 transition-all font-medium shadow-inner"
                                    placeholder="jane@example.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                                <textarea 
                                    name="message" 
                                    id="message" 
                                    required 
                                    rows={5}
                                    className="w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 text-slate-50 placeholder:text-slate-600 transition-all resize-none font-medium shadow-inner"
                                    placeholder="How can we help you?"
                                />
                            </div>

                            {status === "error" && (
                                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 mt-4 animate-in slide-in-from-top-2">
                                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                                    <p className="text-sm text-red-300 font-medium">{message}</p>
                                </div>
                            )}

                            <Button 
                                type="submit" 
                                disabled={status === "loading"}
                                className="w-full h-14 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold text-lg rounded-xl shadow-lg shadow-emerald-500/20 transition-all mt-8 flex items-center justify-center gap-2"
                            >
                                {status === "loading" ? (
                                    <><Loader2 className="w-6 h-6 animate-spin" /> Sending Securely...</>
                                ) : (
                                    <><Send className="w-5 h-5" /> Send Message</>
                                )}
                            </Button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
