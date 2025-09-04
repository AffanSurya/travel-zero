import arcjet, { tokenBucket } from "@arcjet/next";

// The arcjet instance is created and exported from a utility file
export const aj = arcjet({
    key: process.env.ARCJET_KEY!, // Get your site key from https://app.arcjet.com
    rules: [
        // Create a token bucket rate limit. Other algorithms are supported.
        tokenBucket({
            mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
            characteristics: ["userId"], // Track based on the Clerk userId
            refillRate: 5, // refill 5 tokens per interval
            interval: 86400,
            capacity: 10, // bucket maximum capacity of 10 tokens
        }),
    ],
});
