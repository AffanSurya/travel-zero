import React from "react";
import ContactHeader from "./_components/ContactHeader";
import ContactForm from "./_components/ContactForm";
import ContactInfo from "./_components/ContactInfo";
import FAQ from "./_components/FAQ";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Contact Me",
    description:
        "Need help with TravelZero? Contact our support team for assistance with AI trip planning, account questions, or technical support. We're here to help 24/7.",
    keywords: [
        "contact TravelZero",
        "travel support",
        "trip planning help",
        "customer service",
        "AI travel assistance",
        "travel questions",
        "support team",
        "help center",
    ],
    openGraph: {
        title: "Contact TravelZero Support | AI Trip Planning Help",
        description:
            "Get expert help with your travel planning.  is ready to assist you with TravelZero's AI trip planner.",
        url: "https://travel-zero.vercel.app/contact-me",
        siteName: "TravelZero",
        images: [
            {
                url: "/og-contact.jpg",
                width: 1200,
                height: 630,
                alt: "Contact TravelZero Support",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Contact TravelZero Support | AI Trip Planning Help",
        description: "Get expert help with your travel planning from our support team.",
        images: ["/og-contact.jpg"],
    },
    robots: {
        index: true,
        follow: true,
    },
};

function ContactMe() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Header Section */}
            <div className="pt-24 pb-8 px-4">
                <div className="max-w-7xl mx-auto">
                    <ContactHeader />
                </div>
            </div>

            {/* Main Content */}
            <div className="px-4 pb-16">
                <div className="max-w-7xl mx-auto">
                    {/* Contact Form and Info Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                        <div>
                            <ContactForm />
                        </div>
                        <div>
                            <ContactInfo />
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="max-w-4xl mx-auto">
                        <FAQ />
                    </div>
                </div>
            </div>

            {/* Call to Action Section */}
            <div className="bg-gray-900 text-white py-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Start Planning Your Next Adventure?</h2>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Don't let planning stress ruin your vacation dreams. Let our AI create the perfect
                        itinerary for you in minutes.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/create-new-trip"
                            className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium text-lg"
                        >
                            Start Planning Free
                        </Link>
                        <Link
                            href="/pricing"
                            className="inline-flex items-center justify-center px-8 py-3 border border-gray-600 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-lg"
                        >
                            View Pricing
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactMe;
