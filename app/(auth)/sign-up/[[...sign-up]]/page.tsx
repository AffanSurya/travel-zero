import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign Up - TravelZero | Start Your AI Travel Journey",
    description: "Join TravelZero and start planning incredible trips with AI assistance. Create your free account and discover personalized travel experiences.",
    keywords: [
        "sign up",
        "register",
        "create account",
        "join TravelZero",
        "travel registration",
        "AI trip planner signup",
        "travel account creation"
    ],
    openGraph: {
        title: "Join TravelZero | AI-Powered Trip Planning",
        description: "Create your free account and start planning amazing trips with AI assistance. Join thousands of happy travelers.",
        url: "https://travelzero.vercel.app/sign-up",
        siteName: "TravelZero",
        images: [
            {
                url: "/og-auth.jpg",
                width: 1200,
                height: 630,
                alt: "TravelZero Sign Up",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Join TravelZero | AI-Powered Trip Planning",
        description: "Create your free account and start planning amazing trips with AI assistance.",
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
            <SignUp />
        </div>
    );
}
