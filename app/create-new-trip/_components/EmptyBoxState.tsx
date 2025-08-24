import { suggestions } from "@/app/_components/Hero";
import React from "react";

function EmptyBoxState({ onSelectOption }: any) {
    return (
        <div className="mt-5">
            <h2 className="font-bold text-3xl text-center">
                Start Planning New <strong className="text-primary">Trip</strong> Using AI
            </h2>
            <p className="text-center text-gray-400 mt-2">
                Turn your dream trip into reality, minus the headache. Let our smart AI craft a unique
                itinerary and suggest cool spots just for you. All you have to do is pack your bags and enjoy
                every moment!
            </p>

            <div className="flex flex-col gap-5 mt-3">
                {suggestions.map((suggestions, index) => (
                    <div
                        key={index}
                        onClick={() => onSelectOption(suggestions.title)}
                        className="flex items-center gap-2 border rounded-xl p-3 cursor-pointer hover:border-primary hover:text-primary"
                    >
                        {suggestions.icon}
                        <h2 className="text-md">{suggestions.title}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EmptyBoxState;
