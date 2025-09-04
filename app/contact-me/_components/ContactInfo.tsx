"use client";
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

type ContactMethod = {
    icon: React.ReactNode;
    title: string;
    description: string;
    value: string;
    action?: string;
    href?: string;
};

function ContactInfo() {
    const contactMethods: ContactMethod[] = [
        {
            icon: <Mail className="w-6 h-6 text-blue-600" />,
            title: "Email Me",
            description: "Send me an email and I'll respond within 24 hours",
            value: "ichigokwai@gmail.com",
            action: "Send email",
            href: "mailto:ichigokwai@gmail.com",
        },
        {
            icon: (
                <svg className="w-6 h-6 text-pink-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
            ),
            title: "Instagram",
            description: "Follow me and send a DM for quick responses",
            value: "@affan_z0",
            action: "Visit Instagram",
            href: "https://instagram.com/affan_z0",
        },
        // {
        //     icon: <MessageCircle className="w-6 h-6 text-purple-600" />,
        //     title: "WhatsApp",
        //     description: "Chat with me directly for instant support",
        //     value: "+62 812-3456-7890",
        //     action: "Send message",
        //     href: "https://wa.me/6281234567890",
        // },
        {
            icon: <MapPin className="w-6 h-6 text-red-600" />,
            title: "Location",
            description: "Based in Indonesia, serving travelers worldwide",
            value: "Madiun, Indonesia",
            action: "View on map",
            href: "https://maps.google.com/?q=Madiun,Indonesia",
        },
    ];

    const businessHours = [
        { day: "Monday - Friday", hours: "9:00 AM - 10:00 PM" },
        { day: "Saturday - Sunday", hours: "10:00 AM - 8:00 PM" },
        { day: "Holidays", hours: "By appointment" },
    ];

    return (
        <div className="space-y-8">
            {/* Contact Methods */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Get in Touch with Me</h2>
                    <p className="text-gray-600">Choose your preferred way to reach out to me directly</p>
                </div>

                <div className="space-y-6">
                    {contactMethods.map((method, index) => (
                        <div
                            key={index}
                            className="flex items-start space-x-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all"
                        >
                            <div className="flex-shrink-0 w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center">
                                {method.icon}
                            </div>
                            <div className="flex-grow">
                                <h3 className="font-semibold text-gray-900 mb-1">{method.title}</h3>
                                <p className="text-sm text-gray-600 mb-2">{method.description}</p>
                                <p className="text-sm font-medium text-gray-900 mb-2">{method.value}</p>
                                {method.href && (
                                    <Link
                                        href={method.href}
                                        target="_blank"
                                        className="inline-flex items-center text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                                    >
                                        {method.action}
                                        <svg
                                            className="w-4 h-4 ml-1"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                            />
                                        </svg>
                                    </Link>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
                        <Clock className="w-6 h-6 text-blue-600 mr-3" />
                        My Availability
                    </h2>
                    <p className="text-gray-600">I'm generally available during these hours (GMT+7)</p>
                </div>

                <div className="space-y-3">
                    {businessHours.map((schedule, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                        >
                            <span className="font-medium text-gray-900">{schedule.day}</span>
                            <span className="text-gray-600">{schedule.hours}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                        <strong>Note:</strong> For urgent matters outside my regular hours, feel free to send
                        me a message on WhatsApp or Instagram. I'll get back to you as soon as possible!
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ContactInfo;
