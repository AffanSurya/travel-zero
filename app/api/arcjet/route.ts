import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { aj } from "@/lib/arcjet";

export async function GET(req: Request) {
    // Get the current user from Clerk
    const user = await currentUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Deduct 5 tokens from the user's bucket
    const decision = await aj.protect(req, { userId: user.id, requested: 5 });

    if (decision.isDenied()) {
        return NextResponse.json(
            {
                error: "Too Many Requests",
                reason: decision.reason,
            },
            {
                status: 429,
            }
        );
    }

    return NextResponse.json({ message: "Hello World" });
}
