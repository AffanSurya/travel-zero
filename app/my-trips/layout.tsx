import { Metadata } from "next";

export const metadata: Metadata = {
    title: "My Trips",
    description:
        "View and manage all your AI-generated trip plans. Access your saved itineraries, travel guides, and personalized recommendations in one place.",
    keywords: [
        "my trips",
        "saved trips",
        "travel history",
        "trip collection",
        "travel dashboard",
        "saved itineraries",
        "travel plans",
        "trip management",
    ],
    openGraph: {
        title: "Your Travel Collection | TravelZero My Trips",
        description:
            "Access all your AI-generated travel plans and itineraries. Manage your trips and discover new destinations.",
        url: "https://travel-zero.vercel.app/my-trips",
        siteName: "TravelZero",
        images: [
            {
                url: "/og-my-trips.jpg",
                width: 1200,
                height: 630,
                alt: "TravelZero My Trips Dashboard",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Your Travel Collection | TravelZero My Trips",
        description: "Access all your AI-generated travel plans and itineraries.",
        images: ["/og-my-trips.jpg"],
    },
    alternates: {
        canonical: "https://travel-zero.vercel.app/my-trips",
    },
    robots: {
        index: false, // Usually user-specific pages should not be indexed
        follow: true,
    },
};

export default function MyTripsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
