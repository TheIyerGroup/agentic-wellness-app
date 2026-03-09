import { pgTable, text, serial, timestamp, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    clerkId: text('clerk_id').notNull().unique(),
    email: text('email').notNull().unique(),
    stripeCustomerId: text('stripe_customer_id'),
    subscriptionTier: text('subscription_tier').default('free').notNull(),
    aiCredits: integer('ai_credits').default(0).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const userProfiles = pgTable('user_profiles', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id).notNull().unique(),
    name: text('name'),
    age: integer('age'),
    weight: text('weight'), // e.g., "180 lbs" or "82 kg"
    goal: text('goal'),
    activityLevel: text('activity_level'),
    dietaryRestrictions: text('dietary_restrictions'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const wellnessPlans = pgTable('wellness_plans', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id).notNull(),
    planContent: text('plan_content').notNull(), // JSON string or markdown
    createdAt: timestamp('created_at').defaultNow().notNull(),
});
