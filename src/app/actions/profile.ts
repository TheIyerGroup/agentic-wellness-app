"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users, userProfiles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getUserProfile() {
    const { userId } = await auth();
    if (!userId) return null;

    // 1. Get the internal user from the users table using Clerk ID
    const userRecord = await db.query.users.findFirst({
        where: eq(users.clerkId, userId),
    });

    if (!userRecord) return null;

    // 2. Fetch the associated profile
    const profileRecord = await db.query.userProfiles.findFirst({
        where: eq(userProfiles.userId, userRecord.id),
    });

    return profileRecord || null;
}

export async function saveUserProfile(data: {
    name?: string;
    age?: number;
    weight?: string;
    goal?: string;
    activityLevel?: string;
    dietaryRestrictions?: string;
}) {
    const clerkUser = await currentUser();
    if (!clerkUser) throw new Error("Unauthorized");

    let userRecord = await db.query.users.findFirst({
        where: eq(users.clerkId, clerkUser.id),
    });

    // Auto-create user if they don't exist in DB (e.g. local dev without webhooks forwarded)
    if (!userRecord) {
        const primaryEmail = clerkUser.emailAddresses[0]?.emailAddress;
        if (!primaryEmail) throw new Error("No primary email found for Clerk user");

        const [newUser] = await db.insert(users).values({
            clerkId: clerkUser.id,
            email: primaryEmail,
        }).returning();

        userRecord = newUser;
    }

    const existingProfile = await db.query.userProfiles.findFirst({
        where: eq(userProfiles.userId, userRecord.id),
    });

    if (existingProfile) {
        await db.update(userProfiles)
            .set({
                ...data,
                updatedAt: new Date(),
            })
            .where(eq(userProfiles.userId, userRecord.id));
    } else {
        await db.insert(userProfiles).values({
            userId: userRecord.id,
            ...data,
        });
    }

    revalidatePath("/dashboard/profile");
    return { success: true };
}
