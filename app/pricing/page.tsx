import { PricingTable } from "@clerk/nextjs";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pricing - TravelZero",
    description:
        "Choose the perfect plan for your travel needs. Get unlimited AI-powered trip planning, personalized itineraries, and premium travel recommendations.",
    keywords: [
        "travel subscription",
        "trip planner pricing",
        "AI travel premium",
        "travel planning cost",
        "trip planner subscription",
        "travel app pricing",
        "premium travel features",
    ],
    openGraph: {
        title: "Affordable AI Trip Planning | TravelZero Pricing",
        description:
            "Unlock unlimited travel possibilities with our AI-powered trip planner. Choose your plan and start creating amazing journeys today.",
        url: "https://travel-zero.vercel.app/pricing",
        siteName: "TravelZero",
        images: [
            {
                url: "/og-pricing.jpg",
                width: 1200,
                height: 630,
                alt: "TravelZero Pricing Plans",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Affordable AI Trip Planning | TravelZero Pricing",
        description: "Unlock unlimited travel possibilities with our AI-powered trip planner.",
        images: ["/og-pricing.jpg"],
    },
    alternates: {
        canonical: "https://travel-zero.vercel.app/pricing",
    },
    robots: {
        index: true,
        follow: true,
    },
};

function Pricing() {
    return (
        <div className="mt-20">
            <h2 className="font-bold text-3xl my-5 text-center">AI-Powered Trip Planning - Pick Your Plan</h2>
            <div style={{ maxWidth: "400px", margin: "0 auto", padding: "0 1rem" }}>
                <PricingTable />
            </div>
        </div>
    );
}

export default Pricing;
