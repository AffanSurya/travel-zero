"use client";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import React, { useState } from "react";

type FAQItem = {
    question: string;
    answer: string;
};

function FAQ() {
    const [openItems, setOpenItems] = useState<number[]>([]);

    const faqData: FAQItem[] = [
        {
            question: "How does TravelZero's AI trip planner work?",
            answer: "Our AI analyzes your preferences, budget, and travel dates to create personalized itineraries. Simply tell us where you want to go, your budget, group size, and interests, and we'll handle the rest with smart recommendations for hotels, activities, and dining."
        },
        {
            question: "Is TravelZero free to use?",
            answer: "We offer both free and premium plans. Free users get limited trip planning features, while premium subscribers enjoy unlimited trip planning, detailed itineraries, and priority support."
        },
        {
            question: "Can I modify my AI-generated itinerary?",
            answer: "Absolutely! Our AI provides a starting point, but you can customize every aspect of your trip. Add, remove, or modify activities, change hotels, adjust timings, and make the trip truly yours."
        },
        {
            question: "How accurate are the hotel and activity recommendations?",
            answer: "We use real-time data from trusted sources to provide accurate pricing, ratings, and availability. However, we recommend verifying details directly with providers before booking, as prices and availability can change."
        },
        {
            question: "Do you actually book hotels and flights for me?",
            answer: "Currently, we provide recommendations and direct links to booking platforms. We're working on integrated booking features that will be available soon for premium users."
        },
        {
            question: "What destinations does TravelZero support?",
            answer: "Our AI supports trip planning for destinations worldwide. From popular tourist spots to hidden gems, we can help you plan trips to virtually any location globally."
        },
        {
            question: "How do I save or share my trip itinerary?",
            answer: "All your trip plans are automatically saved to your account. You can access them anytime from 'My Trips' and share them with friends and family via email or social media."
        },
        {
            question: "What if I need help with my trip planning?",
            answer: "Our support team is here to help! Contact us through this form, live chat, or email. Premium users get priority support with faster response times."
        }
    ];

    const toggleItem = (index: number) => {
        setOpenItems(prev => 
            prev.includes(index) 
                ? prev.filter(item => item !== index)
                : [...prev, index]
        );
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
                    <HelpCircle className="w-6 h-6 text-blue-600 mr-3" />
                    Frequently Asked Questions
                </h2>
                <p className="text-gray-600">
                    Find answers to common questions about TravelZero and our AI trip planning service.
                </p>
            </div>

            <div className="space-y-4">
                {faqData.map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                        <button
                            onClick={() => toggleItem(index)}
                            className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none focus:bg-gray-100"
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="font-semibold text-gray-900 pr-8">
                                    {item.question}
                                </h3>
                                <div className="flex-shrink-0">
                                    {openItems.includes(index) ? (
                                        <ChevronUp className="w-5 h-5 text-gray-500" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-gray-500" />
                                    )}
                                </div>
                            </div>
                        </button>
                        
                        {openItems.includes(index) && (
                            <div className="px-6 py-4 bg-white border-t border-gray-200">
                                <p className="text-gray-600 leading-relaxed">
                                    {item.answer}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Still have questions?</h3>
                <p className="text-gray-600 mb-4">
                    Can't find what you're looking for? Our support team is here to help you with any questions about TravelZero.
                </p>
                <div className="flex space-x-4">
                    <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                        Contact Support
                    </button>
                    <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                        View Documentation
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FAQ;
