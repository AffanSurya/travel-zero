"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function PopularCityList() {
    const cards = data.map((card, index) => <Card key={card.src} card={card} index={index} />);

    return (
        <div className="w-full h-full py-20">
            <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
                Popular Destinations to Visit
            </h2>
            <Carousel items={cards} />
        </div>
    );
}

const DummyContent = ({ city }: { city: string }) => {
    const cityDescriptions: { [key: string]: string } = {
        Bali: "Discover the magical island of Bali with its stunning beaches, ancient temples, and vibrant culture. Experience world-class surfing, traditional Balinese cuisine, and breathtaking rice terraces.",
        Tokyo: "Immerse yourself in the bustling metropolis of Tokyo, where traditional culture meets cutting-edge technology. Explore historic temples, modern skyscrapers, and incredible street food.",
        Paris: "Fall in love with the City of Light. Visit iconic landmarks like the Eiffel Tower, Louvre Museum, and enjoy world-renowned cuisine in charming cafés along the Seine.",
        "New York":
            "Experience the city that never sleeps. From Broadway shows to Central Park, world-class museums to diverse neighborhoods, NYC offers endless adventures.",
        London: "Explore the rich history and modern charm of London. Visit royal palaces, iconic bridges, and enjoy afternoon tea while experiencing centuries of British culture.",
        Dubai: "Witness the perfect blend of luxury and tradition. Marvel at futuristic architecture, enjoy world-class shopping, and experience desert adventures in this Middle Eastern gem.",
    };

    const description =
        cityDescriptions[city] ||
        "Discover amazing attractions and experiences in this beautiful destination.";

    return (
        <>
            {[...new Array(3).fill(1)].map((_, index) => {
                return (
                    <div
                        key={"content" + index}
                        className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
                    >
                        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                            <span className="font-bold text-neutral-700 dark:text-neutral-200">
                                {city} - A world-class destination.
                            </span>{" "}
                            {description}
                        </p>
                        <div className="mt-8 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-2xl p-8 flex items-center justify-center">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
                                    Explore {city}
                                </h3>
                                <p className="text-neutral-600 dark:text-neutral-400">
                                    Book your adventure today!
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

const data = [
    {
        category: "Tropical Paradise",
        title: "Bali, Indonesia",
        src: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        content: <DummyContent city="Bali" />,
    },
    {
        category: "Modern Metropolis",
        title: "Tokyo, Japan",
        src: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2794&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        content: <DummyContent city="Tokyo" />,
    },
    {
        category: "City of Romance",
        title: "Paris, France",
        src: "https://images.unsplash.com/photo-1549144511-f099e773c147?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        content: <DummyContent city="Paris" />,
    },
    {
        category: "The Big Apple",
        title: "New York City, USA",
        src: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        content: <DummyContent city="New York" />,
    },
    {
        category: "Historic Capital",
        title: "London, United Kingdom",
        src: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        content: <DummyContent city="London" />,
    },
    {
        category: "Luxury Destination",
        title: "Dubai, UAE",
        src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        content: <DummyContent city="Dubai" />,
    },
];
