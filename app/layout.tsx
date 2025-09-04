import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "./ConvexClientProvider";

const outfit = Outfit({
    variable: "--font-outfit",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL("https://travel-zero.vercel.app"),
    title: {
        default: "TravelZero - AI-Powered Trip Planner | Plan Perfect Trips with AI",
        template: "%s | TravelZero",
    },
    description:
        "Plan your perfect trip with AI assistance. Get personalized itineraries, hotel recommendations, and travel guides tailored to your preferences and budget. Start your journey today!",
    keywords: [
        "AI trip planner",
        "travel planning",
        "AI travel assistant",
        "personalized itinerary",
        "smart travel planner",
        "vacation planning",
        "travel recommendations",
        "AI travel guide",
        "trip organizer",
        "travel technology",
    ],
    authors: [{ name: "Affan" }],
    creator: "Affan",
    publisher: "Affan",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        title: "TravelZero - AI-Powered Trip Planner",
        description:
            "Plan your perfect trip with AI assistance. Get personalized itineraries and travel recommendations.",
        url: "https://travel-zero.vercel.app",
        siteName: "TravelZero",
        images: [
            {
                url: "/og-default.jpg",
                width: 1200,
                height: 630,
                alt: "TravelZero AI Trip Planner",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "TravelZero - AI-Powered Trip Planner",
        description:
            "Plan your perfect trip with AI assistance. Get personalized itineraries and travel recommendations.",
        images: ["/og-default.jpg"],
        creator: "@travelzero",
        site: "@travelzero",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon-16x16.png",
        apple: "/apple-touch-icon.png",
    },
    manifest: "/manifest.json",
    verification: {
        google: "your-google-verification-code", // Add your actual Google verification code
        yandex: "your-yandex-verification-code", // Add if needed
        yahoo: "your-yahoo-verification-code", // Add if needed
    },
    alternates: {
        canonical: "https://travel-zero.vercel.app",
    },
    category: "Travel",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={outfit.className}>
                    <ConvexClientProvider>{children}</ConvexClientProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
