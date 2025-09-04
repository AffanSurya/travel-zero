import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign In",
    description:
        "Sign in to your TravelZero account and continue planning amazing trips with AI assistance. Access your saved trips and personalized recommendations.",
    keywords: [
        "sign in",
        "login",
        "travel account",
        "trip planner login",
        "access account",
        "user authentication",
    ],
    openGraph: {
        title: "Sign In to TravelZero | AI Trip Planner",
        description: "Access your personal travel planning dashboard and continue creating amazing journeys.",
        url: "https://travel-zero.vercel.app/sign-in",
        siteName: "TravelZero",
        images: [
            {
                url: "/og-auth.jpg",
                width: 1200,
                height: 630,
                alt: "TravelZero Sign In",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Sign In to TravelZero | AI Trip Planner",
        description: "Access your personal travel planning dashboard.",
        images: ["/og-auth.jpg"],
    },
    robots: {
        index: false, // Auth pages should not be indexed
        follow: false,
    },
};

export default function Page() {
    return (
        <div className="flex items-center justify-center h-screen w-full">
            <SignIn />
        </div>
    );
}
