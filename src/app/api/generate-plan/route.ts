import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users, userProfiles, wellnessPlans } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userRecord = await db.query.users.findFirst({
            where: eq(users.clerkId, userId),
        });

        if (!userRecord || userRecord.aiCredits < 1) {
            return NextResponse.json({ error: "Insufficient AI Credits. Please upgrade your plan." }, { status: 402 });
        }

        const profileRecord = await db.query.userProfiles.findFirst({
            where: eq(userProfiles.userId, userRecord.id),
        });

        if (!profileRecord) {
            return NextResponse.json({ error: "Please complete your profile first." }, { status: 400 });
        }

        const systemPromptGuardrails = `You are the Agentic Wellness Automator an AI providing generalized wellness, fitness, and nutritional logistics. CRITICAL INSTRUCTION: You MUST explicitly state in your response that you provide general wellness advice and NOT formal medical diagnoses or clinical treatment plans. You are not a doctor. If the user's metrics suggest a severe health condition, you must advise them to consult a healthcare professional. Never prescribe specific medication. Do not recommend extreme dietary restrictions without a doctor's guidance. Format your response strictly in attractive Markdown, using ## Headers, lists, and bolding where appropriate.`;

        const userPrompt = `Create a personalized, dynamic daily wellness logistics routine for the following user profile:\nAge: ${profileRecord.age || 'Unknown'}\nWeight: ${profileRecord.weight || 'Unknown'}\nGoal: ${profileRecord.goal || 'General Health'}\nActivity Level: ${profileRecord.activityLevel || 'Unknown'}\nDietary Restrictions: ${profileRecord.dietaryRestrictions || 'None'}`;

        const GEMINI_API_KEY = process.env.DEFAULT_GEMINI_API_KEY;
        const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                system_instruction: { parts: { text: systemPromptGuardrails } },
                contents: [{ parts: [{ text: userPrompt }] }]
            })
        });

        if (!geminiResponse.ok) {
            throw new Error(`Gemini Error: ${await geminiResponse.text()}`);
        }

        const data = await geminiResponse.json();
        const planText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Failed to generate plan text.";

        // Deduct 1 AI Credit
        await db.update(users)
            .set({ aiCredits: sql`${users.aiCredits} - 1` })
            .where(eq(users.id, userRecord.id));

        // Save the generated Wellness Plan
        await db.insert(wellnessPlans).values({
            userId: userRecord.id,
            planContent: planText,
        });

        return NextResponse.json({ success: true, plan: planText }, { status: 200 });

    } catch (error: any) {
        console.error("Plan Gen Error:", error);
        return NextResponse.json({ error: "Failed to generate plan." }, { status: 500 });
    }
}
