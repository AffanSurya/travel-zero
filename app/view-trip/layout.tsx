import { Metadata } from "next";

export const metadata: Metadata = {
    title: "View Trip Details",
    description:
        "View your complete AI-generated travel itinerary with interactive maps, hotel recommendations, and detailed activity plans.",
    keywords: [
        "trip details",
        "travel itinerary view",
        "trip map",
        "travel plan details",
        "itinerary viewer",
        "trip overview",
        "travel guide view",
    ],
    openGraph: {
        title: "Your Travel Itinerary | TravelZero Trip View",
        description:
            "Explore your personalized travel plan with interactive maps and detailed recommendations.",
        url: "https://travel-zero.vercel.app/view-trip",
        siteName: "TravelZero",
        images: [
            {
                url: "/og-view-trip.jpg",
                width: 1200,
                height: 630,
                alt: "TravelZero Trip View Interface",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Your Travel Itinerary | TravelZero Trip View",
        description:
            "Explore your personalized travel plan with interactive maps and detailed recommendations.",
        images: ["/og-view-trip.jpg"],
    },
    robots: {
        index: false, // Trip details are usually private/user-specific
        follow: true,
    },
};

export default function ViewTripLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
