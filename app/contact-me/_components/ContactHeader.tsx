"use client";
import { Globe2, Mail, MessageCircle, Phone } from "lucide-react";
import React from "react";

function ContactHeader() {
    return (
        <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                <MessageCircle className="w-8 h-8 text-primary" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Get in <span className="text-primary">Touch</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
                Have questions about TravelZero? Need help planning your next adventure? 
                We're here to help you every step of the way.
            </p>

            {/* Quick Contact Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                        <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-center">
                        <h3 className="font-semibold text-gray-900">24h Response</h3>
                        <p className="text-sm text-gray-600">Email support</p>
                    </div>
                </div>

                <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                        <Phone className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="text-center">
                        <h3 className="font-semibold text-gray-900">Live Support</h3>
                        <p className="text-sm text-gray-600">Phone & chat</p>
                    </div>
                </div>

                <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                        <Globe2 className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="text-center">
                        <h3 className="font-semibold text-gray-900">Global Support</h3>
                        <p className="text-sm text-gray-600">Worldwide help</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactHeader;
