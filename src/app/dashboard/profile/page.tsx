"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getUserProfile, saveUserProfile } from "@/app/actions/profile";
import { toast, Toaster } from "react-hot-toast";

export default function ProfilePage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        weight: "",
        activityLevel: "sedentary",
        goal: "",
        dietaryRestrictions: "",
    });

    useEffect(() => {
        async function loadData() {
            try {
                const profile = await getUserProfile();
                if (profile) {
                    setFormData({
                        name: profile.name || "",
                        age: profile.age ? profile.age.toString() : "",
                        weight: profile.weight || "",
                        activityLevel: profile.activityLevel || "sedentary",
                        goal: profile.goal || "",
                        dietaryRestrictions: profile.dietaryRestrictions || "",
                    });
                }
            } catch (error) {
                toast.error("Failed to load profile data.");
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            await saveUserProfile({
                name: formData.name,
                age: formData.age ? parseInt(formData.age, 10) : undefined,
                weight: formData.weight,
                activityLevel: formData.activityLevel,
                goal: formData.goal,
                dietaryRestrictions: formData.dietaryRestrictions,
            });
            toast.success("Profile saved successfully!");
        } catch (error) {
            toast.error("An error occurred while saving.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Toaster position="top-right" />

            <div>
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">Your Profile</h1>
                <p className="text-slate-500 mt-2 text-lg">Update your health metrics to get better AI recommendations.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white/50 backdrop-blur-xl dark:bg-slate-900/50 p-8 rounded-2xl border border-white/20 dark:border-slate-800 shadow-2xl relative overflow-hidden">
                {/* Decorative Gradient Blob */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="grid grid-cols-2 gap-8 relative z-10">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Name</label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            type="text"
                            className="w-full h-11 rounded-lg border border-slate-200 bg-white/80 px-4 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/50 dark:border-slate-800 dark:bg-slate-950/50"
                            placeholder="John Doe"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Age</label>
                        <input
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            type="number"
                            className="w-full h-11 rounded-lg border border-slate-200 bg-white/80 px-4 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/50 dark:border-slate-800 dark:bg-slate-950/50"
                            placeholder="30"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Weight</label>
                        <input
                            name="weight"
                            value={formData.weight}
                            onChange={handleChange}
                            type="text"
                            className="w-full h-11 rounded-lg border border-slate-200 bg-white/80 px-4 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/50 dark:border-slate-800 dark:bg-slate-950/50"
                            placeholder="180 lbs"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Activity Level</label>
                        <select
                            name="activityLevel"
                            value={formData.activityLevel}
                            onChange={handleChange}
                            className="w-full h-11 rounded-lg border border-slate-200 bg-white/80 px-4 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/50 dark:border-slate-800 dark:bg-slate-950/50"
                        >
                            <option value="sedentary">Sedentary</option>
                            <option value="light">Lightly Active</option>
                            <option value="moderate">Moderately Active</option>
                            <option value="very">Very Active</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-2 relative z-10">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Primary Goal</label>
                    <input
                        name="goal"
                        value={formData.goal}
                        onChange={handleChange}
                        type="text"
                        className="w-full h-11 rounded-lg border border-slate-200 bg-white/80 px-4 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/50 dark:border-slate-800 dark:bg-slate-950/50"
                        placeholder="e.g. Lose weight, Build muscle, Improve endurance"
                    />
                </div>

                <div className="space-y-2 relative z-10">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Dietary Restrictions</label>
                    <textarea
                        name="dietaryRestrictions"
                        value={formData.dietaryRestrictions}
                        onChange={handleChange}
                        className="w-full min-h-[100px] rounded-lg border border-slate-200 bg-white/80 px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/50 dark:border-slate-800 dark:bg-slate-950/50 resize-y"
                        placeholder="e.g. Vegan, Gluten-free, Peanut allergy"
                    />
                </div>

                <Button
                    type="submit"
                    disabled={saving}
                    className="w-full h-12 text-base font-semibold bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white shadow-lg shadow-emerald-500/25 transition-all relative z-10"
                >
                    {saving ? "Saving..." : "Save Profile"}
                </Button>
            </form>
        </div>
    );
}
