import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Create New Trip",
    description:
        "Plan your perfect trip with AI assistance. Get personalized itineraries, hotel recommendations, and travel guides tailored to your preferences and budget.",
    keywords: [
        "AI trip planner",
        "travel itinerary",
        "vacation planning",
        "travel assistant",
        "hotel recommendations",
        "trip planning",
        "travel guide",
        "personalized travel",
        "smart travel planner",
    ],

    openGraph: {
        title: "Create Your Perfect Trip with AI | TravelZero",
        description:
            "Let AI craft your dream vacation. Get personalized itineraries, hotel suggestions, and travel tips in minutes.",
        url: "https://travel-zero.vercel.app/create-new-trip",
        siteName: "TravelZero",
        images: [
            {
                url: "/og-create-trip.jpg",
                width: 1200,
                height: 630,
                alt: "TravelZero AI Trip Planner Interface",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Create Your Perfect Trip with AI | TravelZero",
        description:
            "Let AI craft your dream vacation. Get personalized itineraries, hotel suggestions, and travel tips in minutes.",
        images: ["/og-create-trip.jpg"],
        creator: "@travelzero",
    },
    alternates: {
        canonical: "https://travel-zero.vercel.app/create-new-trip",
    },
    category: "Travel",
};

export default function CreateTripLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
