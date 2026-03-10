import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users, userProfiles, wellnessPlans } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function DELETE(req: Request) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // 1. Fetch the user's internal database ID based on Clerk ID
        const userRecord = await db.query.users.findFirst({
            where: eq(users.clerkId, userId),
        });

        if (userRecord) {
            const internalUserId = userRecord.id;

            // 2. Cascade delete active records from the database
            // Delete wellness plans
            await db.delete(wellnessPlans).where(eq(wellnessPlans.userId, internalUserId));

            // Delete user profiles / uploaded data
            await db.delete(userProfiles).where(eq(userProfiles.userId, internalUserId));

            // Delete the core user record
            await db.delete(users).where(eq(users.id, internalUserId));
        }

        // 3. Wipe the user from Clerk Authentication completely
        const client = await clerkClient();
        await client.users.deleteUser(userId);

        return new NextResponse("Account and data successfully deleted", { status: 200 });
    } catch (error) {
        console.error("[DELETE_ACCOUNT_ERROR]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
