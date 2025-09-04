"use client";
import HeroVideoDialog from "@/components/magicui/hero-video-dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import { ArrowDown, Globe2, Icon, Landmark, Plane, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useInitialMessage } from "../provider";

export const suggestions = [
    {
        title: "Create New Trip",
        icon: <Globe2 className="text-blue-400 h-5 w-5" />,
    },
    {
        title: "Inspire me where to go",
        icon: <Plane className="text-green-500 h-5 w-5" />,
    },
    {
        title: "Discover Hidden gems",
        icon: <Landmark className="text-orange-500 h-5 w-5" />,
    },
    {
        title: "Adventure Destination",
        icon: <Globe2 className="text-yellow-600 h-5 w-5" />,
    },
];

function Hero() {
    const { user } = useUser();
    const router = useRouter();
    const { setInitialMessage } = useInitialMessage();
    const [textareaValue, setTextareaValue] = useState("");

    const onSend = () => {
        if (!user) {
            router.push("/sign-in");
            return;
        }
        // Set initial message and navigate to Create Trip Planner web page
        const messageToSend = textareaValue.trim() || "Create a trip for me";
        setInitialMessage(messageToSend);
        router.push("/create-new-trip");
    };

    const onSuggestionClick = (suggestionTitle: string) => {
        if (!user) {
            router.push("/sign-in");
            return;
        }
        // Set the suggestion as initial message and navigate
        setInitialMessage(suggestionTitle);
        router.push("/create-new-trip");
    };
    return (
        <div className="mt-24 w-full flex justify-center">
            {/* Content */}
            <div className="max-w-3xl w-full text-center space-y-6">
                <h1 className="text-xl md:text-5xl font-bold ">
                    Plan Your Trip with <span className="text-primary">TravelZero</span>
                </h1>
                <p className="text-lg">From flights to hotels — your perfect trip planned in seconds.</p>
                {/* Input Box */}
                <div>
                    <div className="border rounded-2xl p-4 relative">
                        <Textarea
                            placeholder="Create a trip for Parise from New york"
                            className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none"
                            value={textareaValue}
                            onChange={(e) => setTextareaValue(e.target.value)}
                        />
                        <Button
                            size={"icon"}
                            className="absolute bottom-6 right-6 cursor-pointer"
                            onClick={() => onSend()}
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                {/* Suggestion List */}
                <div className="flex gap-5">
                    {suggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-2 border rounded-full p-2 cursor-pointer hover:bg-primary hover:text-white"
                            onClick={() => onSuggestionClick(suggestion.title)}
                        >
                            {suggestion.icon}
                            <h2 className="text-sm">{suggestion.title}</h2>
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-center flex-col">
                    <h2 className="my-7 mt-14 flex gap-2 text-center">
                        Not Sure where to start? <strong>See how it works</strong> <ArrowDown />
                    </h2>
                    {/* Video Section */}
                    <HeroVideoDialog
                        className="block dark:hidden"
                        animationStyle="from-center"
                        videoSrc="https://www.example.com/dummy-video"
                        thumbnailSrc="https://mma.prnewswire.com/media/2401528/1_MindtripProduct.jpg?p=facebook"
                        thumbnailAlt="Dummy Video Thumbnail"
                    />
                </div>
            </div>
        </div>
    );
}

export default Hero;
