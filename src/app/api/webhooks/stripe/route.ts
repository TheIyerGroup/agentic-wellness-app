import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-02-25.clover", // Use latest compatible version
});

export async function POST(req: Request) {
    const body = await req.text();
    const signature = (await headers()).get("stripe-signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: any) {
        return NextResponse.json({ error: `Webhook Error: ${error.message}` }, { status: 400 });
    }

    // Handle the webhook logic
    switch (event.type) {
        case "checkout.session.completed":
            const session = event.data.object as Stripe.Checkout.Session;

            const clerkId = session.metadata?.clerkId;
            if (!clerkId) break;

            // Update user in DB
            await db
                .update(users)
                .set({
                    stripeCustomerId: session.customer as string,
                    subscriptionTier: "pro",
                    aiCredits: 100, // Or increment based on current logic
                })
                .where(eq(users.clerkId, clerkId));
            break;
        case "invoice.payment_succeeded":
            // Handle subscription renewal credit logic here
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
}
