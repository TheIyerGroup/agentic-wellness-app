import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import Stripe from "stripe";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-02-25.clover",
});

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        const clerkUser = await currentUser();

        if (!userId || !clerkUser) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Get the web URL dynamically
        const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

        const stripeSession = await stripe.checkout.sessions.create({
            success_url: `${origin}/dashboard`,
            cancel_url: `${origin}/pricing`,
            payment_method_types: ["card", "paypal", "amazon_pay"], // Add additional payment methods if enabled in dashboard
            mode: "subscription",
            billing_address_collection: "auto",
            customer_email: clerkUser.emailAddresses[0].emailAddress,
            line_items: [
                {
                    price: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID!,
                    quantity: 1,
                },
            ],
            metadata: {
                clerkId: userId,
            },
        });

        return NextResponse.redirect(stripeSession.url!, { status: 303 });
    } catch (error) {
        console.error("[STRIPE_CHECKOUT]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
